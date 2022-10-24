import AppInput from '@crema/core/AppInput';
import AppModal from '@crema/core/AppModal';
import AppSpace from '@crema/core/AppSpace';
import IntlMessages from '@crema/utility/IntlMessages';
import {Button, Col, Form, Input, Row} from 'antd';
import useFormMessage from 'hooks/useFormMessage';
import PropTypes from 'prop-types';
import React, {memo, useEffect} from 'react';

const InviteUserModal = ({visible, onInvite, onCancel}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [visible]);

  const {formatRequiredMessageId: frm, formatRequiredLabelId: frl} =
    useFormMessage();

  const onFinish = () => {
    onInvite?.(form.getFieldsValue());
  };

  return (
    <AppModal
      width={600}
      title={<IntlMessages id='am.inviteUser' />}
      maskClosable={false}
      onCancel={onCancel}
      footer={
        <Form.Item className='mb-0' shouldUpdate>
          <AppSpace>
            <Button onClick={() => form.submit()} type='primary'>
              <IntlMessages id='common.send' />
            </Button>
            <Button onClick={onCancel} type='default'>
              <IntlMessages id='common.cancel' />
            </Button>
          </AppSpace>
        </Form.Item>
      }
      visible={visible}>
      <Form
        form={form}
        onFinish={onFinish}
        layout='vertical'
        initialValues={{}}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              rules={[{required: true, message: frm('common.phoneNumber')}]}
              label={frl('common.phoneNumber')}
              name={'phoneNumber'}>
              <AppInput autoFocus/>
            </Form.Item>
            <Form.Item
              rules={[{required: true, message: frm('common.password')}]}
              label={frl('common.password')}
              name='password'>
              <Input.Password />
            </Form.Item>
            <Form.Item
              label={<IntlMessages id='common.fullName' />}
              name={['states', 'fullName']}>
              <AppInput />
            </Form.Item>
            <Form.Item
              label={<IntlMessages id='common.email'/>}
              name={['states', 'email']}>
              <AppInput />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </AppModal>
  );
};

export default memo(InviteUserModal);

InviteUserModal.propTypes = {
  visible: PropTypes.bool,
  onInvite: PropTypes.func,
  onCancel: PropTypes.func,
};

InviteUserModal.defaultProps = {};
