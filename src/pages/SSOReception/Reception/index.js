import {AppLoader} from '@crema';
import { Typography } from 'antd';
import {SIGN_IN_EMAIL_ROUTE} from 'pages/Auth/declareRoute';
import {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {onEnableSSO} from 'redux/actions/SSO';
import {defaultAdminUrl, initialUrl} from 'shared/constants/AppConst';
import ReceptionSchema from './receptionSchema';

const SSOReception = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const {messages} = useIntl();
  const [searchParam] = useSearchParams();
  const {settings, errorToggle} = useSelector(({sso}) => sso);
  const navigate = useNavigate();
  const {isAuthenticated} = useSelector(({auth}) => auth);
  const [initialized, setInitialized] = useState(false);
  const [mode, setMode] = useState(null)

  const validateSetting = (settings) => {
    if (ReceptionSchema.isValidSync(settings)) return settings;
    return null;
  };

  useEffect(() => {
    const settings = {
      mode: searchParam.get('mode'),
      appCode: searchParam.get('appCode'),
      clientId: searchParam.get('clientId'),
      redirectTo: searchParam.get('redirectTo'),
      action: searchParam.get('action'),
    };

    if (window?.opener || settings.mode == 'redirect' || settings.mode == 'window') {
      if (validateSetting(settings)) {
        dispatch(onEnableSSO(settings));
        setInitialized(true);
      } else {
        setMode(settings.mode)
        setError(messages['error.invalidSSORequest']);
      }
    } else {
      navigate(defaultAdminUrl);
    }
  }, []);

  useEffect(() => {
    if (settings && initialized) {
      if (isAuthenticated) navigate(initialUrl);
      const {action} = settings;
      switch (action) {
        case 'loginDefault':
          navigate(SIGN_IN_EMAIL_ROUTE);
      }
    }
  }, [settings]);

  useEffect(() => {
    if (errorToggle)
      setError(errorToggle)
  }, [errorToggle])

  const goBack = () => {
    if (mode == 'redirect')
      navigate(-2)
    else
      window.close()
  }

  if (error) {
    return (
      <>
        <p className='my-2 text-center'>{error}</p>
        <Typography.Link onClick={() => goBack()}>{messages['common.goBack']}</Typography.Link>
      </>
    );
  }
  return <AppLoader />;
};

export default SSOReception;
