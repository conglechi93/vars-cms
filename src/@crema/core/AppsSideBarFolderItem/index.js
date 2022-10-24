import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {FaRegCheckCircle} from '@react-icons/all-files/fa/FaRegCheckCircle';
import {FaRegEnvelope} from '@react-icons/all-files/fa/FaRegEnvelope';
import {FaRegEnvelopeOpen} from '@react-icons/all-files/fa/FaRegEnvelopeOpen';
import {FaRegStar} from '@react-icons/all-files/fa/FaRegStar';
import {BiArchiveIn} from '@react-icons/all-files/bi/BiArchiveIn';
import {BiCalendarMinus} from '@react-icons/all-files/bi/BiCalendarMinus';
import {BiUser} from '@react-icons/all-files/bi/BiUser';
import {AiOutlineDelete} from '@react-icons/all-files/ai/AiOutlineDelete';
import {AiOutlineSchedule} from '@react-icons/all-files/ai/AiOutlineSchedule';
import {FiInfo} from '@react-icons/all-files/fi/FiInfo';
import {FiRefreshCw} from '@react-icons/all-files/fi/FiRefreshCw';

import './index.style.less';

const getIconByName = (iconName) => {
  switch (iconName) {
    case 'check-circle':
      return <FaRegCheckCircle />;
    case 'envelope':
      return <FaRegEnvelope />;
    case 'star':
      return <FaRegStar />;
    case 'calendar-minus':
      return <BiCalendarMinus />;
    case 'user':
      return <BiUser />;
    case 'clock':
      return <AiOutlineSchedule />;
    case 'envelope-open':
      return <FaRegEnvelopeOpen />;
    case 'trash-alt':
      return <AiOutlineDelete />;
    case 'file-archive':
      return <BiArchiveIn />;
    case 'question-circle':
      return <FiInfo />;
    case 'clone':
      return <FiRefreshCw />;
  }
};

const AppsSideBarFolderItem = ({item, path}) => {
  return (
    <div key={item.id} className='list-item'>
      <NavLink to={path}>
        <span className='list-item-icon'>{getIconByName(item.icon)}</span>
        <span className='list-item-text'>{item.name}</span>
      </NavLink>
    </div>
  );
};

export default AppsSideBarFolderItem;

AppsSideBarFolderItem.propTypes = {
  item: PropTypes.object,
  path: PropTypes.string,
};
