import {AppLoader} from '@crema';
import AppInput from '@crema/core/AppInput';
import AppModal from '@crema/core/AppModal';
import AppSpace from '@crema/core/AppSpace';
import AppTextarea from '@crema/core/AppTextarea';
import IntlMessages from '@crema/utility/IntlMessages';
import {Button, Col, Form, Row} from 'antd';
import useFormMessage from 'hooks/useFormMessage';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import React, {memo, useEffect, useState} from 'react';
import {useIntl} from 'react-intl';

const UpdatePermissionDialog = ({
  visible,
  onSubmit,
  onCancel,
  loading,
  error,
  permissionDetail,
}) => {
  const [form] = Form.useForm();
  const [isUpdate, setIsUpdate] = useState(false);
  const {formatRequiredMessageId: frm, formatRequiredLabelId: frl} =
    useFormMessage();
  const {messages} = useIntl();

  useEffect(() => {
    form.resetFields();
  }, [visible]);

  const onFinish = () => {
    onSubmit?.({
      ...form.getFieldsValue(),
    });
  };

  const onFinishFailed = () => {};

  useEffect(() => {
    if (error) onCancel?.();
  }, [error]);

  useEffect(() => {
    if (!permissionDetail || isEqual(permissionDetail, {})) {
      form.resetFields();
      setIsUpdate(false);
    } else {
      const detail = {...permissionDetail};
      form.setFieldsValue({
        ...detail,
      });
      setIsUpdate(true);
    }
  }, [permissionDetail]);

  const validateGroup = (v) =>
    /(^[A-Za-z])([A-Za-z_]){0,}$/.test(v.toUpperCase().trim());

  return (
    <AppModal
      width={600}
      title={<IntlMessages id={isUpdate ? 'am.updateRole' : 'am.createRole'} />}
      maskClosable={false}
      onCancel={onCancel}
      footer={
        <Form.Item className='mb-0' shouldUpdate>
          <AppSpace>
            <Button
              disabled={loading}
              onClick={() => form.submit()}
              type='primary'>
              <IntlMessages id={isUpdate ? 'common.update' : 'common.create'} />
            </Button>
            <Button onClick={onCancel} type='default'>
              <IntlMessages id='common.cancel' />
            </Button>
          </AppSpace>
        </Form.Item>
      }
      visible={visible}>
      {loading ? (
        <AppLoader block />
      ) : (
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout='vertical'
          initialValues={{
            usageLanguage: [],
          }}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                rules={[
                  {required: true, message: frm('permission.code')},
                  {
                    validator: (r, v) =>
                      validateGroup(v) ? Promise.resolve() : Promise.reject(),
                    message: messages['validator.invalidFormat'],
                  },
                ]}
                label={frl('permission.code')}
                name='code'>
                <AppInput
                  autoFocus={!isUpdate}
                  disabled={isUpdate}
                  placeholder={messages['permission.format']}
                />
              </Form.Item>
              <Form.Item
                rules={[{required: true, message: frm('permission.name')}]}
                label={frl('permission.name')}
                name='name'>
                <AppInput autoFocus={isUpdate} />
              </Form.Item>
              <Form.Item
                label={<IntlMessages id='common.description' />}
                name='description'>
                <AppTextarea />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </AppModal>
  );
};

export default memo(UpdatePermissionDialog);

UpdatePermissionDialog.propTypes = {
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  permissionDetail: PropTypes.object,
};

UpdatePermissionDialog.defaultProps = {};
