import {AppLoader} from '@crema';
import AppInput from '@crema/core/AppInput';
import AppModal from '@crema/core/AppModal';
import AppSelect from '@crema/core/AppSelect';
import AppSpace from '@crema/core/AppSpace';
import IntlMessages from '@crema/utility/IntlMessages';
import {Button, Col, Form, Row} from 'antd';
import useFormMessage from 'hooks/useFormMessage';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import React, {memo, useEffect, useState} from 'react';
import {useIntl} from 'react-intl';

const UpdateApplicationDialog = ({
  visible,
  onSubmit,
  onCancel,
  loading,
  error,
  applicationDetail,
  assignableUser,
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
  }, [visible, error]);

  useEffect(() => {
    if (!applicationDetail || isEqual(applicationDetail, {})) {
      form.resetFields();
      setIsUpdate(false);
    } else {
      const detail = {...applicationDetail};
      form.setFieldsValue({
        ...detail,
      });
      setIsUpdate(true);
    }
  }, [applicationDetail]);

  const validateCode = (v) =>
    /(^[A-Za-z])([A-Za-z_]){0,}$/.test(v.toUpperCase().trim());

  return (
    <AppModal
      width={500}
      title={
        <IntlMessages
          id={isUpdate ? 'application.update' : 'application.create'}
        />
      }
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
                  {required: true, message: frm('application.code')},
                  {
                    validator: (r, v) =>
                      validateCode(v) ? Promise.resolve() : Promise.reject(),
                    message: messages['validator.invalidFormat'],
                  },
                ]}
                label={frl('application.code')}
                name='code'>
                <AppInput
                  disabled={isUpdate}
                  autoFocus={!isUpdate}
                  placeholder={messages['permission.format']}
                />
              </Form.Item>
              <Form.Item
                rules={[{required: true, message: frm('application.name')}]}
                label={frl('application.name')}
                name='name'>
                <AppInput autoFocus={isUpdate} />
              </Form.Item>

              {!isUpdate && (
                <Form.Item
                  label={<IntlMessages id='application.masterUser' />}
                  name='adminUserId'>
                  <AppSelect placeholder={<IntlMessages id='common.choose' />}>
                    {(assignableUser || []).map((item) => (
                      <AppSelect.Option
                        key={item.objectId}
                        value={item.objectId}>
                        {item.username}
                      </AppSelect.Option>
                    ))}
                  </AppSelect>
                </Form.Item>
              )}
            </Col>
          </Row>
        </Form>
      )}
    </AppModal>
  );
};

export default memo(UpdateApplicationDialog);

UpdateApplicationDialog.propTypes = {
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  applicationDetail: PropTypes.object,
  assignableUser: PropTypes.array,
};

UpdateApplicationDialog.defaultProps = {};
