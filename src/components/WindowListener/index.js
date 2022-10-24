import {useEffect} from 'react';
import {useIntl} from 'react-intl';
import {useDispatch} from 'react-redux';
import {FETCH_ERROR} from 'shared/constants/ActionTypes';

export const WindowListener = ({children}) => {
  const dispatch = useDispatch();
  const {messages} = useIntl();

  // Prevent scaling
  useEffect(() => {
    const preventScale = (e) => {
      if (e.scale !== 1) {
        e.preventDefault();
      }
    };
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      window.document.addEventListener('touchmove', preventScale, {
        passive: false,
      });
      return () =>
        window.document.removeEventListener('touchmove', preventScale);
    }
  }, []);

  // Offline Status
  useEffect(() => {
    const onOffline = () => {
      dispatch({
        type: FETCH_ERROR,
        payload: messages['error.windowNetworkError'],
      });
    };
    window.addEventListener('offline', onOffline);
    return () => window.removeEventListener('offline', onOffline);
  }, []);

  return children;
};
