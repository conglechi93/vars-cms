// Resdii custom

import React from 'react';
import clsx from 'clsx';
import {Avatar, Dropdown, Menu} from 'antd';
import './index.style.less';
import {useThemeContext} from '../../../../utility/AppContextProvider/ThemeContextProvider';
import {useSidebarContext} from '../../../../utility/AppContextProvider/SidebarContextProvider';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {onLogout} from '@redux/actions/Auth';
import IntlMessages from '@crema/utility/IntlMessages';
import emptyAvatar from '@assets/profile/empty-avatar.jpg';
import {BsChevronDown} from '@react-icons/all-files/bs/BsChevronDown';
import {
  CHANGE_PASSWORD_ROUTE, 
  USER_PROFILE_ROUTE,
  USER_CHANGE_EMAIL_ROUTE
} from '../../../../../pages/ProfileManagement/declareRoute'
import { useNavigate } from 'react-router-dom';
import { onGetUserInfo } from 'redux/actions/Auth';
import { RESET_PASSWORD_ROUTE } from 'pages/Auth/declareRoute';

const UserInfo = ({hasColor}) => {
  const navigate = useNavigate();
  const {themeMode} = useThemeContext();
  const {profile} = useSelector(({auth}) => auth);
  const userInfo = profile?.userInfo || {};
  const dispatch = useDispatch();
  const logout = () => dispatch(onLogout());

  // const navigate = useNavigate();
  const {sidebarColorSet} = useSidebarContext();
  const {isSidebarBgImage} = useSidebarContext();


  const getUserAvatar = () => {
    return userInfo.avatar ?? emptyAvatar;
  };


  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a
              onClick={() => {
                console.log("USER_PROFILE_ROUTE");
                navigate(USER_PROFILE_ROUTE);
                window.location.reload(true);
                dispatch(onGetUserInfo());
              }
              }
              target='_blank'
              rel='noopener noreferrer'>
              <IntlMessages id='profile.information' />
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a
              onClick={() => {
                navigate(CHANGE_PASSWORD_ROUTE);
                window.location.reload(true);
              }}
              target='_blank'
              rel='noopener noreferrer'>
              <IntlMessages id='profile.changePassword' />
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a
              onClick={() => {
                navigate(USER_CHANGE_EMAIL_ROUTE);
                window.location.reload(true);
              }
              }
              target='_blank'
              rel='noopener noreferrer'>
              <IntlMessages id='common.changeEmail' />
            </a>
          ),
        },
        {
          key: '4',
          label: (
            <a
              onClick={() => logout()}
              target='_blank'
              rel='noopener noreferrer'>
              <IntlMessages id='common.logout' />
            </a>
          ),
        },
      ]}
    />
  );

  return (
    <>
      {hasColor ? (
        <div
          style={{
            backgroundColor: isSidebarBgImage
              ? ''
              : sidebarColorSet.sidebarHeaderColor,
            color: sidebarColorSet.sidebarTextColor,
          }}
          className={clsx('cr-user-info cr-user-info-hasColor', {
            light: themeMode === 'light',
          })}>
          <Dropdown
            className='user-profile-dropdown'
            overlay={menu}
            trigger={['click']}
            placement='bottomRight'
            overlayStyle={{
              zIndex: 1052,
              minWidth: 150,
            }}>
            <a className='cr-user-info-inner ant-dropdown-link'>
              <Avatar
                className='cr-user-info-avatar'
                src={getUserAvatar()}
                alt='avatar'
              />
              <span className='cr-user-info-content'>
                <span className='cr-user-name-info'>
                  <h3
                    className={clsx('cr-user-name text-truncate', {
                      light: themeMode === 'light',
                    })}>
                    {userInfo.email}
                  </h3>
                  <span className='cr-user-arrow'>
                    <BsChevronDown />
                  </span>
                </span>
                {/* <span className='cr-user-designation text-truncate'>
                  System Manager
                </span> */}
              </span>
            </a>
          </Dropdown>
        </div>
      ) : (
        <div
          className={clsx('cr-user-info', {
            light: themeMode === 'light',
          })}>
          <Dropdown
            className='user-profile-dropdown'
            overlay={menu}
            trigger={['click']}
            placement='bottomRight'
            overlayStyle={{
              zIndex: 1052,
              minWidth: 150,
            }}>
            <a className='cr-user-info-inner ant-dropdown-link'>
              <Avatar className='cr-user-info-avatar' src={getUserAvatar()} />
              <span className='cr-user-info-content'>
                <span className='cr-user-name-info'>
                  <h3
                    className={clsx('cr-user-name text-truncate', {
                      light: themeMode === 'light',
                    })}>
                    {userInfo.email}
                  </h3>
                  <span className='cr-user-arrow'>
                    <BsChevronDown />
                  </span>
                </span>
                {/* <span className='cr-user-designation text-truncate'>
                  System Manager
                </span> */}
              </span>
            </a>
          </Dropdown>
        </div>
      )}
    </>
  );
};

export default UserInfo;

UserInfo.propTypes = {
  hasColor: PropTypes.bool,
};
