import React, {useEffect} from 'react';
import {notification} from 'antd';

import {AppLoader} from '../../../@crema';
import {useDispatch, useSelector} from 'react-redux';
import {useIntl} from 'react-intl';
import {
  notificationErrorOptions,
  notificationSuccessOptions,
} from 'shared/constants/AppConst';
import ReactDOM from 'react-dom';
import {hideMessage} from 'redux/actions/Common';

const AppInfoView = () => {
  const {loading, error, displayMessage} = useSelector(({common}) => common);
  const dispatch = useDispatch();
  const {messages} = useIntl();

  useEffect(() => {
    if (error) {
      notification.error({
        ...notificationErrorOptions,
        message: error,
      });
      dispatch(hideMessage());
    }
  }, [error]);

  useEffect(() => {
    if (displayMessage) {
      notification.success({
        ...notificationSuccessOptions,
        message: messages[notificationSuccessOptions.titleId],
        description: displayMessage,
      });
      dispatch(hideMessage());
    }
  }, [displayMessage]);

  return (
    <>{loading ? ReactDOM.createPortal(<AppLoader />, document.body) : null}</>
  );
};

export default AppInfoView;
