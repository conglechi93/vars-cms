import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Form } from 'antd';
import IntlMessages from '@crema/utility/IntlMessages';
import useFormMessage from 'hooks/useFormMessage';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {
  SIGN_UP_GOOGLE_CONFIRM_OTP_ROUTE,
  SIGN_UP_OTP_ROUTE,
} from '../declareRoute';
//import {useIntl} from 'react-intl';
import Recaptcha from 'components/Recaptcha/Recaptcha';
import {AuthCaptchaHandle} from '../AuthCaptchaHandle';
import AppInput from '@crema/core/AppInput';
import { onConfirmPhoneNumber } from 'redux/actions/Auth';
//import SdtIco from '@assets/auth/sdt-sm.png';

const ConfirmPhone = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const {formatRequiredMessageId: frm, formatRequiredLabelId: frl} =
    useFormMessage();
  const dispatch = useDispatch();
  const {waitPhoneConfirm} = useSelector(({auth}) => auth);
  const {state, pathname} = useLocation();

  useEffect(() => {
    if (waitPhoneConfirm) {
      navigate(SIGN_UP_GOOGLE_CONFIRM_OTP_ROUTE);
    }
  }, [waitPhoneConfirm]);

  const {makeRequest, captchaRef} = AuthCaptchaHandle();
  const onFinish = () => {
    console.log("form",form.getFieldsValue());
    makeRequest().then(() => dispatch(onConfirmPhoneNumber(form.getFieldsValue())));
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
          <Form.Item
            name='phoneNumber'
            className='form-field'
            label={frl('common.phoneNumber')}
            rules={[{required: true, message: frm('common.phoneNumber')}]}>
            <AppInput maxLength={255} autoFocus />
          </Form.Item>
          <Form.Item className='d-none' name='captcha'>
            <Recaptcha ref={captchaRef} />
          </Form.Item>
          <Form.Item
            style={{display:"flex"}}
            name='captcha'
            className='form-field'
            label={<IntlMessages id='common.captcha' />}>
            <AppInput style={{width:"70%"}} maxLength={255}/>
            <AppInput style={{width:"30%"}}maxLength={255}/>
          </Form.Item>
          
          <div className='form-btn-field mt-1'>
            <Button type='primary' htmlType='submit' className='sign-btn'>
              <IntlMessages id='common.continue' />
            </Button>
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

export default ConfirmPhone;
