import AppIconButton from '@crema/core/AppIconButton';
import AppSpace from '@crema/core/AppSpace';
import AppTable from '@crema/core/AppTable';
// import { useLocaleContext } from '@crema/utility/AppContextProvider/LocaleContextProvide';
import IntlMessages from '@crema/utility/IntlMessages';
import {BsTrash} from '@react-icons/all-files/bs/BsTrash';
import {AiOutlineEye} from '@react-icons/all-files/ai/AiOutlineEye';
import {AiOutlineProfile} from '@react-icons/all-files/ai/AiOutlineProfile';
import {AiOutlineCopy} from '@react-icons/all-files/ai/AiOutlineCopy';
import {Typography} from 'antd';
import PropTypes from 'prop-types';
import React, {memo} from 'react';
import {
  CATEGORY_TABLE_DELETE,
  CATEGORY_TABLE_DUPLICATE,
  CATEGORY_TABLE_UPDATE,
  CATEGORY_TABLE_VIEW,
} from './CategoryTableActions';

const renderTitleWithLocale = (title, langCode) =>
  title && (
    <React.Fragment key={langCode}>
      ▪&nbsp;
      <b>{<IntlMessages id={`locale.${langCode}`} />}</b>: {title || ''}
      <br />
    </React.Fragment>
  );

const CategoryTable = ({
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
      title: <IntlMessages id='category.group' />,
      dataIndex: 'group',
      key: 'group',
      width: '1%',
    },
    {
      title: <IntlMessages id='category.code' />,
      dataIndex: 'code',
      key: 'code',
      width: '1%',
    },
    {
      title: <IntlMessages id='category.name' />,
      dataIndex: 'names',
      key: 'names',
      paragraph: true,
      width: '20%',
      render: (_, entry) => (
        <Typography.Paragraph
          ellipsis={{
            rows: 4,
            expandable: true,
          }}>
          {Object.keys(entry?.names || {}).map((langCode) =>
            renderTitleWithLocale(entry?.names?.[langCode], langCode),
          )}
        </Typography.Paragraph>
      ),
    },
    {
      title: <IntlMessages id='common.description' />,
      dataIndex: 'description',
      key: 'description',
      paragraph: true,
      width: '30%',
      render: (_, entry) => (
        <Typography.Paragraph
          ellipsis={{
            rows: 4,
            expandable: true,
          }}>
          {Object.keys(entry?.descriptions || {}).map((langCode) =>
            renderTitleWithLocale(entry?.descriptions?.[langCode], langCode),
          )}
        </Typography.Paragraph>
      ),
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
            onClick={() => onDispatchAction?.(CATEGORY_TABLE_VIEW, item, entry)}
          />
          <AppIconButton
            icon={<AiOutlineProfile />}
            title={<IntlMessages id='common.update' />}
            onClick={() =>
              onDispatchAction?.(CATEGORY_TABLE_UPDATE, item, entry)
            }
          />
          <AppIconButton
            icon={<AiOutlineCopy />}
            title={<IntlMessages id='common.duplicate' />}
            onClick={() =>
              onDispatchAction?.(CATEGORY_TABLE_DUPLICATE, item, entry)
            }
          />
          <AppIconButton
            icon={<BsTrash />}
            title={<IntlMessages id='common.delete' />}
            onClick={() =>
              onDispatchAction?.(CATEGORY_TABLE_DELETE, item, entry)
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

export default memo(CategoryTable);

CategoryTable.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
  totalRow: PropTypes.number,
  onPageChange: PropTypes.func,
  onDispatchAction: PropTypes.func,
};

CategoryTable.defaultProps = {};
