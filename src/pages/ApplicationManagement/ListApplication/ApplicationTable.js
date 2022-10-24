import AppIconButton from '@crema/core/AppIconButton';
import AppSpace from '@crema/core/AppSpace';
import AppTable from '@crema/core/AppTable';
import IntlMessages from '@crema/utility/IntlMessages';
import {AiOutlineProfile} from '@react-icons/all-files/ai/AiOutlineProfile';
import {BiAddToQueue} from '@react-icons/all-files/bi/BiAddToQueue';
import {Typography} from 'antd';
import PropTypes from 'prop-types';
import React, {memo, useState} from 'react';
import {FormattedMessage} from 'react-intl';
import Date from 'utils/Date';
import {
  APPLICATION_TABLE_ADD_CLIENT,
  APPLICATION_TABLE_UPDATE,
  // APPLICATION_TABLE_VIEW,
} from './ApplicationTableActions';
import ApplicationTableExpand from './ApplicationTableExpand';

const ApplicationTable = ({
  data,
  loading,
  error,
  totalRow,
  onPageChange,
  onDispatchAction,
}) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const handleExpand = (key) => {
    if (expandedRowKeys.includes(key))
      setExpandedRowKeys(expandedRowKeys.filter((item) => item != key));
    else setExpandedRowKeys([...expandedRowKeys, key]);
  };

  const columns = [
    {
      title: <IntlMessages id='application.name' />,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <IntlMessages id='application.code' />,
      dataIndex: 'code',
      key: 'code',
      width: '1%',
    },
    {
      title: <IntlMessages id='common.createdAt' />,
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '1%',
      render: (text) => Date.formatString(text),
    },
    {
      title: <IntlMessages id='common.status' />,
      dataIndex: 'status',
      key: 'status',
      render: (text) =>
        text == 1 ? (
          <IntlMessages id='common.active' />
        ) : (
          <IntlMessages id='common.locked' />
        ),
    },
    {
      title: <IntlMessages id='application.client' />,
      dataIndex: 'objectId',
      key: 'objectId',
      render: (item, entry) => {
        const clients = entry?.clients || [];
        return (
          <Typography.Link underline onClick={() => handleExpand(item)}>
            <FormattedMessage
              id='application.numClient'
              values={{value: clients.length}}
            />
          </Typography.Link>
        );
      },
    },
    {
      title: <IntlMessages id='common.action' />,
      align: 'center',
      dataIndex: 'objectId',
      key: 'objectId',
      width: '1%',
      render: (item, entry) => (
        <AppSpace size={0}>
          {/* <AppIconButton
            icon={<AiOutlineEye />}
            title={<IntlMessages id='common.view' />}
            onClick={() => onDispatchAction?.(APPLICATION_TABLE_VIEW, item, entry)}
          /> */}
          <AppIconButton
            icon={<AiOutlineProfile />}
            title={<IntlMessages id='common.update' />}
            onClick={() =>
              onDispatchAction?.(APPLICATION_TABLE_UPDATE, item, entry)
            }
          />
          <AppIconButton
            icon={<BiAddToQueue />}
            title={<IntlMessages id='application.addClient' />}
            onClick={() =>
              onDispatchAction?.(APPLICATION_TABLE_ADD_CLIENT, item, entry)
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

  const expandedRowRender = (record) => (
    <ApplicationTableExpand
      onDispatchAction={onDispatchAction}
      data={record?.clients || []}
    />
  );

  return (
    <AppTable
      hoverColor
      rowKey='objectId'
      pagination={pagination}
      columns={columns}
      loading={loading}
      error={error}
      data={data}
      expandable={{expandedRowRender, showExpandColumn: false, expandedRowKeys}}
      headNoWrap
    />
  );
};

export default memo(ApplicationTable);

ApplicationTable.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
  totalRow: PropTypes.number,
  onPageChange: PropTypes.func,
  onDispatchAction: PropTypes.func,
};

ApplicationTable.defaultProps = {};
