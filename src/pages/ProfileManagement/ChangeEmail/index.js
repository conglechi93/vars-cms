import {
    memo, useEffect, 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../index.style.less';
import { Button, Form, Input } from 'antd';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useFormMessage from 'hooks/useFormMessage';
// import AppInput from '@crema/core/AppInput';
import AppPageMetadata from '@crema/core/AppPageMetadata';
// import { useIntl } from 'react-intl';
import { onChangePassword } from 'redux/actions/Auth';


const changeEmail = () => {

    const {messages, formatMessage} = useIntl();

    const [form] = Form.useForm();

    const { formatRequiredMessageId: frm, formatRequiredLabelId: frl } = useFormMessage();

    const dispatch = useDispatch();

    const common= useSelector(state=>state.common);

    useEffect(()=>{

    }, [common])

    const onFinish = (data) => {
        let oldPassword=data.oldPassword;
        let newPassword=data.newPassword;
        dispatch(onChangePassword({oldPassword, newPassword}));
    }

    const onFinishFailed = (data) => {
        console.log("data", form.getFieldValue());
    }

    return (
        <div>
            <AppPageMetadata />
            <Form
                form={form}
                className='change-password-form'
                name='basic'
                layout='vertical'
                initialValues={{
                }}
                onFinish={onFinish}
                onFinishFailed={() => { onFinishFailed() }}>
                <div className='form-padding-start'></div>
                <Form.Item
                    name='oldPassword'
                    className='form-field'
                    label={frl('profile.oldPassword')}
                    rules={[{ required: true, message: frm('profile.oldPassword') }]}>
                    <Input.Password maxLength={30} autoFocus type='password' />
                </Form.Item>

                <Form.Item
                    name='newPassword'
                    className='form-field'
                    label={frl('profile.newPassword')}
                    rules={[{ required: true, message: frm('profile.newPassword') }]}>
                    <Input.Password maxLength={30}  type='password' />
                </Form.Item>

                <Form.Item
                    name='newPasswordAgain'
                    className='form-field'
                    label={frl('profile.newPasswordAgain')}
                    rules={[
                        {
                          required: true,
                          message: frm('profile.newPasswordAgain'),
                        },
                        ({getFieldValue}) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(messages['auth.passwordNotMatch']),
                            );
                          },
                        }),
                      ]}>
                    <Input.Password maxLength={30}  type='password' />
                </Form.Item>

                <div className='form-btn-field'>
                    <Button type='primary' htmlType='submit' className='change-password-btn'>
                        <IntlMessages id='profile.changePassword' />
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default changeEmail;

changeEmail.propTypes = {};

changeEmail.defaultProps = {};
