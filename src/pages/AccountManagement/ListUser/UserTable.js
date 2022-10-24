import AppIconButton from '@crema/core/AppIconButton';
import AppSpace from '@crema/core/AppSpace';
import AppTable from '@crema/core/AppTable';
import IntlMessages from '@crema/utility/IntlMessages';
import {AiOutlineEye} from '@react-icons/all-files/ai/AiOutlineEye';
import {AiOutlineProfile} from '@react-icons/all-files/ai/AiOutlineProfile';
import PropTypes from 'prop-types';
import {memo} from 'react';
import {USER_TABLE_UPDATE_ROLE, USER_TABLE_VIEW} from './UserTableActions';

const fetchOther = (user, key) => {
  return user?.others?.[key] || '';
};

const UserTable = ({
  data,
  loading,
  error,
  totalRow,
  onPageChange,
  onDispatchAction,
}) => {
  const columns = [
    {
      title: <IntlMessages id='common.phoneNumber' />,
      dataIndex: 'username',
      key: 'username',
      //render: (_, entry) => fetchOther(entry, 'username'),
    },
    {
      title: <IntlMessages id='common.fullName' />,
      key: 'fullName',
      render: (_, entry) => fetchOther(entry, 'fullName'),
    },
    {
      title: <IntlMessages id='common.email' />,
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: <IntlMessages id='common.action' />,
      align: 'center',
      dataIndex: 'objectId',
      key: 'objectId',
      width: '1%',
      render: (item) => (
        <AppSpace size={0}>
          <AppIconButton
            icon={<AiOutlineEye />}
            title={<IntlMessages id='common.view' />}
            onClick={() => onDispatchAction?.(USER_TABLE_VIEW, item)}
          />
          <AppIconButton
            icon={<AiOutlineProfile />}
            title={<IntlMessages id='am.updateUserRole' />}
            onClick={() => onDispatchAction?.(USER_TABLE_UPDATE_ROLE, item)}
          />
        </AppSpace>
      ),
    },
  ];

  const pagination = {
    total: totalRow,
    onChange: onPageChange,
  };
  

  return (
    <AppTable
      hoverColor
      rowKey='objectId'
      pagination={pagination}
      columns={columns}
      loading={loading}
      error={error}
      data={data}
      headNoWrap
    />
  );
};

export default memo(UserTable);

UserTable.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
  totalRow: PropTypes.number,
  onPageChange: PropTypes.func,
  onDispatchAction: PropTypes.func,
};

UserTable.defaultProps = {};
