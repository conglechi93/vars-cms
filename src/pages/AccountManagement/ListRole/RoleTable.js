import AppIconButton from '@crema/core/AppIconButton';
import AppSpace from '@crema/core/AppSpace';
import AppTable from '@crema/core/AppTable';
import IntlMessages from '@crema/utility/IntlMessages';
import {AiOutlineEye} from '@react-icons/all-files/ai/AiOutlineEye';
import {AiOutlineEdit} from '@react-icons/all-files/ai/AiOutlineEdit';
import {Typography} from 'antd';
import PropTypes from 'prop-types';
import {memo} from 'react';
import {ROLE_TABLE_EDIT, ROLE_TABLE_VIEW} from './RoleTableActions';

const RoleTable = ({
  data,
  loading,
  error,
  totalRow,
  onPageChange,
  onDispatchAction,
}) => {
  const columns = [
    {
      title: <IntlMessages id='common.name' />,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <IntlMessages id='common.createdBy' />,
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: '1%',
    },
    {
      title: <IntlMessages id='common.permission' />,
      dataIndex: 'permissions',
      key: 'permissions',
      render: (_, data) => {
        if (data && data.permissions)
          return (
            <Typography.Paragraph>
              {data.permissions.map((item) => item.name || ' ').join('; ')}
            </Typography.Paragraph>
          );
        return null;
      },
    },
    {
      title: <IntlMessages id='common.description' />,
      dataIndex: 'description',
      key: 'description',
      paragraph: true,
      width: '30%',
      render: (text) => (
        <Typography.Paragraph
          ellipsis={{
            rows: 4,
            expandable: true,
          }}>
          {text}
        </Typography.Paragraph>
      ),
    },
    {
      title: <IntlMessages id='common.action' />,
      align: 'center',
      dataIndex: 'objectId',
      key: 'objectId',
      width: '1%',
      render: (objectId) => (
        <AppSpace size={0}>
          <AppIconButton
            icon={<AiOutlineEye />}
            title={<IntlMessages id='common.view' />}
            onClick={() => onDispatchAction(ROLE_TABLE_VIEW, objectId)}
          />
          <AppIconButton
            icon={<AiOutlineEdit />}
            title={<IntlMessages id='common.update' />}
            onClick={() => onDispatchAction(ROLE_TABLE_EDIT, objectId)}
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

export default memo(RoleTable);

RoleTable.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
  totalRow: PropTypes.number,
  onPageChange: PropTypes.func,
  onDispatchAction: PropTypes.func,
};

RoleTable.defaultProps = {};
