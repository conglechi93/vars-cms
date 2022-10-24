import clsx from 'clsx';
import '../AppModal/index.style.less';
import AppInput from '../AppInput';
import {Form} from 'antd';
import AppModal from '../AppModal';
import {useIntl} from 'react-intl';
import {useEffect, useState} from 'react';

const AppModalInputConfirm = (props) => {
  const {
    className,
    title,
    okText,
    cancelText,
    description,
    shouldEnterLabel,
    shouldEnter,
    visible,
    ...rest
  } = props || {};
  const {messages} = useIntl();
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(true);
  const onValuesChange = (changes) => {
    const {input} = changes;
    setDisabled(input !== shouldEnter);
    console.log(input, input == shouldEnter);
  };

  useEffect(() => {
    if (visible) form.resetFields();
  }, [visible]);
  useEffect(() => {
    if (shouldEnter) setDisabled(true);
    else setDisabled(false);
  }, [shouldEnter]);

  return (
    <AppModal
      className={clsx(className, 'app-modal')}
      title={title || messages['common.confirm']}
      okText={okText || messages['common.confirm']}
      cancelText={cancelText || messages['common.cancelText']}
      visible={visible}
      okButtonProps={{disabled}}
      {...rest}>
      <>
        {description || ''}
        {shouldEnter && (
          <>
            <div
              style={{marginTop: 8, marginBottom: 4}}
              dangerouslySetInnerHTML={{
                __html: messages['confirm.enterValue']?.replace(
                  '{value}',
                  shouldEnter || '',
                ),
              }}
            />
            <Form layout='vertical' form={form} onValuesChange={onValuesChange}>
              <Form.Item
                label={shouldEnterLabel || messages['common.value']}
                name='input'>
                <AppInput autoFocus />
              </Form.Item>
            </Form>
          </>
        )}
      </>
    </AppModal>
  );
};

export default AppModalInputConfirm;
