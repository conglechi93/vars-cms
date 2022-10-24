import AppIconButton from '@crema/core/AppIconButton';
import AppSpace from '@crema/core/AppSpace';
import AppTable from '@crema/core/AppTable';
import IntlMessages from '@crema/utility/IntlMessages';
import {BsTrash} from '@react-icons/all-files/bs/BsTrash';
import PropTypes from 'prop-types';
import React, {memo} from 'react';
import {APPLICATION_TABLE_REMOVE_CLIENT} from './ApplicationTableActions';

const ApplicationTableExpand = ({data, onDispatchAction}) => {
  const columns = [
    {
      title: <IntlMessages id='application.clientName' />,
      dataIndex: 'name',
      key: 'name',
      width: '1%',
    },
    {
      title: <IntlMessages id='application.clientId' />,
      dataIndex: 'clientId',
      key: 'clientId',
    },
    {
      title: <IntlMessages id='application.clientSecret' />,
      dataIndex: 'clientSecret',
      key: 'clientSecret',
    },
    {
      title: <IntlMessages id='common.action' />,
      align: 'center',
      dataIndex: 'objectId',
      key: 'objectId',
      width: '1%',
      render: (id, entry) => (
        <AppSpace size={0}>
          <AppIconButton
            icon={<BsTrash />}
            title={<IntlMessages id='common.delete' />}
            onClick={() => {
              onDispatchAction?.(APPLICATION_TABLE_REMOVE_CLIENT, id, entry);
            }}
          />
        </AppSpace>
      ),
    },
  ];

  return (
    <AppTable
      hoverColor
      rowKey='objectId'
      data={data}
      columns={columns}
      pagination={false}
      headNoWrap
      nestedTable
    />
  );
};

export default memo(ApplicationTableExpand);

ApplicationTableExpand.propTypes = {
  data: PropTypes.array,
  onDispatchAction: PropTypes.func,
};

ApplicationTableExpand.defaultProps = {};
