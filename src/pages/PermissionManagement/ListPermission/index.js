import {AppInfoView, AppRowContainer} from '@crema';
import AppCard from '@crema/core/AppCard';
import AppInput from '@crema/core/AppInput';
import AppPageMetadata from '@crema/core/AppPageMetadata';
import AppSpace from '@crema/core/AppSpace';
import IntlMessages from '@crema/utility/IntlMessages';
import {Col, Form, Row, Button} from 'antd';
import {memo, useEffect, useRef, useState} from 'react';
import {useIntl} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
import {
  onCreateOrUpdatePermission,
  onDeletePermission,
  onGetListPermission,
} from 'redux/actions/Permission';
import {defaultPageOption} from 'shared/constants/AppConst';
import {AiOutlineReload} from '@react-icons/all-files/ai/AiOutlineReload';
import Icon from '@ant-design/icons';
import {onGetPermissionDetail} from 'redux/actions/Permission';
import {
  PERMISSION_TABLE_DELETE,
  PERMISSION_TABLE_UPDATE,
  PERMISSION_TABLE_VIEW,
} from './PermissionTableActions';
import PermissionTable from './PermissionTable';
import ViewPermissionDialog from './ViewPermissionDialog';
import UpdatePermissionDialog from './UpdatePermissionDialog';
import {BsPencil} from '@react-icons/all-files/bs/BsPencil';
import './index.style.less';
import AppModalConfirm from '@crema/core/AppModalConfirm';

const ListPermission = () => {
  const intl = useIntl();
  const {messages} = intl;
  const dispatch = useDispatch();
  const {
    current: permissions,
    loading,
    error,
    totalRow,
    detail,
    loadingDetail,
    errorDetail,
  } = useSelector(({permission}) => permission);
  const {error: requestError, loading: requestLoading} = useSelector(
    ({common}) => common,
  );
  const [searchOpts, setSearchOpts] = useState(defaultPageOption);
  const [form] = Form.useForm();
  const [showView, setShowView] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showConfirm, setShowConfirm] = useState(null);
  const selectItem = useRef(null);

  useEffect(() => {
    dispatch(onGetListPermission(searchOpts));
  }, [searchOpts]);

  useEffect(() => {
    if (!requestLoading && !requestError) {
      if (showView) setShowView(false);
      if (showUpdate) setShowUpdate(false);
      if (showConfirm) setShowConfirm(null);
    }
  }, [requestLoading]);

  const onPageChange = (page, pageSize) => {
    setSearchOpts({
      ...searchOpts,
      page,
      pageSize,
    });
  };

  const onFinish = () => {
    const formOpts = form.getFieldsValue();
    setSearchOpts({
      ...searchOpts,
      ...formOpts,
    });
  };

  const onCancel = () => {
    form.resetFields();
    form.submit();
  };

  const onReload = () => {
    setSearchOpts({...searchOpts});
  };

  const onViewClick = (id) => {
    dispatch(onGetPermissionDetail(id));
    setShowView(true);
  };

  const onCreateOrUpdatePermissionClick = (id) => {
    selectItem.current = id;
    dispatch(onGetPermissionDetail(id));
    setShowUpdate(true);
  };

  const onDeleteClick = (id, entry) => {
    setShowConfirm({
      description: intl.formatMessage(
        {id: 'permission.confirmDelete'},
        {value: entry.code},
      ),
      shouldEnter: entry.code,
      onOk: () => onDeletePermissionAction(id),
    });
  };

  const onUpdatePermission = (formData) => {
    dispatch(
      onCreateOrUpdatePermission({
        objectId: selectItem.current,
        ...formData,
      }),
    );
  };

  const onDeletePermissionAction = (objectId) => {
    dispatch(onDeletePermission({objectId}));
  };

  const handleTableAction = (actionName, id, entry) => {
    switch (actionName) {
      case PERMISSION_TABLE_VIEW:
        onViewClick(id);
        break;
      case PERMISSION_TABLE_UPDATE:
        onCreateOrUpdatePermissionClick(id);
        break;
      case PERMISSION_TABLE_DELETE:
        onDeleteClick(id, entry);
        break;
    }
  };

  return (
    <>
      <AppPageMetadata title={messages['permission.list']} />
      <AppInfoView />
      <AppRowContainer>
        <Col key={1} span={24}>
          <AppCard title={messages['permission.list']}>
            <Row gutter={16}>
              <Col span={24}>
                <AppSpace>
                  <Button
                    type='primary'
                    onClick={() => onCreateOrUpdatePermissionClick()}
                    icon={<Icon component={BsPencil} />}>
                    {messages['permission.create']}
                  </Button>
                  <Button
                    type='default'
                    onClick={onReload}
                    icon={<Icon component={AiOutlineReload} />}>
                    {messages['common.reload']}
                  </Button>
                </AppSpace>
              </Col>
              <Col span={24}>
                <Form
                  form={form}
                  layout='vertical'
                  initialValues={{}}
                  onFinish={onFinish}>
                  <Row gutter={16} className='align-items-end'>
                    <Col xs={24} md={8} lg={9}>
                      <Form.Item
                        label={<IntlMessages id='common.information' />}
                        name='searchText'>
                        <AppInput />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={8} lg={9}>
                      <Form.Item
                        label={<IntlMessages id='permission.group' />}
                        name='group'>
                        <AppInput />
                      </Form.Item>
                    </Col>
                    <Col flex={1}>
                      <Form.Item shouldUpdate>
                        <AppSpace>
                          <Button type='primary' htmlType='submit'>
                            <IntlMessages id='common.search' />
                          </Button>
                          <Button onClick={onCancel} type='default'>
                            <IntlMessages id='common.cancel' />
                          </Button>
                        </AppSpace>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Col>
              <Col span={24}>
                <PermissionTable
                  error={error}
                  data={permissions}
                  loading={loading}
                  totalRow={totalRow}
                  onPageChange={onPageChange}
                  onDispatchAction={handleTableAction}
                />
              </Col>
            </Row>
          </AppCard>
        </Col>
      </AppRowContainer>
      <ViewPermissionDialog
        error={errorDetail}
        loading={loadingDetail}
        permissionDetail={detail}
        visible={showView}
        onCancel={() => setShowView(false)}
      />
      <UpdatePermissionDialog
        error={errorDetail}
        loading={loadingDetail}
        permissionDetail={detail}
        visible={showUpdate}
        onSubmit={onUpdatePermission}
        onCancel={() => {
          setShowUpdate(false);
        }}
      />
      <AppModalConfirm
        visible={!!showConfirm}
        onCancel={() => setShowConfirm(null)}
        {...showConfirm}
      />
    </>
  );
};

export default memo(ListPermission);

ListPermission.propTypes = {};

ListPermission.defaultProps = {};
