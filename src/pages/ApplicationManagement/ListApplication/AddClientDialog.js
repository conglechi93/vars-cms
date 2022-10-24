import AppInput from '@crema/core/AppInput';
import AppModal from '@crema/core/AppModal';
import AppSpace from '@crema/core/AppSpace';
import IntlMessages from '@crema/utility/IntlMessages';
import {Button, Col, Form, Row} from 'antd';
import useFormMessage from 'hooks/useFormMessage';
import PropTypes from 'prop-types';
import {memo, useEffect} from 'react';

const AddClientDialog = ({visible, onSubmit, onCancel}) => {
  const [form] = Form.useForm();
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

  const onFinishFailed = () => {};

  return (
    <AppModal
      width={500}
      title={<IntlMessages id='application.addClient' />}
      maskClosable={false}
      onCancel={onCancel}
      footer={
        <Form.Item className='mb-0' shouldUpdate>
          <AppSpace>
            <Button onClick={() => form.submit()} type='primary'>
              <IntlMessages id='common.create' />
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
        onFinishFailed={onFinishFailed}
        layout='vertical'
        initialValues={{}}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              rules={[{required: true, message: frm('common.name')}]}
              label={frl('common.name')}
              name='name'>
              <AppInput autoFocus />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </AppModal>
  );
};

export default memo(AddClientDialog);

AddClientDialog.propTypes = {
  visible: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

AddClientDialog.defaultProps = {};
