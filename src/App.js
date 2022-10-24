import React from 'react';
import {Provider} from 'react-redux';

import './shared/styles/crema.less';
import {
  AppContextProvider,
  AppLayout,
  AppLocaleProvider,
  AppThemeProvider,
} from './@crema';
import configureStore from './redux/store';
// import {BrowserRouter} from 'react-router-dom';
import './@crema/services/index';
import {RequestInterceptor} from 'api/RequestInterceptor';
import {PersistGate} from 'redux-persist/integration/react';
import {BrowserRouter} from 'react-router-dom';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {NavigateProvider} from '@utils/AppNavigate';
import {ViewHeightAdjust} from 'components/ViewHeightAdjust';
import {WindowListener} from 'components/WindowListener';
import {AppNavProvider} from '@crema/core/AppLayout/components/AppVerticalNav';
import {SSOListener} from 'components/SSOListener';
import {PreAuthorize} from 'components/PreAuthorize';

const {store, persistor} = configureStore();

const App = () => {
  return (
    <AppContextProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GoogleOAuthProvider
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <AppThemeProvider>
              <AppLocaleProvider>
                <RequestInterceptor>
                  <WindowListener>
                    <ViewHeightAdjust>
                      <BrowserRouter basename={process.env.PUBLIC_URL}>
                        <NavigateProvider>
                          <AppNavProvider>
                            <SSOListener>
                              <PreAuthorize>
                                <AppLayout />
                              </PreAuthorize>
                            </SSOListener>
                          </AppNavProvider>
                        </NavigateProvider>
                      </BrowserRouter>
                    </ViewHeightAdjust>
                  </WindowListener>
                </RequestInterceptor>
              </AppLocaleProvider>
            </AppThemeProvider>
          </GoogleOAuthProvider>
        </PersistGate>
      </Provider>
    </AppContextProvider>
  );
};

export {store};
export default App;
