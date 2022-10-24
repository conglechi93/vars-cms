import {useRef} from 'react';
import {useIntl} from 'react-intl';
import {useDispatch} from 'react-redux';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from 'shared/constants/ActionTypes';

export const AuthCaptchaHandle = () => {
  const captchaRef = useRef();
  const {messages} = useIntl();
  const dispatch = useDispatch();

  const errorHandle = () => {
    if (!window.navigator.onLine) return messages['error.networkError'];
    return messages['error.message.somethingWentWrong'];
  };

  const makeRequest = () =>
    new Promise((resolve) => {
      if (!captchaRef.current) return;
      dispatch({type: FETCH_START});
      return captchaRef.current
        .executeAsync()
        .then((value) => {
          dispatch({type: FETCH_SUCCESS});
          resolve(value);
        })
        .catch(() => {
          dispatch({
            type: FETCH_ERROR,
            payload: errorHandle(),
          });
        })
        .finally(() => {
          captchaRef.current.reset();
        });
    });

  return {makeRequest, captchaRef};
};
