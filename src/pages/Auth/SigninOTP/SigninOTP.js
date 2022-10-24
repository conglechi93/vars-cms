import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Form, Tooltip, Input, Checkbox} from 'antd';
import IntlMessages from '@crema/utility/IntlMessages';
import useFormMessage from 'hooks/useFormMessage';
import {useDispatch, useSelector} from 'react-redux';
import {onLoginWithOTP} from '@redux/actions/Auth';
import {useEffect} from 'react';
import {
  SIGN_IN_EMAIL_ROUTE,
  SIGN_IN_OTP_CONFIRM_ROUTE,
  SIGN_UP_OTP_ROUTE,
  SIGN_UP_GOOGLE_CONFIRM_PHONE_ROUTE,
  FORGET_PASSWORD_ROUTE,
} from '../declareRoute';
import {useFacebookOAuth, useGoogleOAuth} from 'hooks/useOAuthLogin';
import GoogleIco from '@assets/auth/google-sm.png';
import FacebookIco from '@assets/auth/fb-sm.png';
import PassIco from '@assets/auth/pass-sm.png';
import {onLoginWithFacebook, onLoginWithGoogle} from 'redux/actions/Auth';
import {FETCH_ERROR} from 'shared/constants/ActionTypes';
import {useIntl} from 'react-intl';
import Recaptcha from 'components/Recaptcha/Recaptcha';
import {AuthCaptchaHandle} from '../AuthCaptchaHandle';
import AppInput from '@crema/core/AppInput';
import AppSpace from '@crema/core/AppSpace';
//import SdtIco from '@assets/auth/sdt-sm.png';

const SigninOTP = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const {formatRequiredMessageId: frm, formatRequiredLabelId: frl} =
    useFormMessage();
  const dispatch = useDispatch();
  const {messages} = useIntl();
  const {signInGoogle} = useGoogleOAuth({
    onSuccess: ({code}) => dispatch(onLoginWithGoogle(code)),
    onError: () =>
      dispatch({
        type: FETCH_ERROR,
        payload: messages['error.message.somethingWentWrong'],
      }),
  });
  const {signInFacebook} = useFacebookOAuth({
    onSuccess: ({userID, accessToken}) =>
      dispatch(onLoginWithFacebook(userID, accessToken)),
    onError: (response) => console.log(response),
  });
  const {waitOTPConfirm} = useSelector(({auth}) => auth);
  const {state, pathname} = useLocation();

  const {isLoginWithOAuth} = useSelector(({auth}) => auth);
  useEffect(() => {
    if (isLoginWithOAuth) navigate(SIGN_UP_GOOGLE_CONFIRM_PHONE_ROUTE);
  }, [isLoginWithOAuth]);

  useEffect(() => {
    if (waitOTPConfirm) navigate(SIGN_IN_OTP_CONFIRM_ROUTE);
  }, [waitOTPConfirm]);

  const {makeRequest, captchaRef} = AuthCaptchaHandle();
  const onFinish = () => {
    console.log(form.getFieldsValue());
    makeRequest().then(() => dispatch(onLoginWithOTP(form.getFieldsValue())));
  }
    

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (state?.phoneNumber) {
      form.setFieldsValue({
        phoneNumber: state.phoneNumber,
      });
      navigate(pathname, {});
    }
  }, [state]);

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
          {/* <div className='para'>
            <p className='description'><IntlMessages id='auth.loginMessage1' /></p>
          </div> */}
          <Form.Item
            name='phoneNumber'
            className='form-field'
            label={frl('common.phoneNumber')}
            rules={[{required: true, message: frm('common.phoneNumber')}]}>
            <AppInput maxLength={255} autoFocus />
          </Form.Item>
          <Form.Item
            name='password'
            className='form-field'
            label={frl('common.password')}
            rules={[{required: true, message: frm('common.password')}]}>
            <Input.Password maxLength={30} />
          </Form.Item>
          <Form.Item className='d-none' name='captcha'>
            <Recaptcha ref={captchaRef} />
          </Form.Item>
          
          <div className='form-btn-field mt-1'>
            <Button type='primary' htmlType='submit' className='sign-btn'>
              <IntlMessages id='common.login' />
            </Button>
          </div>

          <div className='rememberMe'>
            <AppSpace className='w-100 justify-flex-end'>
              {/* <Checkbox className='sign-checkbox' onChange={()=>{}}>
                <IntlMessages id='common.rememberMe' />
              </Checkbox>  */}
              <span className='sign-link-create' onClick={()=>{navigate(FORGET_PASSWORD_ROUTE)}}>
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
              {/* <Tooltip title='Pasword' align=''>
                <Button
                  aria-label='email-login'
                  className='sign-icon-btn'
                  onClick={() =>
                    navigate(SIGN_IN_EMAIL_ROUTE, {
                      state: {
                        phoneNumber: form.getFieldValue('phoneNumber'),
                      },
                    })
                  }>
                  <img src={PassIco} alt='pass-login' />
                </Button>
                <span className="sign-mult-text">
                  <IntlMessages id='common.pass' />
                </span>
              </Tooltip> */}
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
                  onClick={() => signInFacebook()}>
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
                  state: {email: form.getFieldValue('email')},
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

export default SigninOTP;
