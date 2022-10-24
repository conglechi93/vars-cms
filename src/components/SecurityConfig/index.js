import PropTypes from 'prop-types';
import {AppLoader} from '@crema';
import {useEffect, useState} from 'react';
import API from 'api/Request';
import {CLIENT_SECURITY_CHECK} from 'shared/constants/ApiUrls';
import {useSearchParams} from 'react-router-dom';
import {useIntl} from 'react-intl';
import {useDispatch} from 'react-redux';
import {onReturnError} from 'redux/actions/SSO';
import Countdown from 'antd/lib/statistic/Countdown';
import IntlMessages from '@crema/utility/IntlMessages';

export const SecurityConfig = ({children}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [search] = useSearchParams();
  const clientId = search.get('clientId');
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const [autoClose, setAutoClose] = useState(null);

  useEffect(() => {
    if (!clientId) {
      const msg = messages['error.invalidSSORequest'];
      setError(msg);
      setLoaded(true);
      dispatch(onReturnError(msg));
      setAutoClose(5000);
      return;
    }

    API.post(CLIENT_SECURITY_CHECK, {
      clientId,
    })
      .then(() => {})
      .catch((e) => {
        const {response} = e;
        if (response?.status == 401) {
          const msg = messages['error.unauthorizeSSORequest'];
          setError(msg);
          dispatch(onReturnError(msg));
          setAutoClose(5000);
        } else {
          const msg = messages['error.message.somethingWentWrong'];
          setError(msg);
        }
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  if (error)
    return (
      <>
        <p className='my-2 text-center'>{error}</p>
        {autoClose && (
          <p className='text-center'>
            <IntlMessages id='auth.closeAfter' />
            <Countdown
              value={Date.now() + autoClose}
              onFinish={() => window.close()}
            />
          </p>
        )}
      </>
    );
  return !loaded ? <AppLoader /> : children;
};

SecurityConfig.propTypes = {
  children: PropTypes.node,
};
