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
import { FORGET_PASSWORD_ROUTE } from '../declareRoute';
import { useFormItemOTP } from 'components/FormItemOTP/useFormItemOTP';
import useFormMessage from 'hooks/useFormMessage';
import RcQueueAnim from 'rc-queue-anim';
import './index.style.less';
import AppSpace from '@crema/core/AppSpace';
import clsx from 'clsx';
import Recaptcha from 'components/Recaptcha/Recaptcha';
import { verifyOTP } from 'redux/actions/OTP';

const ForgotPasswordInputNewPassword = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formatRequiredMessageId: frm, formatRequiredLabelId: frl } =
    useFormMessage();
  const { messages, formatMessage } = useIntl();


  const otp = useSelector(state => state.otp);
  const otpToken = useSelector(state => state.otp.otpToken);
  useEffect(() => {
    if (otpToken == '') {
      navigate("/");
    }

  }, [otpToken])
  const onFinish = (data) => {
    let phoneNumber = otp.phoneNumber;
    let otpToken = otp.otpToken;
    let newPassword = data.newPassword;
    dispatch(onForgotPassword({ phoneNumber, otpToken, newPassword }));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onCountdownFinish = () => {
    // setShowCountdown(false);
  };

  const onResendOTP = () => {
    // makeRequest().then((value) =>
    //   dispatch(onForgotPassword({ email: user, captcha: value })),
    // );
  }


  return (
    <div className='sign forgot-password'>
      <div className='sign-content'>
        <RcQueueAnim
          className={clsx(
            'w-100',
            ['d-flex', 'flex-column', 'h-100'],
          )}>
          <div className='forgot-reset-form'>
            <div className='form-padding-start'></div>
            <Form
              className='confirm-form'
              name='basic'
              layout='vertical'
              initialValues={{}}
              onFinish={onFinish}
              form={form}
              onFinishFailed={onFinishFailed}>
              <Form.Item
                name='newPassword'
                label={frl('auth.newPassword')}
                className='form-field'
                rules={[
                  { required: true, message: frm('auth.newPassword') },
                  {
                    min: 6,
                    message: formatMessage({ id: 'auth.passwordMinLength' }, { count: 6 }),
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
                  ({ getFieldValue }) => ({
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
              <div className='form-btn-field pt-2 w-100'>
                <Button block type='primary' htmlType='submit' className='sign-btn'>
                  <IntlMessages id='common.resetPassword' />
                </Button>
                {/* <Button block onClick={() => navigate()} className='sign-btn mt-1'>
                  <IntlMessages id='common.goBack' />
                </Button> */}
              </div>
            </Form>
            <div className='form-padding-end'></div>
          </div>
        </RcQueueAnim>
      </div>
    </div>
  );
};

export default ForgotPasswordInputNewPassword;
