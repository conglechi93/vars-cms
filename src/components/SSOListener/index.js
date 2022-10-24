import PropTypes from 'prop-types';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  SSO_ERROR,
  SSO_LOADED,
  SSO_PREFIX,
  SSO_SUCCESS,
} from 'shared/constants/SSOMessages';
import {decrypt, encrypt} from 'utils/Encode';

export const SSOListener = ({children}) => {
  const {payload, error, enabled} = useSelector(({sso}) => sso);

  const postMessage = (code, payload) => {
    if (window?.opener && enabled) {
      const message = {
        code,
        message: payload || '',
      };
      window.opener.postMessage(encrypt(message), '*');

      if (process.env.NODE_ENV == 'development') {
        console.log(`Post Code: `, code);
        console.log(`Post Payload: `, payload);
      }
    }
  };

  useEffect(() => {
    if (window?.opener) {
      const onMessage = ({data, source}) => {
        if (!data || !data.startsWith?.(SSO_PREFIX)) return;

        const {code, message} = decrypt(data);

        if (process.env.NODE_ENV == 'development') {
          console.log(`From: `, source);
          console.log(`Receive: `, data);
          console.log(`Code: `, code);
          console.log(`Message: `, message);
        }
        switch (code) {
          default:
            break;
        }
      };

      window?.addEventListener('message', onMessage);
      postMessage(SSO_LOADED);

      return () => window?.removeEventListener('message', onMessage);
    }
  }, []);

  useEffect(() => {
    !!enabled && !!payload && postMessage(SSO_SUCCESS, payload);
  }, [payload]);

  useEffect(() => {
    !!enabled && !!error && postMessage(SSO_ERROR, error);
  }, [error]);

  return children;
};

SSOListener.propTypes = {
  children: PropTypes.node,
};
