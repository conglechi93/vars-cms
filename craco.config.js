const {
  addAfterLoader,
  removeLoaders,
  loaderByName,
  getLoaders,
} = require('@craco/craco');
const CracoLessPlugin = require('craco-less');
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
// const {getThemeVariables} = require('antd/dist/theme');

const replaceUrlLoader = (webpackConfig) => {
  const config = { ...webpackConfig };
  const urlLoaderCandidates = getLoaders(config, loaderByName('url-loader'));
  const urlLoader = urlLoaderCandidates.matches.find(
    m =>
      m.loader &&
      m.loader.test &&
      (Array.isArray(m.loader.test)
        ? m.loader.test.some(r => r.toString().indexOf('jpe?g') >= 0)
        : m.loader.test.toString().indexOf('jpe?g') >= 0)
  );
  if (!urlLoader) {
    throw Error(
      'could not find correct url-loader. did you change react-scripts version?'
    );
  }
  const loader = urlLoader.loader;
  loader.use = [
    {
      loader: loader.loader,
      options: Object.assign({}, loader.options),
    },
    {
      loader: ImageMinimizerPlugin.loader,
      options: {
        minimizer: {
          implementation: ImageMinimizerPlugin.squooshMinify,
          options: {
            encodeOptions: {
              mozjpeg: {
                quality: 100,
              },
              webp: {
                lossless: 1,
              },
              avif: {
                cqLevel: 0,
              },
            },
          },
        },
      },
    },
  ];
  delete loader.loader;
  delete loader.options;
  return config;
}

module.exports = {
  style: {
    // postcss: {
    //   loaderOptions: (postcssLoaderOptions) => {
    //     postcssLoaderOptions.postcssOptions.plugins = [
    //       flexGapPolyfill()
    //     ]

    //     return postcssLoaderOptions
    //   },
    // },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true
          },
        },
      },
    }
  ],
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@shared": path.resolve(__dirname, "src/shared/"),
      "@redux": path.resolve(__dirname, "src/redux/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@api": path.resolve(__dirname, "src/api/"),
    },
    configure: webpackConfig => {
      const isProductionBuild = process.env.NODE_ENV === "production"

      webpackConfig.module.rules = [
        {
          test: /\.(jpe?g|png)$/i,
          type: "asset",
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            transpileOnly: true
          },
        },
        ...webpackConfig.module.rules
      ]

      if (isProductionBuild) {
        // Image minimize
        webpackConfig.plugins = [
          new ImageMinimizerPlugin({
            minimizer: {
              implementation: ImageMinimizerPlugin.squooshMinify,
              options: {
                encodeOptions: {
                  mozjpeg: {
                    quality: 100,
                  },
                  webp: {
                    lossless: 1,
                  },
                  avif: {
                    cqLevel: 0,
                  },
                },
              },
            },
          }),
          ...webpackConfig.plugins
        ]
        
        // Chunk optimize
        webpackConfig.optimization = {
          minimize: true,
          splitChunks: {
            cacheGroups: {
              react: {
                test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                name: 'react',
                chunks: 'all',
                reuseExistingChunk: true,
              },
              ui: {
                test(module) {
                  return module.resource && (module.resource.includes('antd') || module.resource.includes('ant-design'));
                },
                name: 'ui',
                chunks: 'all',
                reuseExistingChunk: true,
              },
              // vendors: {
              //   test(module, chunks) {
              //     return module.resource
              //       && module.resource.includes('node_modules')
              //       && !module.resource.includes('antd')
              //       && !module.resource.includes('ant-design');
              //   },
              //   name: 'vendor',
              //   chunks: 'all',
              //   reuseExistingChunk: true
              // },
            },
          },
          runtimeChunk: {
            name: "manifest",
          },
        }

        // Tersor
        webpackConfig.plugins.push(
          new TerserPlugin({
            parallel: true,
            terserOptions: {
              output: {
                comments: false
              }
            }
          })
        )
      }

      const isAnalyze = process.env.ANALYZE
      if (isAnalyze) {
        console.log('\x1b[36m%s\x1b[0m', 'Analyze mode')
        webpackConfig.plugins.push(new BundleAnalyzerPlugin())
      }

      // Ignore order mini-css
      const miniCssExtractPlugin = webpackConfig.plugins.filter(item => item.constructor.name == 'MiniCssExtractPlugin')[0]
      if (miniCssExtractPlugin) {
        miniCssExtractPlugin.options.ignoreOrder = true
        const index = webpackConfig.plugins.indexOf(miniCssExtractPlugin)
        webpackConfig.plugins[index] = miniCssExtractPlugin
      }

      return webpackConfig;
    }
  },
};
