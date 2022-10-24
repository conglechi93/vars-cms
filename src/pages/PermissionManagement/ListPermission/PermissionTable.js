import AppIconButton from '@crema/core/AppIconButton';
import AppSpace from '@crema/core/AppSpace';
import AppTable from '@crema/core/AppTable';
import IntlMessages from '@crema/utility/IntlMessages';
import {BsTrash} from '@react-icons/all-files/bs/BsTrash';
import {AiOutlineEye} from '@react-icons/all-files/ai/AiOutlineEye';
import {AiOutlineProfile} from '@react-icons/all-files/ai/AiOutlineProfile';
import PropTypes from 'prop-types';
import React, {memo} from 'react';
import {
  PERMISSION_TABLE_DELETE,
  PERMISSION_TABLE_UPDATE,
  PERMISSION_TABLE_VIEW,
} from './PermissionTableActions';

const PermissionTable = ({
  data,
  loading,
  error,
  totalRow,
  onPageChange,
  onDispatchAction,
}) => {
  // const {locale} = useLocaleContext()
  const columns = [
    {
      title: <IntlMessages id='permission.code' />,
      dataIndex: 'code',
      key: 'code',
      width: '1%',
    },
    {
      title: <IntlMessages id='permission.name' />,
      dataIndex: 'name',
      key: 'name',
      paragraph: true,
      width: '20%',
    },
    {
      title: <IntlMessages id='common.description' />,
      dataIndex: 'description',
      key: 'description',
      paragraph: true,
      width: '30%',
    },
    {
      title: <IntlMessages id='common.action' />,
      align: 'center',
      dataIndex: 'objectId',
      key: 'objectId',
      width: '1%',
      render: (item, entry) => (
        <AppSpace size={0}>
          <AppIconButton
            icon={<AiOutlineEye />}
            title={<IntlMessages id='common.view' />}
            onClick={() =>
              onDispatchAction?.(PERMISSION_TABLE_VIEW, item, entry)
            }
          />
          <AppIconButton
            icon={<AiOutlineProfile />}
            title={<IntlMessages id='common.update' />}
            onClick={() =>
              onDispatchAction?.(PERMISSION_TABLE_UPDATE, item, entry)
            }
          />
          <AppIconButton
            icon={<BsTrash />}
            title={<IntlMessages id='common.delete' />}
            onClick={() =>
              onDispatchAction?.(PERMISSION_TABLE_DELETE, item, entry)
            }
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

export default memo(PermissionTable);

PermissionTable.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
  totalRow: PropTypes.number,
  onPageChange: PropTypes.func,
  onDispatchAction: PropTypes.func,
};

PermissionTable.defaultProps = {};
