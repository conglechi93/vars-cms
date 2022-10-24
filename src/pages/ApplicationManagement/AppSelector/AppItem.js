import AppCard from '@crema/core/AppCard';
import IntlMessages from '@crema/utility/IntlMessages';
import {Button} from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import {useIntl} from 'react-intl';
import Date from 'utils/Date';
import Icon from '@ant-design/icons';
import {AiOutlineEye} from '@react-icons/all-files/ai/AiOutlineEye';

const AppItem = React.forwardRef(({item, onView}, ref) => {
  const {name, createdAt} = item || {};
  const {messages} = useIntl();

  return (
    <AppCard ref={ref} mini className='app-si'>
      <div className='app-si-content'>
        <div className='app-si-content-header'>
          <span>{name}</span>
        </div>
        <div className='app-si-content-body'>
          <IntlMessages id='common.createdAt' />
          &nbsp;:&nbsp;
          <span>{Date.formatString(createdAt)}</span>
        </div>
        <div className='app-si-content-footer'>
          <Button
            onClick={() => onView?.(item)}
            type='primary'
            icon={<Icon component={AiOutlineEye} />}>
            {messages['common.view']}
          </Button>
        </div>
      </div>
    </AppCard>
  );
});

export default AppItem;

AppItem.propTypes = {
  item: PropTypes.object,
  onView: PropTypes.func,
};
