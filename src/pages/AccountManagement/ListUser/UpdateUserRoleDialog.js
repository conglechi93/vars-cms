import {AppLoader} from '@crema';
import AppModal from '@crema/core/AppModal';
import AppSelect from '@crema/core/AppSelect';
import AppSpace from '@crema/core/AppSpace';
import IntlMessages from '@crema/utility/IntlMessages';
import {Button, Col, Form, Row} from 'antd';
import PropTypes from 'prop-types';
import React, {memo, useEffect} from 'react';

const UpdateUserRoleDialog = ({
  visible,
  loading,
  error,
  userDetail,
  roles,
  onCancel,
  onOk,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (error) onCancel?.();
  }, [visible, error]);

  useEffect(() => {
    form.resetFields();

    const {roles} = userDetail || {};
    form.setFieldsValue({
      roleIds: (roles || []).map((item) => item.objectId),
    });
  }, [userDetail]);

  const {email, others} = userDetail || {};
  const {fullName} = others || {};

  const onFinish = () => {
    onOk?.(form.getFieldsValue());
  };

  return (
    <AppModal
      width={700}
      title={<IntlMessages id='am.updateUserRole' />}
      maskClosable={true}
      onCancel={onCancel}
      footer={
        <AppSpace>
          <Button
            disabled={loading}
            onClick={() => form.submit()}
            type='primary'>
            <IntlMessages id='am.updateUserRole' />
          </Button>
          <Button onClick={onCancel} type='default'>
            <IntlMessages id='common.cancel' />
          </Button>
        </AppSpace>
      }
      visible={visible}>
      {loading ? (
        <AppLoader block />
      ) : (
        <Form
          form={form}
          onFinish={onFinish}
          layout='vertical'
          initialValues={{}}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                className='label'
                label={<IntlMessages id='common.fullName' />}>
                {fullName}
              </Form.Item>
              <Form.Item
                className='label'
                label={<IntlMessages id='common.email' />}>
                {email}
              </Form.Item>
              <Form.Item
                label={<IntlMessages id='common.role' />}
                name='roleIds'>
                <AppSelect
                  placeholder={<IntlMessages id='common.choose' />}
                  mode='multiple'>
                  {(roles || []).map((item) => (
                    <AppSelect.Option key={item.objectId} value={item.objectId}>
                      {item.name}
                    </AppSelect.Option>
                  ))}
                </AppSelect>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </AppModal>
  );
};

export default memo(UpdateUserRoleDialog);

UpdateUserRoleDialog.propTypes = {
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.string,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  userDetail: PropTypes.object,
  roles: PropTypes.array,
  userApp: PropTypes.array,
};

UpdateUserRoleDialog.defaultProps = {};
