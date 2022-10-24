import React, {useState} from 'react';
import {Select} from 'antd';
import PropTypes from 'prop-types';
import './index.style.less';
import clsx from 'clsx';

const AppSelect = ({
  menus,
  onChange,
  defaultValue,
  selectionKey,
  className,
  children,
  ...rest
}) => {
  const [selectionType, setSelectionType] = useState(defaultValue);

  const handleSelectionType = (value) => {
    setSelectionType(value);
    onChange(value);
  };

  const {Option} = Select;

  return (
    <Select
      defaultValue={defaultValue}
      value={selectionType}
      onChange={handleSelectionType}
      className={clsx('select-box', className)}
      {...rest}>
      {menus
        ? menus.map((menu, index) => (
            <Option
              key={index}
              value={selectionKey ? menu[selectionKey] : menu}
              className='select-option'>
              {selectionKey ? menu[selectionKey] : menu}
            </Option>
          ))
        : children}
    </Select>
  );
};

AppSelect.Option = Select.Option;

AppSelect.propTypes = {
  menus: PropTypes.array,
  onChange: PropTypes.func,
  defaultValue: PropTypes.any,
  selectionKey: PropTypes.any,
  children: PropTypes.node,
  className: PropTypes.string,
};
AppSelect.defaultProps = {
  menus: null,
  defaultValue: '',
  selectionKey: '',
};

export default AppSelect;
