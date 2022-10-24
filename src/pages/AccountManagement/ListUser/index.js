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
  onGetListUser,
  // onGetListUserApp,
  onGetUserDetail,
  onInviteUser,
  onUpdateUserRole,
} from 'redux/actions/AMUser';
import {defaultPageOption} from 'shared/constants/AppConst';
import UserTable from './UserTable';
import {IoIosSend} from '@react-icons/all-files/io/IoIosSend';
import {AiOutlineReload} from '@react-icons/all-files/ai/AiOutlineReload';
import Icon from '@ant-design/icons';
import InviteUserModal from './InviteUserModal';
import {USER_TABLE_UPDATE_ROLE, USER_TABLE_VIEW} from './UserTableActions';
import ViewUserDialog from './ViewUserDialog';
import UpdateUserRoleDialog from './UpdateUserRoleDialog';
import {onGetAllRole} from 'redux/actions/AMRole';

const ListUser = () => {
  
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const {
    current: users,
    loading,
    error,
    totalRow,
    detail,
    loadingDetail,
    errorDetail,
    // userApp,
    // loadingApp,
    // errorApp
  } = useSelector(({amUser}) => amUser);
  const {error: requestError, loading: requestLoading} = useSelector(
    ({common}) => common,
  );
  const {roles, loadingRole, errorRole} = useSelector(({amRole}) => amRole);
  const [searchOpts, setSearchOpts] = useState(defaultPageOption);
  const [form] = Form.useForm();
  const [showInvite, setShowInvite] = useState(false);
  const [showView, setShowView] = useState(false);
  const selectItem = useRef(null);
  const [showUpdateRole, setShowUpdateRole] = useState(false);

  useEffect(() => {
    if (!loadingRole) dispatch(onGetListUser(searchOpts));
  }, [searchOpts]);

  useEffect(() => {
    if (!requestLoading && !requestError) {
      if (showInvite) setShowInvite(false);
      if (showUpdateRole) setShowUpdateRole(false);
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
    dispatch(onGetUserDetail(id));
    setShowView(true);
  };

  const onUpdateRoleClick = (id) => {
    selectItem.current = id;
    dispatch(onGetAllRole());
    dispatch(onGetUserDetail(id));
    // dispatch(onGetListUserApp())
    setShowUpdateRole(true);
  };

  const onInvite = (formData) => {
    dispatch(onInviteUser({...formData}));
  };

  const onUpdateRole = (formData) => {
    dispatch(
      onUpdateUserRole({
        userId: selectItem.current,
        ...formData,
      }),
    );
  };

  const handleTableAction = (actionName, payload) => {
    switch (actionName) {
      case USER_TABLE_VIEW:
        onViewClick(payload);
        break;
      case USER_TABLE_UPDATE_ROLE:
        onUpdateRoleClick(payload);
        break;
    }
  };

  return (
    <>
      <AppPageMetadata title={messages['am.userList']} />
      <AppInfoView />
      <AppRowContainer>
        <Col key={1} span={24}>
          <AppCard title={messages['am.userList']}>
            <Row gutter={16}>
              <Col span={24}>
                <AppSpace>
                  <Button
                    type='primary'
                    onClick={() => setShowInvite(true)}
                    icon={<Icon component={IoIosSend} />}>
                    {messages['am.inviteUser']}
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
                <UserTable
                  error={error}
                  data={users}
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
      <InviteUserModal
        visible={showInvite}
        onInvite={onInvite}
        onCancel={() => setShowInvite(false)}
      />
      <ViewUserDialog
        error={errorDetail}
        loading={loadingDetail}
        userDetail={detail}
        visible={showView}
        onCancel={() => setShowView(false)}
      />
      <UpdateUserRoleDialog
        error={errorDetail || errorRole}
        loading={loadingDetail || loadingRole}
        userDetail={detail}
        roles={roles}
        visible={showUpdateRole}
        onOk={onUpdateRole}
        onCancel={() => setShowUpdateRole(false)}
      />
    </>
  );
};

export default memo(ListUser);

ListUser.propTypes = {};

ListUser.defaultProps = {};
