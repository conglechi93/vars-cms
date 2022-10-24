import React, {
  useEffect, 
  //useState
} from 'react';
import PropTypes from 'prop-types';
import {Card, Typography} from 'antd';
import AppAnimateGroup from '../../@crema/core/AppAnimateGroup';
import './AuthWrapper.style.less';
import {AppInfoView} from '../../@crema';
import AppLogo from '@assets/logo-with-name-v2.svg';
import AppCarousel from '@crema/core/AppCarousel';
import TitleLogo from '@assets/logo-tittle.svg';
import HomeLogo from '@assets/logo-home.svg';
// import {ReactComponent as Auth1} from '@assets/auth/auth-slide-1.svg';
// import {ReactComponent as Auth2} from '@assets/auth/auth-slide-2.svg';
// import {ReactComponent as Auth3} from '@assets/auth/auth-slide-3.svg';
import IntlMessages from '@crema/utility/IntlMessages';
const AuthWrapper = ({children, action}) => {
  //const [Access,setTypeAccess] = useState(1);
  // if (children[0].props.title == "Đăng ký") {
  //   setTypeAccess("common.signup");
  // }
  // else 
  // {
  //   setTypeAccess("common.login");
  // }  
  //setTypeAccess(2);
  //console.log(Access);
  useEffect(() => {
    document.body.classList.add('auth');
    return () => document.body.classList.remove('auth');
  }, []);

  return (
    <AppAnimateGroup
      type='alpha'
      className='w-100 align-center'
      animateStyle={{flex: 1}}
      delay={0}
      interval={10}
      duration={500}>
      <div className='auth-title'>

        <img className='title-logo' alt='title-logo' src={TitleLogo} />
        <img className='home-logo' alt='home-logo' src={HomeLogo} />
      </div>
      <div className='auth-wrap' key={'wrap'}>
        <Card className='auth-card'>
          <div className='auth-slider'>
            {/* <img alt='app-logo' width='100%' src={TitleLogo} /> */}
            <AppCarousel autoplay swipeToSlide draggable>
              <div className='auth-slider-item'>
                {/* <Auth1 /> */}
                <Typography.Title level={5} className='title'>
                  <IntlMessages id='auth.welcome1' />
                </Typography.Title>
                <Typography.Text className='subtitle'>
                  <IntlMessages id='auth.welcome2' />
                </Typography.Text>
              </div>
              <div className='auth-slider-item'>
                {/* <Auth2 /> */}
                <Typography.Title level={5} className='title'>
                  <IntlMessages id='auth.welcome3' />
                </Typography.Title>
                <Typography.Text className='subtitle'>
                  <IntlMessages id='auth.welcome4' />
                </Typography.Text>
              </div>
              <div className='auth-slider-item'>
                {/* <Auth3 /> */}
                <Typography.Title level={5} className='title'>
                  <IntlMessages id='auth.welcome5' />
                </Typography.Title>
                <Typography.Text className='subtitle'>
                  <IntlMessages id='auth.welcome6' />
                </Typography.Text>
              </div>
            </AppCarousel>
            {/* <div className='floating-item-1'></div>
            <div className='floating-item-2'></div> */}
          </div>
          <div className='auth-main-content'>
            <div className='auth-card-header'>
              <img alt='app-logo' height='100px' width='100%' src={AppLogo} />
              <span className='sign-title'>
              {action == "login" ? <IntlMessages id='common.login' /> : <IntlMessages id='common.signup' />}
             
              </span>
            </div>
            <div className='auth-card-body'>
              {children}
              {/* <div className='floating-item-3'></div> */}
            </div>
          </div>
        </Card>
      </div>
      <AppInfoView />
      {/* <div className='floating-item-4'></div>
      <div className='floating-item-5'></div> */}
    </AppAnimateGroup>
  );
};

export default AuthWrapper;

AuthWrapper.propTypes = {
  children: PropTypes.node,
  action: PropTypes.string
};
