import {useGoogleLogin} from '@react-oauth/google';
import {useEffect, useState} from 'react';
export const useGoogleOAuth = ({onSuccess, onError}) => {
  const scope = process.env.REACT_APP_GOOGLE_SCOPE;
  const signInGoogle = useGoogleLogin({
    flow: 'auth-code',
    scope,
    onSuccess: (response) => {
      onSuccess(response, 'google');
    },
    onError: (response) => onError(response),
  });

  return {signInGoogle};
};

export const useFacebookOAuth = ({onSuccess, onError}) => {
  const appId = process.env.REACT_APP_FACEBOOK_APP_ID;
  const version = process.env.REACT_APP_FACEBOOK_SDK_VERSION;
  const [fbSdkLoaded, setFbSdkLoaded] = useState(false);
  const scope = process.env.REACT_APP_FACEBOOK_SCOPE;

  useEffect(() => {
    if (window.FB) setFbSdkLoaded(true);
    else {
      loadSdkAsynchronously();
      setFbAsyncInit();
    }
  }, []);

  const signInFacebook = () => {
    fbSdkLoaded &&
      window.FB.login(
        (response) => {
          console.log(response);
          const {authResponse} = response;
          
          if (!authResponse) onError(response);
          else onSuccess(authResponse);
        },
        {scope},
      );
  };

  const setFbAsyncInit = function () {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId,
        autoLogAppEvents: true,
        xfbml: true,
        version,
      });
      setFbSdkLoaded(true);

      window.FB.getLoginStatus(({ authResponse }) => {
        if (authResponse) {
          // onSuccess(authResponse)
        }
        else {
          console.log("authResponse fail");
        }
      })
    };
  };

  const loadSdkAsynchronously = () => {
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  };

  return {signInFacebook, logoutFacebook};
};

export const logoutFacebook = () => {
  try {
    window.FB.api('/me/permissions', 'DELETE', {}, function () {
      window.FB.logout(() => {});
    });
  } catch {
    return;
  }
};

