import {useNavigate} from 'react-router-dom';
import {Button, Form, Statistic, Typography} from 'antd';
import {FormattedMessage} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import IntlMessages from '@crema/utility/IntlMessages';
import {
  onChangeAddressOTP,
  onConfirmSignupOTP,
  onSignupWithOTP,
} from 'redux/actions/Auth';
import {RESET_PASSWORD_ROUTE, SIGN_UP_OTP_ROUTE} from '../declareRoute';
import {useFormItemOTP} from 'components/FormItemOTP/useFormItemOTP';
import AppSpace from '@crema/core/AppSpace';
import Recaptcha from 'components/Recaptcha/Recaptcha';
import {AuthCaptchaHandle} from '../AuthCaptchaHandle';

const ConfirmOTP = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const otpCount = 6;
  const {generateInput} = useFormItemOTP(otpCount, form);
  const {waitOTPConfirm, user, OTPTimeout, sessionToken} = useSelector(
    ({auth}) => auth,
  );
  const [showCountdown, setShowCountdown] = useState(false);
  useEffect(() => {
    if (!waitOTPConfirm) {
      navigate(sessionToken ? RESET_PASSWORD_ROUTE : SIGN_UP_OTP_ROUTE);
    }
  }, [waitOTPConfirm]);

  useEffect(() => {
    setShowCountdown(OTPTimeout > 0);
  }, [OTPTimeout]);

  const onChangePhone = () => {
    const email = user;
    dispatch(onChangeAddressOTP());
    navigate(SIGN_UP_OTP_ROUTE, {state: {email}});
  };

  const onFinish = (data) => {
    const otp = Object.values(data).join('');
    dispatch(onConfirmSignupOTP(user, otp));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onCountdownFinish = () => {
    setShowCountdown(false);
  };

  const {makeRequest, captchaRef} = AuthCaptchaHandle();
  const onResendOTP = () =>
    makeRequest().then((value) =>
      dispatch(onSignupWithOTP({email: user, captcha: value})),
    );

  return (
    <div className='sign'>
      <div className='sign-content'>
        <div className='para'>
          <p className='description'>
            <FormattedMessage id='auth.otpConfirm' values={{email: user}} />
            <br />
            <Typography.Link underline onClick={() => onChangePhone()}>
              <IntlMessages id='common.changeEmail' />
            </Typography.Link>
          </p>
        </div>

        <Form
          className='confirm-form'
          name='basic'
          layout='inline'
          initialValues={{}}
          onFinish={onFinish}
          form={form}
          onFinishFailed={onFinishFailed}>
          <AppSpace className='otp-row'>{generateInput()}</AppSpace>

          <div className='resend-after'>
            {showCountdown ? (
              <>
                <span className='sign-text'>
                  <IntlMessages id='auth.resendOTPAfter' />
                </span>
                &nbsp;
                <Statistic.Countdown
                  format='mm:ss'
                  value={Date.now() + OTPTimeout}
                  onFinish={onCountdownFinish}
                />
              </>
            ) : (
              <>
                <span className='resend-after-text'>
                  <IntlMessages id='auth.resendMessage' />
                </span>
                &nbsp;
                <span onClick={onResendOTP} className='resend-after-link'>
                  <IntlMessages id='common.resend' />
                </span>
              </>
            )}
          </div>
          <Recaptcha ref={captchaRef} />
          <div className='form-btn-field w-100'>
            <Button block type='primary' htmlType='submit' className='sign-btn'>
              <IntlMessages id='common.signup' />
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ConfirmOTP;
