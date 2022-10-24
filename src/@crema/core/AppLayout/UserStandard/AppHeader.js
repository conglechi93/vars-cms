import {Dropdown, Layout, Menu} from 'antd';
import './index.style.less';
import AppLogo from '../components/AppLogo';
import AppLanguageSwitcher from '../../AppLanguageSwitcher';
import AppHeaderMessages from '../../AppHeaderMessages';
import AppNotifications from '../../AppNotifications';
import PropTypes from 'prop-types';
import {FiMoreVertical} from '@react-icons/all-files/fi/FiMoreVertical';
import {AiOutlineMenu} from '@react-icons/all-files/ai/AiOutlineMenu';
import UserInfo from '../components/UserInfo';
import clsx from 'clsx';
import AppPostNews from '@crema/core/AppPostNews';

const AppHeader = ({isCollapsed, onToggleSidebar, className}) => {
  const {Header} = Layout;
  const menuMobile = (
    <Menu>
      <AppHeaderMessages />
      <AppNotifications />
      <AppLanguageSwitcher />
    </Menu>
  );

  return (
    <Header
      className={clsx(
        'app-standard-header',
        {behind: !isCollapsed},
        className,
      )}>
      <AppLogo mini />
      <a
        className={clsx('trigger')}
        onClick={() => onToggleSidebar(!isCollapsed)}>
        <AiOutlineMenu />
      </a>
      <div className='app-standard-header-sectionDesktop'>
        <AppPostNews />
        <AppLanguageSwitcher />
        <AppNotifications />
        <AppHeaderMessages />
      </div>
      <div className='app-standard-header-section-mobile'>
        <Dropdown overlay={menuMobile} trigger={['click']}>
          <a className='ant-dropdown-link' onClick={(e) => e.preventDefault()}>
            <FiMoreVertical />
          </a>
        </Dropdown>
      </div>
      <UserInfo />
    </Header>
  );
};

export default AppHeader;

AppHeader.propTypes = {
  onToggleSidebar: PropTypes.func,
  isCollapsed: PropTypes.bool,
  className: PropTypes.string,
};
