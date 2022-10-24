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
  onAddClient,
  onCreateOrUpdateApplication,
  onDeleteClient,
  onGetAssignableUser,
  onGetListApplication,
} from 'redux/actions/AdminApplication';
import {defaultPageOption} from 'shared/constants/AppConst';
import {AiOutlineReload} from '@react-icons/all-files/ai/AiOutlineReload';
import Icon from '@ant-design/icons';
import {onGetApplicationDetail} from 'redux/actions/AdminApplication';
import {
  APPLICATION_TABLE_ADD_CLIENT,
  APPLICATION_TABLE_REMOVE_CLIENT,
  APPLICATION_TABLE_UPDATE,
  APPLICATION_TABLE_VIEW,
} from './ApplicationTableActions';
import ApplicationTable from './ApplicationTable';
import ViewApplicationDialog from './ViewApplicationDialog';
import UpdateApplicationDialog from './UpdateApplicationDialog';
import {BsPencil} from '@react-icons/all-files/bs/BsPencil';
import './index.style.less';
import AddClientDialog from './AddClientDialog';
import AppModalConfirm from '@crema/core/AppModalConfirm';

const ListApplication = () => {
  const intl = useIntl();
  const {messages} = intl;
  const dispatch = useDispatch();
  const {
    applications,
    loadingList,
    error,
    totalRow,
    detail,
    loadingDetail,
    errorDetail,
    assignableUser,
    loadingUser,
    errorUser,
  } = useSelector(({adminApplication}) => adminApplication);
  const {error: requestError, loading: requestLoading} = useSelector(
    ({common}) => common,
  );
  const [searchOpts, setSearchOpts] = useState(defaultPageOption);
  const [form] = Form.useForm();
  const [showView, setShowView] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);
  const [showConfirm, setShowConfirm] = useState(null);
  const selectItem = useRef(null);

  useEffect(() => {
    dispatch(onGetListApplication(searchOpts));
  }, [searchOpts]);

  useEffect(() => {
    if (!requestLoading && !requestError) {
      if (showView) setShowView(false);
      if (showUpdate) setShowUpdate(false);
      if (showAddClient) setShowAddClient(false);
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
    dispatch(onGetApplicationDetail(id));
    setShowView(true);
  };

  const onCreateOrUpdateApplicationClick = (id) => {
    selectItem.current = id;
    dispatch(onGetApplicationDetail(id));
    if (!id) dispatch(onGetAssignableUser());
    setShowUpdate(true);
  };

  const onCreateOrUpdateApplicationAction = (formData) => {
    dispatch(
      onCreateOrUpdateApplication({
        objectId: selectItem.current,
        ...formData,
      }),
    );
  };

  const onAddClientClick = (id) => {
    selectItem.current = id;
    setShowAddClient(true);
  };

  const onAddClientAction = (formData) => {
    dispatch(
      onAddClient({
        appId: selectItem.current,
        ...formData,
      }),
    );
  };

  const onDeleteClientClick = (id, entry) => {
    setShowConfirm({
      description: intl.formatMessage(
        {id: 'category.confirmDelete'},
        {value: entry.name},
      ),
      shouldEnter: entry.name,
      onOk: () => onDeleteClientAction(id),
    });
  };

  const onDeleteClientAction = (objectId) => {
    dispatch(onDeleteClient({objectId}));
  };

  const handleTableAction = (actionName, id, entry) => {
    switch (actionName) {
      case APPLICATION_TABLE_VIEW:
        onViewClick(id);
        break;
      case APPLICATION_TABLE_UPDATE:
        onCreateOrUpdateApplicationClick(id);
        break;
      case APPLICATION_TABLE_ADD_CLIENT:
        onAddClientClick(id);
        break;
      case APPLICATION_TABLE_REMOVE_CLIENT:
        onDeleteClientClick(id, entry);
        break;
    }
  };

  return (
    <>
      <AppPageMetadata title={messages['application.list']} />
      <AppInfoView />
      <AppRowContainer>
        <Col key={1} span={24}>
          <AppCard title={messages['application.list']}>
            <Row gutter={16}>
              <Col span={24}>
                <AppSpace>
                  <Button
                    type='primary'
                    onClick={() => onCreateOrUpdateApplicationClick()}
                    icon={<Icon component={BsPencil} />}>
                    {messages['application.create']}
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
                <ApplicationTable
                  error={error}
                  data={applications}
                  loading={loadingList}
                  totalRow={totalRow}
                  onPageChange={onPageChange}
                  onDispatchAction={handleTableAction}
                />
              </Col>
            </Row>
          </AppCard>
        </Col>
      </AppRowContainer>
      <ViewApplicationDialog
        error={errorDetail}
        loading={loadingDetail}
        applicationDetail={detail}
        visible={showView}
        onCancel={() => setShowView(false)}
      />
      <UpdateApplicationDialog
        error={errorDetail || errorUser}
        loading={loadingDetail || loadingUser}
        applicationDetail={detail}
        assignableUser={assignableUser}
        visible={showUpdate}
        onSubmit={onCreateOrUpdateApplicationAction}
        onCancel={() => {
          setShowUpdate(false);
        }}
      />
      <AddClientDialog
        visible={showAddClient}
        onSubmit={onAddClientAction}
        onCancel={() => setShowAddClient(false)}
      />
      <AppModalConfirm
        visible={!!showConfirm}
        onCancel={() => setShowConfirm(null)}
        {...showConfirm}
      />
    </>
  );
};

export default memo(ListApplication);

ListApplication.propTypes = {};

ListApplication.defaultProps = {};
