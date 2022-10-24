import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Tooltip, Checkbox } from 'antd';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useFormMessage from 'hooks/useFormMessage';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { onLoginWithEmail } from '@redux/actions/Auth';
import {
  //FORGET_PASSWORD_ROUTE,
  //SIGN_UP_GOOGLE_CONFIRM_OTP_ROUTE,
  SIGN_UP_GOOGLE_CONFIRM_PHONE_ROUTE,
  SIGN_IN_OTP_ROUTE,
  SIGN_UP_OTP_ROUTE,
  RESET_PASSWORD_ROUTE,
  FORGET_PASSWORD_ROUTE,
} from '../declareRoute';
import '../index.style.less';
import { useEffect } from 'react';
import { useFacebookOAuth, useGoogleOAuth } from 'hooks/useOAuthLogin';
import AppSpace from '@crema/core/AppSpace';
import SdtIco from '@assets/auth/sdt-sm.png';
import GoogleIco from '@assets/auth/google-sm.png';
import GmailIco from '@assets/auth/gmail-sm.png';
import FacebookIco from '@assets/auth/fb-sm.png';
import OTPIco from '@assets/auth/otp-sm.png';
import { useIntl } from 'react-intl';
import {
  onLoginWithFacebook,
  onLoginWithGoogle
} from 'redux/actions/Auth';
import { FETCH_ERROR } from 'shared/constants/ActionTypes';
import Recaptcha from 'components/Recaptcha/Recaptcha';
import { AuthCaptchaHandle } from '../AuthCaptchaHandle';
import AppInput from '@crema/core/AppInput';

const SigninDefault = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { isLoginWithOAuth } = useSelector(({ auth }) => auth);
  useEffect(() => {
    if (isLoginWithOAuth) navigate(SIGN_UP_GOOGLE_CONFIRM_PHONE_ROUTE);
  }, [isLoginWithOAuth]);
  const { formatRequiredMessageId: frm, formatRequiredLabelId: frl } =
    useFormMessage();
  const dispatch = useDispatch();
  const { messages } = useIntl();
  const { signInGoogle } = useGoogleOAuth({
    onSuccess: ({ code }) => dispatch(onLoginWithGoogle(code)),
    onError: () =>
      dispatch({
        type: FETCH_ERROR,
        payload: messages['error.message.somethingWentWrong'],
      }),
  });
  const { signInFacebook } = useFacebookOAuth({
    onSuccess: ({ userID, accessToken }) => {
      dispatch(onLoginWithFacebook(userID, accessToken))
    },
    onError: (response) => console.log(response),
  });
  const { state, pathname } = useLocation();

  const { makeRequest, captchaRef } = AuthCaptchaHandle();
  const onFinish = () => {
    makeRequest().then(() => dispatch(onLoginWithEmail(form.getFieldsValue())));
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onGoToForgetPassword = () => {
    navigate(FORGET_PASSWORD_ROUTE);
  };

  useEffect(() => {
    if (state?.email) {
      form.setFieldsValue({
        email: state.email,
      });
      navigate(pathname, {});
    }
  }, [state]);

  return (
    <div className='sign'>
      <div className='sign-content'>
        <div className='para'>
          <p className='description'><IntlMessages id='auth.loginMessage1' /></p>
        </div>
        <Form
          form={form}
          className='sign-  form'
          name='basic'
          layout='vertical'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <div className='form-padding-start'></div>
          <Form.Item
            name='email'
            className='form-field'
            label={frl('common.account')}
            rules={[{ required: true, message: frm('common.account') }]}>
            <AppInput maxLength={255} autoFocus />
          </Form.Item>

          <Form.Item
            name='password'
            className='form-field'
            label={frl('common.password')}
            rules={[{ required: true, message: frm('common.password') }]}>
            <Input.Password maxLength={30} />
          </Form.Item>

          <Form.Item className='d-none' name='captcha'>
            <Recaptcha ref={captchaRef} />
          </Form.Item>

          <div className='form-btn-field'>
            <Button type='primary' htmlType='submit' className='sign-btn'>
              <IntlMessages id='common.login' />
            </Button>
          </div>

          <div className='rememberMe'>
            <AppSpace className='w-100 justify-flex-end' align='end'>
              {/* <Checkbox className='sign-checkbox' onChange={()=>{}}>
                <IntlMessages id='common.rememberMe' />
              </Checkbox>  */}
              <span className='sign-link-create' onClick={()=>{onGoToForgetPassword()}}>
                <IntlMessages id='common.forgetPassword' />
              </span>
            </AppSpace>
          </div>

          <div className='form-field-action sign-with'>
            <span className='sign-with-text'>
              <span>
                <IntlMessages id='common.or' />
              </span>
            </span>
            <div className='sign-socialLink'>
              {/* <Tooltip title='OTP' align=''>
                <Button
                  aria-label='otp'
                  className='sign-icon-btn'
                  onClick={() =>
                    navigate(SIGN_IN_OTP_ROUTE, {
                      state: {
                        email: form.getFieldValue('email'),
                      },
                    })
                  }>
                  <img src={GmailIco} alt='gmail-login' />
                </Button>
                <span className="sign-mult-text">
                  <IntlMessages id='common.email' />
                </span> 
              </Tooltip> */}
              <Tooltip title='Phone OTP'>
                <Button
                  aria-label='phoneNumber'
                  className='sign-icon-btn'
                  onClick={() =>
                    navigate(SIGN_IN_OTP_ROUTE, {
                      state: {
                        phoneNumber: form.getFieldValue('phoneNumber'),
                      },
                    })
                  }>
                  <img src={SdtIco} alt='phone-login' />
                </Button>
                <span className="sign-mult-text">
                  <IntlMessages id='common.phoneNumber' />
                </span>
              </Tooltip>
              <Tooltip title='Google'>
                <Button
                  aria-label='google'
                  className='sign-icon-btn'
                  onClick={() => signInGoogle()}>
                  <img src={GoogleIco} alt='google-login' />
                </Button>
                <span className="sign-mult-text">
                  <IntlMessages id='common.google' />
                </span>
              </Tooltip>
              <Tooltip title='Facebook'>
                <Button
                  aria-label='facebook'
                  className='sign-icon-btn'
                  onClick={() => { signInFacebook() }}>
                  <img src={FacebookIco} alt='facebook-login' />
                </Button>
                <span className="sign-mult-text">
                  <IntlMessages id='common.facebook' />
                </span>
              </Tooltip>
            </div>
          </div>
          <div className='form-padding-end'></div>
        </Form>
        <div className='sign-footer'>
          <div className='form-field-action'>
            <span className='sign-text'>
              <IntlMessages id='common.dontHaveAccount' />
            </span>
            <span
              className='sign-link-action'
              onClick={() =>
                navigate(SIGN_UP_OTP_ROUTE, {
                  state: { email: form.getFieldValue('email') },
                })
              }>
              <IntlMessages id='common.signup' />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninDefault;
