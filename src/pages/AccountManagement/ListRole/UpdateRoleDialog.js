import {AppLoader} from '@crema';
import AppInput from '@crema/core/AppInput';
import AppModal from '@crema/core/AppModal';
import AppSpace from '@crema/core/AppSpace';
import AppTextarea from '@crema/core/AppTextarea';
import IntlMessages from '@crema/utility/IntlMessages';
import {Button, Checkbox, Col, Form, Row} from 'antd';
import useFormMessage from 'hooks/useFormMessage';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import React, {memo, useEffect, useState} from 'react';
import {useIntl} from 'react-intl';

const UpdateRoleDialog = ({
  visible,
  onSubmit,
  onCancel,
  loading,
  error,
  assignablePermissions,
  roleDetail,
}) => {
  const [form] = Form.useForm();
  const {messages} = useIntl();
  const [isUpdate, setIsUpdate] = useState(false);
  const {formatRequiredMessageId: frm, formatRequiredLabelId: frl} =
    useFormMessage();

  useEffect(() => {
    form.resetFields();
  }, [visible]);

  const onFinish = () => {
    onSubmit?.({
      ...form.getFieldsValue(),
    });
  };

  useEffect(() => {
    if (error) onCancel?.();
  }, [visible, error]);

  useEffect(() => {
    if (!roleDetail || isEqual(roleDetail, {})) {
      form.resetFields();
      setIsUpdate(false);
    } else {
      const {name, code, description, permissions} = roleDetail;
      form.setFieldsValue({
        name,
        code,
        description,
        permissionIds: (permissions || []).map((item) => item.objectId),
      });
      setIsUpdate(true);
    }
  }, [roleDetail]);

  const validateCode = (v) =>
    /(^[A-Za-z])([A-Za-z_]){0,}$/.test(v.toUpperCase().trim());

  return (
    <AppModal
      width={800}
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
          layout='vertical'
          initialValues={{}}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                rules={[
                  {required: true, message: frm('am.roleCode')},
                  {
                    validator: (r, v) =>
                      validateCode(v) ? Promise.resolve() : Promise.reject(),
                    message: messages['validator.invalidFormat'],
                  },
                ]}
                label={frl('am.roleCode')}
                name='code'>
                <AppInput
                  disabled={isUpdate}
                  autoFocus={!isUpdate}
                  placeholder={messages['permission.format']}
                />
              </Form.Item>
              <Form.Item
                rules={[{required: true, message: frm('am.roleName')}]}
                label={frl('am.roleName')}
                name='name'>
                <AppInput autoFocus={isUpdate} />
              </Form.Item>

              <Form.Item
                label={<IntlMessages id='common.description' />}
                name='description'>
                <AppTextarea rows='6' />
              </Form.Item>
              {assignablePermissions.length ? (
                <Form.Item
                  label={<IntlMessages id='common.permission' />}
                  name='permissionIds'>
                  <Checkbox.Group className='w-100'>
                    <Row gutter={[16, 8]}>
                      {assignablePermissions.map((item) => (
                        <Col key={item.objectId} sm={12}>
                          <Checkbox value={item.objectId}>
                            {item.name || (
                              <i className='d-inline-block text-lh-1'>
                                <IntlMessages id='common.unamed' />
                                &nbsp; ({item.code})
                              </i>
                            )}
                          </Checkbox>
                        </Col>
                      ))}
                    </Row>
                  </Checkbox.Group>
                </Form.Item>
              ) : (
                <Form.Item label={<IntlMessages id='common.permission' />}>
                  <IntlMessages id='common.emptyData' />
                </Form.Item>
              )}
            </Col>
          </Row>
        </Form>
      )}
    </AppModal>
  );
};

export default memo(UpdateRoleDialog);

UpdateRoleDialog.propTypes = {
  visible: PropTypes.bool,
  assignablePermissions: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  roleDetail: PropTypes.object,
};

UpdateRoleDialog.defaultProps = {};
