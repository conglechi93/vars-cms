import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Form, Tooltip} from 'antd';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useFormMessage from 'hooks/useFormMessage';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {
  SIGN_IN_EMAIL_ROUTE,
  SIGN_UP_OTP_CONFIRM_ROUTE,
} from '../declareRoute';
import {
  onLoginWithFacebook,
  onLoginWithGoogle,
  onSignupWithOTP,
} from 'redux/actions/Auth';
import {defaultSignInUrl} from 'shared/constants/AppConst';
import {useIntl} from 'react-intl';
import {FETCH_ERROR} from 'shared/constants/ActionTypes';
import {useFacebookOAuth, useGoogleOAuth} from 'hooks/useOAuthLogin';
import Recaptcha from 'components/Recaptcha/Recaptcha';
import {AuthCaptchaHandle} from '../AuthCaptchaHandle';
import AppInput from '@crema/core/AppInput';
import Validators from 'shared/validators';
import SdtIco from '@assets/auth/sdt-sm.png';
import GoogleIco from '@assets/auth/google-sm.png';
import FacebookIco from '@assets/auth/fb-sm.png';
import PassIco from '@assets/auth/pass-sm.png';

const SignupOTP = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const {formatRequiredMessageId: frm, formatRequiredLabelId: frl} =
    useFormMessage();
  const dispatch = useDispatch();
  const {waitOTPConfirm} = useSelector(({auth}) => auth);
  const {messages} = useIntl();
  const {state, pathname} = useLocation();
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

  useEffect(() => {
    if (waitOTPConfirm) navigate(SIGN_UP_OTP_CONFIRM_ROUTE);
  }, [waitOTPConfirm]);

  useEffect(() => {
    if (state?.email) {
      form.setFieldsValue({
        email: state.email,
      });
      navigate(pathname, {});
    }
  }, [state]);

  const {makeRequest, captchaRef} = AuthCaptchaHandle();
  const onFinish = () =>
    makeRequest().then(() => dispatch(onSignupWithOTP(form.getFieldsValue())));

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='sign'>
      <div className='sign-content'>
        <div className='para'>
          <p className='description'>
            <IntlMessages id='auth.signUpMessage1' />
          </p>
        </div>

        <Form
          form={form}
          className='sign-form'
          name='basic'
          layout='vertical'
          initialValues={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <div className='form-padding-start'></div>
          <Form.Item
            name='email'
            className='form-field'
            label={frl('common.email')}
            rules={[
              {required: true, message: frm('common.email')},
              {
                validator: (_, v) => Validators.Email(v),
                message: messages['validator.email'],
              },
            ]}>
            <AppInput maxLength={255} autoFocus />
          </Form.Item>

          <Form.Item className='d-none' name='captcha'>
            <Recaptcha ref={captchaRef} />
          </Form.Item>
          <div className='form-btn-field mt-1'>
            <Button type='primary' htmlType='submit' className='sign-btn'>
              <IntlMessages id='common.signupWithOTP' />
            </Button>
          </div>

          <div className='form-field-action sign-with'>
            <span className='sign-with-text'>
              <span>
                <IntlMessages id='common.or' />
              </span>
            </span>
            <div className='sign-socialLink'>
            <Tooltip title='Pasword' align=''>
                <Button
                  aria-label='email-login'
                  className='sign-icon-btn'
                  onClick={() =>
                    navigate(SIGN_IN_EMAIL_ROUTE, {
                      state: {
                        email: form.getFieldValue('email'),
                      },
                    })
                  }>
                  <img src={PassIco} alt='pass-login' />
                </Button>
                <span className="sign-mult-text">
                  <IntlMessages id='common.pass' />
                </span>
              </Tooltip>
              <Tooltip title='Phone'>
                <Button
                  aria-label='phoneNumber'
                  className='sign-icon-btn'
                  onClick={() => signInFacebook()}>
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
              <IntlMessages id='common.alreadyHaveAccount' />
            </span>
            <span
              className='sign-link-action'
              onClick={() =>
                navigate(defaultSignInUrl, {
                  state: {email: form.getFieldValue('email')},
                })
              }>
              <IntlMessages id='common.login' />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupOTP;
