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
  onCreateOrUpdateRole,
  onGetListRolePermission,
  onGetListRole,
  onGetRoleDetail,
} from 'redux/actions/AMRole';
import {defaultPageOption} from 'shared/constants/AppConst';
import RoleTable from './RoleTable';
import {AiOutlineReload} from '@react-icons/all-files/ai/AiOutlineReload';
import {BsPencil} from '@react-icons/all-files/bs/BsPencil';
import Icon from '@ant-design/icons';
import UpdateRoleDialog from './UpdateRoleDialog';
import {ROLE_TABLE_EDIT, ROLE_TABLE_VIEW} from './RoleTableActions';
import ViewRoleDialog from './ViewRoleDialog';
import './index.style.less';

const ListRole = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const {
    roles,
    loadingRole,
    errorRole,
    totalRow,
    loadingPermission,
    assignablePermissions,
    errorPermission,
    detail,
    loadingDetail,
    errorDetail,
  } = useSelector(({amRole}) => amRole);
  const {error: requestError, loading: requestLoading} = useSelector(
    ({common}) => common,
  );
  const [searchOpts, setSearchOpts] = useState(defaultPageOption);
  const [form] = Form.useForm();
  const [showView, setShowView] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const selectItem = useRef(null);

  useEffect(() => {
    dispatch(onGetListRole(searchOpts));
  }, [searchOpts]);

  useEffect(() => {
    if (!requestLoading && !requestError) {
      if (showUpdate) setShowUpdate(false);
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
    dispatch(onGetRoleDetail(id));
    setShowView(true);
  };

  const onCreateOrUpdateRoleClick = (id) => {
    selectItem.current = id;
    dispatch(onGetListRolePermission());
    dispatch(onGetRoleDetail(id));
    setShowUpdate(true);
  };

  const onUpdateSubmit = (formData) => {
    dispatch(
      onCreateOrUpdateRole({
        objectId: selectItem.current,
        ...formData,
      }),
    );
  };

  const handleTableAction = (actionName, payload) => {
    switch (actionName) {
      case ROLE_TABLE_VIEW:
        onViewClick(payload);
        break;
      case ROLE_TABLE_EDIT:
        onCreateOrUpdateRoleClick(payload);
        break;
    }
  };

  return (
    <>
      <AppPageMetadata title={messages['am.roleList']} />
      <AppInfoView />
      <AppRowContainer>
        <Col key={1} span={24}>
          <AppCard title={messages['am.roleList']}>
            <Row gutter={16}>
              <Col span={24}>
                <AppSpace>
                  <Button
                    type='primary'
                    onClick={() => onCreateOrUpdateRoleClick()}
                    icon={<Icon component={BsPencil} />}>
                    {messages['am.createRole']}
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
                <RoleTable
                  error={errorRole}
                  data={roles}
                  loading={loadingRole}
                  totalRow={totalRow}
                  onPageChange={onPageChange}
                  onDispatchAction={handleTableAction}
                />
              </Col>
            </Row>
          </AppCard>
        </Col>
      </AppRowContainer>
      <UpdateRoleDialog
        error={errorPermission || errorDetail}
        loading={loadingPermission || loadingDetail}
        roleDetail={detail}
        assignablePermissions={assignablePermissions}
        visible={showUpdate}
        onCancel={() => setShowUpdate(false)}
        onSubmit={onUpdateSubmit}
      />
      <ViewRoleDialog
        error={errorDetail}
        loading={loadingDetail}
        roleDetail={detail}
        visible={showView}
        onCancel={() => setShowView(false)}
      />
    </>
  );
};

export default memo(ListRole);

ListRole.propTypes = {};

ListRole.defaultProps = {};
