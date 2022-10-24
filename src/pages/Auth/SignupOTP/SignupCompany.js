import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Form, Tooltip, Input, Checkbox} from 'antd';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useFormMessage from 'hooks/useFormMessage';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {
  SIGN_IN_EMAIL_ROUTE,
  SIGN_UP_OTP_CONFIRM_ROUTE,
  SIGN_UP_OTP_ROUTE,
} from '../declareRoute';
import {
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
import AppSpace from '@crema/core/AppSpace';
import {TYPE_CONFIRM_OTP} from 'shared/constants/ActionTypes';

const SignupCompany = () => {
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
    if (state?.phoneNumber) {
      form.setFieldsValue({
        phoneNumber: state.phoneNumber,
      });
      navigate(pathname, {});
    }
  }, [state]);

  const {makeRequest, captchaRef} = AuthCaptchaHandle();
  const onFinish = () => 
  {
    const type = 2;
    dispatch({type: TYPE_CONFIRM_OTP, payload: {type}});
    makeRequest().then(() => dispatch(onSignupWithOTP(form.getFieldsValue())));
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
          initialValues={{}}
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
            rules={[{required: true, message: frm('common.password')}]}>
            <Input.Password maxLength={30} />
          </Form.Item>
          <Form.Item
            name='referenceCode'
            className='form-field'
            label={<IntlMessages id='common.referenceCode' />}>
            <AppInput maxLength={255}/>
          </Form.Item>

          <Form.Item
            name='companyName'
            className='form-field'
            label={frl('common.companyName')}
            rules={[
              {required: true, message: frm('common.companyName')},
            ]}>
            <AppInput maxLength={255} autoFocus />
          </Form.Item>

          <Form.Item
            name='shortName'
            className='form-field'
            label={<IntlMessages id='common.shortName' />}>
            <AppInput maxLength={255}/>
          </Form.Item>

          <Form.Item
            name='email'
            className='form-field'
            label={frl('common.email')}
            rules={[{ required: true, message: frm('common.email') }]}>
            <AppInput maxLength={255} />
          </Form.Item>

          <Form.Item
            name='tax'
            className='form-field'
            label={frl('common.tax')}
            rules={[
              {required: true, message: frm('common.tax')},
            ]}>
            <AppInput maxLength={255} autoFocus />
          </Form.Item>

          <Form.Item
            name='address'
            className='form-field'
            label={frl('common.address')}
            rules={[
              {required: true, message: frm('common.address')},
            ]}>
            <AppInput maxLength={255} autoFocus />
          </Form.Item>

          <Form.Item
            style={{display:"flex"}}
            name='captcha'
            className='form-field'
            label={<IntlMessages id='common.captcha' />}>
            <AppInput style={{width:"70%"}} maxLength={255}/>
            <AppInput style={{width:"30%"}}maxLength={255}/>
          </Form.Item>

          <div className='rememberMe'>
            <AppSpace className='w-100' style={{justifyContent: "left"}}>
              <Checkbox className='sign-rules' onChange={()=>{}}>
                <IntlMessages id='common.commit' />
                <IntlMessages id='common.rules' />
              </Checkbox> 
            </AppSpace>
          </div>
          
          <Form.Item className='d-none' name='captcha'>
            <Recaptcha ref={captchaRef} />
          </Form.Item>
          <div className='form-btn-field mt-1'>
            <Button type='primary' htmlType='submit' className='sign-btn'>
              <IntlMessages id='common.signupWithOTP' />
            </Button>
          </div>

          <div className='rememberMe'>
            <AppSpace className='w-100' style={{justifyContent: "center"}}>
              <span className='sign-link-create' onClick={() => {
                navigate(SIGN_UP_OTP_ROUTE);
              }}>
                <IntlMessages id='common.accountUser' />
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

export default SignupCompany;
