import {useNavigate} from 'react-router-dom';
import {Button, Form, Input} from 'antd';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useFormMessage from 'hooks/useFormMessage';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {onResetPassword} from 'redux/actions/Auth';
import {defaultSignInUrl} from 'shared/constants/AppConst';

const ResetPassword = () => {
  const navigate = useNavigate();
  const {messages, formatMessage} = useIntl();
  const {formatRequiredMessageId: frm, formatRequiredLabelId: frl} =
    useFormMessage();
  const dispatch = useDispatch();
  const {sessionToken, user} = useSelector(({auth}) => auth);
  // useEffect(() => {
  //   if (!sessionToken) {
  //     const email = user || '';
  //     navigate(defaultSignInUrl, {state: {email}});
  //   }
  // }, [sessionToken]);

  const onFinish = ({newPassword}) =>
    dispatch(onResetPassword(null, newPassword));

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='sign'>
      <div className='sign-content'>
        <div className='form-padding-start'></div>

        <Form
          className='sign-form'
          name='basic'
          layout='vertical'
          initialValues={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <div className='para'>
            <p className='description'>
              <IntlMessages id='auth.resetPassword1' />
            </p>
          </div>
          <Form.Item
            name='newPassword'
            label={frl('common.password')}
            className='form-field'
            rules={[
              {required: true, message: frm('common.password')},
              {
                min: 6,
                message: formatMessage(
                  {id: 'auth.passwordMinLength'},
                  {count: 6},
                ),
              },
            ]}>
            <Input.Password maxLength={30} autoFocus type='password' />
          </Form.Item>
          <Form.Item
            name='confirmNewPassword'
            dependencies={['newPassword']}
            label={frl('auth.confirmNewPassword')}
            className='form-field'
            rules={[
              {
                required: true,
                message: frm('auth.confirmNewPassword'),
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
            <Input.Password maxLength={30} type='password' />
          </Form.Item>

          <div className='form-btn-field mt-1'>
            <Button type='primary' htmlType='submit' className='sign-btn'>
              <IntlMessages id='common.change' />
            </Button>
          </div>
        </Form>
        <div className='form-padding-end'></div>
      </div>
    </div>
  );
};

export default ResetPassword;
