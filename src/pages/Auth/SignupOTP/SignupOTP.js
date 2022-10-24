import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Form, Tooltip, Input} from 'antd';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useFormMessage from 'hooks/useFormMessage';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {
  SIGN_IN_EMAIL_ROUTE,
  SIGN_UP_OTP_CONFIRM_ROUTE,
  SIGN_UP_COMPANY_ROUTE,
} from '../declareRoute';
import {
  onCheckCaptcha,
  onGetCaptcha,
  onLoginWithFacebook,
  onLoginWithGoogle,
  onSignupWithOTP,
} from 'redux/actions/Auth';
import {signinOTP} from 'shared/constants/AppConst';
import {useIntl} from 'react-intl';
import {FETCH_ERROR} from 'shared/constants/ActionTypes';
import {useFacebookOAuth, useGoogleOAuth} from 'hooks/useOAuthLogin';
import Recaptcha from 'components/Recaptcha/Recaptcha';
import {AuthCaptchaHandle} from '../AuthCaptchaHandle';
import AppInput from '@crema/core/AppInput';
import Validators from 'shared/validators';
//import SdtIco from '@assets/auth/sdt-sm.png';
import GoogleIco from '@assets/auth/google-sm.png';
import FacebookIco from '@assets/auth/fb-sm.png';
import PassIco from '@assets/auth/pass-sm.png';
import Reload from '@assets/icon/reload.svg'
import AppSpace from '@crema/core/AppSpace';
import {TYPE_CONFIRM_OTP} from 'shared/constants/ActionTypes';
import Parser from 'html-react-parser';
const SignupOTP = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const {formatRequiredMessageId: frm, formatRequiredLabelId: frl} =
    useFormMessage();
  const dispatch = useDispatch();
  const {waitOTPConfirm, phoneNumber, captchaImage, captchaId, tokenCaptcha} = useSelector(({auth}) => auth);
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

  const reloadCaptcha = (e) => {
    e.preventDefault();
    dispatch(onGetCaptcha());
  }

  useEffect(() => {
    dispatch(onGetCaptcha());
  }, []);

  useEffect(() => {
    if (waitOTPConfirm) navigate(SIGN_UP_OTP_CONFIRM_ROUTE);
  }, [waitOTPConfirm]);

  useEffect(() => {
    if (state?.phoneNumber) {
      form.setFieldsValue({
        phoneNumber: state.phoneNumber,
      });
      navigate(pathname, {});
    }
  }, [state]);
  const onFinish = () => 
  {
    const {captcha} = form.getFieldsValue();
    const captchaValue = captcha;
    dispatch(onCheckCaptcha({captchaId,captchaValue}));
    if(tokenCaptcha != null) {
      const typeSignup = 1;
      let data = form.getFieldsValue();
      data = { ...data, captcha:tokenCaptcha};
      dispatch({type: TYPE_CONFIRM_OTP, payload: {typeSignup}});
      dispatch(onSignupWithOTP(form.getFieldsValue()));
    }   
    dispatch(onGetCaptcha());
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  

  return (
    <div className='sign'>
      <div className='sign-content'>
        {/* <div className='para'>
          <p className='description'>
            <IntlMessages id='auth.signUpMessage1' />
          </p>
        </div> */}

        <Form
          form={form}
          className='sign-form'
          name='basic'
          layout='vertical'
          initialValues={{
            phoneNumber: phoneNumber,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <div className='form-padding-start'></div>
          <Form.Item
            name='phoneNumber'
            className='form-field'
            label={frl('common.phoneNumber')}
            rules={[
              {required: true, message: frm('common.phoneNumber')},
              {
                validator: (_, v) => Validators.PhoneNumber(v),
                message: messages['validator.phoneNumber'],
              },
            ]}>
            <AppInput maxLength={255} autoFocus />
          </Form.Item>
          <Form.Item
            name='password'
            className='form-field'
            label={frl('common.password')}
            rules={[{required: true, message: frm('common.password')},{
              validator: (_, v) => Validators.Password(v),
              message: messages['validator.passWord'],
            },]}>
            <Input.Password maxLength={30} />
          </Form.Item>
          <Form.Item
            name='referenceCode'
            className='form-field'
            label={<IntlMessages id='common.referenceCode' />}>
            <AppInput maxLength={255}/>
          </Form.Item>
          <Form.Item
            name='captcha'
            className='form-field'
            label={<IntlMessages id='common.captcha' />}>
            <div className='form-captcha'>
              <div className='form-captcha-input'>
                <AppInput  maxLength={255}/>
              </div>
              <div className='form-captcha-image'>{Parser(captchaImage)}</div>
              <button className='form-captcha-button' onClick={reloadCaptcha}><img src={Reload}/></button>
            </div>
          </Form.Item>
          <div className='form-btn-field mt-1'>
            <Button type='primary' htmlType='submit' className='sign-btn'>
              <IntlMessages id='common.signupWithOTP' />
            </Button>
          </div>

          <div className='rememberMe'>
            <AppSpace className='w-100' style={{justifyContent:"center"}}>
              <span className='sign-link-create' onClick={() => {
                navigate(SIGN_UP_COMPANY_ROUTE);
              }}>
                <IntlMessages id='common.accountCompany' />
              </span>
            </AppSpace>
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
                navigate(signinOTP, {
                  state: {phoneNumber: form.getFieldValue('phoneNumber')},
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
