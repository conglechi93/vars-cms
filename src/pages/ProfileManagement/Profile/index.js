import {memo, 
  useEffect, 
  useState
} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import '../index.style.less';
import {Button, Form, Select, DatePicker } from 'antd';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useFormMessage from 'hooks/useFormMessage';
import AppInput from '@crema/core/AppInput';
import AppPageMetadata from '@crema/core/AppPageMetadata';
import {useIntl} from 'react-intl';
import { onUpdateProfile } from 'redux/actions/Profile';
import Avatar from '@assets/avatar_anh_Binh.png';
import BackGround from '@assets/logo-brg-avatar.svg';
import UnconfirmedIcon from '@assets/icon/unconfirmed.svg';
import API from 'api/Request';
import { REQUEST_MUTED } from '@api/RequestEnum';
import {
  GET_GENDER_CATEGORY,
  GET_JOB_TYPE_CATEGORY
} from 'shared/constants/ApiUrls';
//import { onGetUserInfo } from 'redux/actions/Profile';


const Profile = () => {

  const {messages} = useIntl();
  const { Option } = Select;
  const [form] = Form.useForm();

  const {formatRequiredMessageId: frm, formatRequiredLabelId: frl} = useFormMessage();

  const dispatch = useDispatch();

  
  const {profile} = useSelector(({auth}) => auth);
  const [phoneNumber] = useState(profile.username);
  const [fullName] = useState("");
  const [email] = useState(profile.email);
  
  const onFinish = () => {
    console.log(form.getFieldValue())
    const {phoneNumber,address,email,fullName,object,sex,tax} = form.getFieldValue();
    // dispatch(onUpdateProfile(phoneNumber,address,email,fullName,object,sex,tax));
    dispatch(onUpdateProfile(form.getFieldValue()));
  }

  const emailStyle = {
    backgroundImage: `url(${UnconfirmedIcon})`,
    display: "inline-block",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px center",  
    verticalAlign: "middle",
  }

  const [listGender,setListGender] = useState();
  const [listJobType,setListJobType] = useState();
  useEffect(() => {
    API.get(GET_GENDER_CATEGORY, {REQUEST_MUTED})
    .then(({data}) => { 
      const list = data.map((v) => <Option key={v.code} value={v.code}>{v.name}</Option>);
      setListGender(list);
    })
    .catch((err) => {
      console.log("err",err);
    });

    API.get(GET_JOB_TYPE_CATEGORY, {REQUEST_MUTED})
    .then(({data}) => { 
      const list = data.map((v) => <Option key={v.code} value={v.code}>{v.name}</Option>);
      setListJobType(list);
    })
    .catch((err) => {
      console.log("err",err);
    });
  }, []);
  

  return (
    <div style={{marginBottom:"30px"}}>
      <AppPageMetadata title={messages['route.group.profileManagement']} />
      <img className='background-img' alt='background' src={BackGround} />
      <div className='profile'>
        <div className='profile-avatar'>
          <img className='avatar-img' alt='avatar' src={Avatar} />
        </div>
        <div className='profile-text' >
          <div>
            <label htmlFor="filePicker" className='upload-btn'>
              Tải ảnh lên
            </label>
            <input id="filePicker" style={{display:"none"}} type="file"/>
          </div>

          <div className='profile-text-note'>Chỉ tải ảnh JPG, GIF hoặc PNG với dung lượng tối đa 10MB </div>
        </div>
      </div>
      <div className='profile-form'>
        <div className='profile-text-label'>Thông tin cá nhân </div>
        <Form
          form={form}
          className='sign-form'
          name='basic'
          layout='vertical'
          initialValues={{
            //remember: true,
            fullName: fullName,
            phoneNumber: phoneNumber,
            email: email,
          }}
          onFinish={onFinish}
          onFinishFailed={() => {}}>
          <div className='form-padding-start'></div>
          <Form.Item
            name='fullName'
            className='form-field'
            label={frl('common.fullName')}
            rules={[{required: true, message: frm('common.fullName')}]}>
            <AppInput maxLength={255} autoFocus />
          </Form.Item>

          <Form.Item
            name='jobType'
            className='form-field'
            label={frl('common.object')}
            rules={[{required: true, message: frm('common.object')}]}>
            <Select placeholder="Đối tượng"> 
                {listJobType}
            </Select>
          </Form.Item>

          <Form.Item
            name='phoneNumber'
            className='form-field'
            label={frl('common.phoneNumber')}
            rules={[{required: true, message: frm('common.phoneNumber')}]}>
            <AppInput maxLength={255} disabled={true}/>
          </Form.Item>

          {/* <Form.Item
            name='birthDay'
            className='form-field'
            label={frl('common.birthDay')}
            rules={[{required: true, message: frm('common.birthDay')}]}>
            <DatePicker placeholder=""/>
          </Form.Item> */}

          <Form.Item
            name='email'
            className='form-field'
            label={frl('common.email')}
            rules={[{required: true, message: frm('common.email')}]}>
            <div style={{position:"relative"}}>
              {/* <img src={UnconfirmedIcon}/> */}
              <div></div>
              <AppInput maxLength={255} title="abc" className="input-email"/>
            </div>
          </Form.Item>

          <Form.Item
            name='address'
            className='form-field'
            label={frl('common.address')}
            rules={[{required: true, message: frm('common.address')}]}>
            <AppInput maxLength={255} />
          </Form.Item>

          <Form.Item
            name='tax'
            className='form-field'
            label={frl('common.tax')}
            rules={[{required: true, message: frm('common.tax')}]}>
            <AppInput maxLength={255} />  
          </Form.Item>

          <Form.Item
            name='sex'
            className='form-field'
            label={frl('common.sex')}
            rules={[{required: true, message: frm('common.sex')}]}>
            <Select placeholder="Giới tính">
              {listGender}
            </Select>
          </Form.Item>

          {/* <Form.Item
            name='introduction'
            className='form-field'
            label={frl('common.sex')}
            rules={[{required: true, message: frm('common.sex')}]}>
            <Select>
              <Option value="Option 1">Option 1</Option>
              <Option value="Option 2">Option 2</Option>
          </Select>
          </Form.Item> */}


          {/* <Form.Item
            name='street'
            className='form-field'
            label={frl('common.street')}
            rules={[{required: true, message: frm('common.street')}]}>
            <AppInput maxLength={255} />
          </Form.Item> */}

          
          <div className='form-btn'>
            <div className='form-btn-field'>
              <Button type='primary' className='cancle-btn'>
                <IntlMessages id='common.cancel' />
              </Button>
            </div>
            <div className='form-btn-field'>
              <Button type='primary' htmlType='submit' className='sign-btn'>
                <IntlMessages id='common.save' />
              </Button>
            </div>

          </div>

          
        </Form>
      </div>
      
    </div>
  );
};

export default memo(Profile);

Profile.propTypes = {};

Profile.defaultProps = {};
