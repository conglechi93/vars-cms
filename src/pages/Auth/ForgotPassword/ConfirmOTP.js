import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Statistic, Typography } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import '../index.style.less';
import IntlMessages from '@crema/utility/IntlMessages';
import {
  onChangeAddressOTP,
  onConfirmForgotPasswordOTP,
  onForgotPassword,
} from 'redux/actions/Auth';
import { FORGET_PASSWORD_CONFIRM_ROUTE, FORGET_PASSWORD_INPUT_ROUTE, FORGET_PASSWORD_ROUTE } from '../declareRoute';
import { useFormItemOTP } from 'components/FormItemOTP/useFormItemOTP';
import useFormMessage from 'hooks/useFormMessage';
import RcQueueAnim from 'rc-queue-anim';
import './index.style.less';
import AppSpace from '@crema/core/AppSpace';
import clsx from 'clsx';
import Recaptcha from 'components/Recaptcha/Recaptcha';
import { requestOTP, verifyOTP } from 'redux/actions/OTP';
import { OTP_CHANGE_PHONE_NUMBER, OTP_RESET_TIMEOUT } from 'shared/constants/ActionTypes';

const ConfirmOTP = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formatRequiredMessageId: frm, formatRequiredLabelId: frl } =
    useFormMessage();
  const otpCount = 6;
  const { generateInput } = useFormItemOTP(otpCount, form);
  const [showCountdown, setShowCountdown] = useState(false);
  const [captcha, setCaptcha] = useState('');


  const otpState = useSelector(state => state.otp);
  const otpTimeOut = useSelector(state => state.otp.timeout);
  const otpSessionId = useSelector(state => state.otp.otpSessionId);
  const otpToken = useSelector(state => state.otp.otpToken);

  useEffect(() => {
    if (otpToken != '') {
      navigate(FORGET_PASSWORD_INPUT_ROUTE);
    }
  }, [otpToken])
  useEffect(() => {
    setShowCountdown(otpTimeOut > 0);
  }, [otpTimeOut]);

  const onOTPFinish = (data) => {
    const otp = Object.values(data).join('');
    dispatch(verifyOTP({
      siteKey: "fa3c2ce8a3382805700aa79c02b92b99",
      otpValue: otp,
      otpSessionId: otpSessionId
    }))
  };


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onCountdownFinish = () => {
    setShowCountdown(false);
    dispatch({type: OTP_RESET_TIMEOUT});
  };

  const onChangePhone = () => {
    dispatch({ type: OTP_CHANGE_PHONE_NUMBER, payload: '' });
    navigate(FORGET_PASSWORD_ROUTE);
  };
  const onResendOTP = () => {
    dispatch(requestOTP({
      siteKey: process.env.REACT_APP_RECAPTCHA_SITE_KEY,
      phoneNumber: otpState.phoneNumber,
      captchaToken: captcha,
      action: "RESET_PASSWORD"
    }))
  };


  return (
    <div className='sign forgot-password'>
      <div className='sign-content'>
        <div className='para'>
          <p className='description'>
            <FormattedMessage id='auth.otpConfirm' values={{ phoneNumber: otpState.phoneNumber }} />
            <br />
            <Typography.Link underline onClick={() => onChangePhone()}>
              <IntlMessages id='common.changePhone' />
            </Typography.Link>
          </p>
        </div>

        <Form
          className='confirm-form'
          name='basic'
          layout='inline'
          initialValues={{}}
          form={form}
          onFinish={onOTPFinish}
          onFinishFailed={onFinishFailed}>
          <AppSpace className='otp-row'>{generateInput()}</AppSpace>

          <div className='resend-after'>
            {showCountdown ? (
              <>
                <span className='resend-after-text'>
                  <IntlMessages id='auth.resendOTPAfter' />
                </span>
                &nbsp;
                <Statistic.Countdown
                  format='mm:ss'
                  value={Date.now() + otpTimeOut}
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
          <div className='form-btn-field w-100'>
            <Button block type='primary' htmlType='submit' className='sign-btn'>
              <IntlMessages id='common.continue' />
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ConfirmOTP;
