console.log('Move build target to Spring Boot Template')

const fs = require("fs-extra")
const path = require("path")

// Move build to Spring Boot
const buildPath = path.resolve('build')
const outputPath = path.join('..', 'backend', 'src', 'main', 'resources', 'templates')
if (fs.existsSync(outputPath)) {
    fs.removeSync(outputPath)
}
fs.copySync(buildPath, outputPath)