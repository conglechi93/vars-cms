import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Form } from 'antd';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useFormMessage from 'hooks/useFormMessage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FORGET_PASSWORD_CONFIRM_ROUTE } from '../declareRoute';
import '../index.style.less';
import { defaultSignInUrl } from 'shared/constants/AppConst';
import AppInput from '@crema/core/AppInput';
import { requestOTP } from 'redux/actions/OTP';

const ForgotPasswordOTP = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { formatRequiredMessageId: frm, formatRequiredLabelId: frl } =
    useFormMessage();
  const dispatch = useDispatch();
  const { state, pathname } = useLocation();
  const [captcha, setCaptcha]= useState('');

  useEffect(() => {
    if (state?.phoneNumber) {
      form.setFieldsValue({
        phoneNumber: state.phoneNumber,
      });
      navigate(pathname, {});
    }
  }, [state]);

  const otp=useSelector(state=>state.otp.otpSessionId);

  useEffect(()=>{
    if(otp!=''){
      navigate(FORGET_PASSWORD_CONFIRM_ROUTE);
    }
  },[otp])

  const onFinish = (data) => {
    dispatch(requestOTP({
      siteKey: process.env.REACT_APP_CAPTCHA_SITE_KEY,
      phoneNumber: data.phoneNumber,
      captchaToken: captcha,
      action: "RESET_PASSWORD"
    }))
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='sign'>
      <div className='sign-content'>
        <Form
          form={form}
          className='sign-form'
          name='basic'
          layout='vertical'
          initialValues={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <div className='form-padding-start'></div>
          <div className='para'>
            <p className='description'>
              <IntlMessages id='auth.forgotPassword1' />
            </p>
          </div>
          <Form.Item
            name='phoneNumber'
            className='form-field'
            label={frl('common.phoneNumber')}
            rules={[{ required: true, message: frm('common.phoneNumber') }]}>
            <AppInput maxLength={255} autoFocus />
          </Form.Item>
          <div className='form-btn-field w-100 mt-1'>
            <Button block type='primary' htmlType='submit' className='sign-btn'>
              <IntlMessages id='common.continue' />
            </Button>
          </div>
          <div className='form-padding-end'></div>
        </Form>
        <div className='sign-footer'>
          <div className='form-field-action'>
            <span className='sign-text'>
              <IntlMessages id='common.backToLogin' />
            </span>
            <Link
              to={defaultSignInUrl}
              className='underlineNone colorTextPrimary'>
              <IntlMessages id='common.login' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordOTP;
