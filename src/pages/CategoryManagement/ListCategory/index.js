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
  onCreateOrUpdateCategory,
  onDeleteCategory,
  onGetListCategory,
} from 'redux/actions/Category';
import {defaultPageOption} from 'shared/constants/AppConst';
import {AiOutlineReload} from '@react-icons/all-files/ai/AiOutlineReload';
import Icon from '@ant-design/icons';
import {onGetCategoryDetail} from 'redux/actions/Category';
import {
  CATEGORY_TABLE_DELETE,
  CATEGORY_TABLE_DUPLICATE,
  CATEGORY_TABLE_UPDATE,
  CATEGORY_TABLE_VIEW,
} from './CategoryTableActions';
import CategoryTable from './CategoryTable';
import ViewCategoryDialog from './ViewCategoryDialog';
import UpdateCategoryDialog from './UpdateCategoryDialog';
import {BsPencil} from '@react-icons/all-files/bs/BsPencil';
import './index.style.less';
import AppModalConfirm from '@crema/core/AppModalConfirm';

const ListCategory = () => {
  const intl = useIntl();
  const {messages} = intl;
  const dispatch = useDispatch();
  const {
    current: categories,
    loading,
    error,
    totalRow,
    detail,
    loadingDetail,
    errorDetail,
  } = useSelector(({category}) => category);
  const {error: requestError, loading: requestLoading} = useSelector(
    ({common}) => common,
  );
  const [searchOpts, setSearchOpts] = useState(defaultPageOption);
  const [form] = Form.useForm();
  const [showView, setShowView] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDuplicate, setShowDuplicate] = useState(false);
  const [showConfirm, setShowConfirm] = useState(null);
  const selectItem = useRef(null);

  useEffect(() => {
    dispatch(onGetListCategory(searchOpts));
  }, [searchOpts]);

  useEffect(() => {
    if (!requestLoading && !requestError) {
      if (showView) setShowView(false);
      if (showUpdate) setShowUpdate(false);
      if (showDuplicate) setShowDuplicate(false);
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
    dispatch(onGetCategoryDetail(id));
    setShowView(true);
  };

  const onCreateOrUpdateCategoryClick = (id) => {
    selectItem.current = id;
    dispatch(onGetCategoryDetail(id));
    setShowUpdate(true);
  };

  const onDuplicateClick = (id) => {
    dispatch(onGetCategoryDetail(id));
    setShowDuplicate(true);
  };

  const onDeleteClick = (id, entry) => {
    setShowConfirm({
      description: intl.formatMessage(
        {id: 'category.confirmDelete'},
        {value: entry.code},
      ),
      shouldEnter: entry.code,
      onOk: () => onDeleteCat(id),
    });
  };

  const onUpdateCategory = (formData) => {
    dispatch(
      onCreateOrUpdateCategory({
        objectId: selectItem.current,
        ...formData,
      }),
    );
  };

  const onDeleteCat = (objectId) => {
    dispatch(onDeleteCategory({objectId}));
  };

  const handleTableAction = (actionName, id, entry) => {
    switch (actionName) {
      case CATEGORY_TABLE_VIEW:
        onViewClick(id);
        break;
      case CATEGORY_TABLE_UPDATE:
        onCreateOrUpdateCategoryClick(id);
        break;
      case CATEGORY_TABLE_DUPLICATE:
        onDuplicateClick(id);
        break;
      case CATEGORY_TABLE_DELETE:
        onDeleteClick(id, entry);
        break;
    }
  };

  return (
    <>
      <AppPageMetadata title={messages['category.list']} />
      <AppInfoView />
      <AppRowContainer>
        <Col key={1} span={24}>
          <AppCard title={messages['category.list']}>
            <Row gutter={16}>
              <Col span={24}>
                <AppSpace>
                  <Button
                    type='primary'
                    onClick={() => onCreateOrUpdateCategoryClick()}
                    icon={<Icon component={BsPencil} />}>
                    {messages['category.create']}
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
                        label={<IntlMessages id='category.group' />}
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
                <CategoryTable
                  error={error}
                  data={categories}
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
      <ViewCategoryDialog
        error={errorDetail}
        loading={loadingDetail}
        categoryDetail={detail}
        visible={showView}
        onCancel={() => setShowView(false)}
      />
      <UpdateCategoryDialog
        error={errorDetail}
        loading={loadingDetail}
        categoryDetail={detail}
        visible={showUpdate || showDuplicate}
        duplicate={showDuplicate}
        onSubmit={onUpdateCategory}
        onCancel={() => {
          setShowDuplicate(false);
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

export default memo(ListCategory);

ListCategory.propTypes = {};

ListCategory.defaultProps = {};
