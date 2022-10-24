
import {Button, Form, Statistic, Typography} from 'antd';
import {
  useDispatch, 
  useSelector,
} from 'react-redux';
import {
  onConfirmLoginOTP,
  onChangeAddressOTP,
  onChangePhoneStatus,
} from 'redux/actions/Auth';
import {useNavigate} from 'react-router-dom';
import { SIGN_UP_GOOGLE_CONFIRM_PHONE_ROUTE, 
} from '../declareRoute';
import {FormattedMessage} from 'react-intl';
import {useState} from 'react';
import IntlMessages from '@crema/utility/IntlMessages';
import {useFormItemOTP} from 'components/FormItemOTP/useFormItemOTP';
import AppSpace from '@crema/core/AppSpace';

const ConfirmOTP = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const otpCount = 6;
  const {generateInput} = useFormItemOTP(otpCount, form);
  const {phoneNumber} = useSelector(({auth}) => auth);
  const [showCountdown, setShowCountdown] = useState(false);

  const onFinish = (data) => {
    const otp = Object.values(data).join('');
    dispatch(onConfirmLoginOTP(phoneNumber, otp));
  };

  const onChangePhone = () => {
    dispatch(onChangePhoneStatus());
    dispatch(onChangeAddressOTP());
    navigate(SIGN_UP_GOOGLE_CONFIRM_PHONE_ROUTE);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onCountdownFinish = () => {
    setShowCountdown(false);
  };

  const onResendOTP = () => {};

  return (
    <div className='sign'>
      <div className='sign-content'>
        <div className='para'>
          <p className='description'>
            <FormattedMessage id='auth.otpConfirm' values={{phoneNumber:phoneNumber}}/>
            <br />
            <Typography.Link underline onClick={() =>  onChangePhone()}>
              <IntlMessages id='common.changePhone' />
            </Typography.Link>
          </p>
        </div>

        <Form
          className='confirm-form'
          name='basic'
          layout='inline'
          initialValues={{
            phoneNumber:phoneNumber
          }}
          onFinish={onFinish}
          form={form}
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
                  value={Date.now()}
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
              <IntlMessages id='common.login' />
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ConfirmOTP;
