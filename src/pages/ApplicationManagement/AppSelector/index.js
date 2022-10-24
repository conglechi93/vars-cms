import './index.style.less';
import {memo, useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  onGetManagableApplication,
  onSelectApp,
} from 'redux/actions/UserApplication';
import {AppLoader, AppRowContainer} from '@crema';
import AppItem from './AppItem';
import {Col, Spin} from 'antd';
import {AppNavContext} from '@crema/core/AppLayout/components/AppVerticalNav';
import {useNavigate} from 'react-router-dom';
import Route from 'utils/Route';
import IntlMessages from '@crema/utility/IntlMessages';

const AppSelector = () => {
  const dispatch = useDispatch();
  const {
    loadingApp,
    managableApplications: apps,
    errorApp,
    navParam,
  } = useSelector(({userApplication}) => userApplication);
  const {loading} = useSelector(({auth}) => auth);
  const {getFirstOriginalRoute} = useContext(AppNavContext);
  const navigate = useNavigate();
  const [appId, setAppId] = useState(null);

  useEffect(() => {
    dispatch(onSelectApp(null));
    dispatch(onGetManagableApplication());
  }, [dispatch]);

  const handleView = (item) => {
    const {objectId} = item;
    setAppId(objectId);
    dispatch(onSelectApp(objectId));
  };

  useEffect(() => {
    if (appId && navParam?.appId == appId) {
      const url = Route.replaceParam(getFirstOriginalRoute(), {appId});
      navigate(url);
    }
  }, [navParam]);

  if (loadingApp) return <AppLoader />;

  if (errorApp) {
    if (errorApp == 'Unauthorized')
      return <IntlMessages id='error.unauthorizeSSORequest' />;
    else return errorApp;
  }

  return (
    <Spin spinning={loading}>
      <AppRowContainer gutter={[16, 16]}>
        {(apps || []).map((item) => (
          <Col key={item.name}>
            <AppItem onView={handleView} item={item} />
          </Col>
        ))}
      </AppRowContainer>
    </Spin>
  );
};

export default memo(AppSelector);

AppSelector.propTypes = {};

AppSelector.defaultProps = {};
