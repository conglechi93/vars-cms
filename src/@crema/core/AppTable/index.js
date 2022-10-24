import React, {useRef} from 'react';
import {Table} from 'antd';
import './index.style.less';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import IntlMessages from '@crema/utility/IntlMessages';
import {defaultPageSize, pageSizeOptions} from 'shared/constants/AppConst';

const AppTable = (props) => {
  const {
    columns,
    data,
    pagination,
    hoverColor,
    className,
    error,
    nowrap,
    headNoWrap,
    nestedTable,
    ...rest
  } = props;
  const wrapper = useRef(null);

  if (error && (data == null || data.length == 0)) {
    return (
      <>
        <IntlMessages id='error.message.somethingWentWrong' />
      </>
    );
  }

  const modifiedColumns = Object.keys(columns).map((key) => {
    const column = columns[key];
    const {paragraph} = column;
    return {
      ...columns[key],
      className: clsx({paragraph}, column.className),
    };
  });

  const mergePagination =
    pagination != false
      ? {
          defaultPageSize: defaultPageSize,
          ...pagination,
          hideOnSinglePage: false,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: pageSizeOptions,
          onChange: (page, pageSize) => {
            pagination?.onChange(page, pageSize);
            wrapper.current?.scrollIntoView({
              behavior: 'smooth',
            });
          },
        }
      : false;

  return (
    <div ref={wrapper} className='app-table-wrapper'>
      <Table
        type='left'
        className={clsx(
          'app-table',
          'table-responsive',
          {hoverColor: hoverColor},
          {'table-nowrap': nowrap},
          {'table-head-nowrap': headNoWrap},
          {'table-nested': nestedTable},
          className,
        )}
        columns={modifiedColumns}
        dataSource={data}
        rowKey='id'
        pagination={mergePagination}
        {...rest}
      />
    </div>
  );
};

export default AppTable;

AppTable.propTypes = {
  columns: PropTypes.any,
  data: PropTypes.array,
  className: PropTypes.string,
  pagination: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  hoverColor: PropTypes.bool,
  error: PropTypes.string,
  nowrap: PropTypes.bool,
  headNoWrap: PropTypes.bool,
  nestedTable: PropTypes.bool,
};

AppTable.defaultProps = {};
