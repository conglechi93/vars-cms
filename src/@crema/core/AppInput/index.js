import React from 'react';
import {Input} from 'antd';
import PropTypes from 'prop-types';
import './index.style.less';
import clsx from 'clsx';

const AppInput = React.forwardRef(({trim, className, ...rest}, ref) => {

  const extraProps = {
    onBlur: trim
      ? (e) => {
          const {target} = e;
          setNativeValue(target, target.value?.trim());
          const evt = new Event('change', {bubbles: true});
          target.dispatchEvent(evt);
        }
      : undefined,
  };

  const setNativeValue = (element, value) => {
    const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
    const prototype = Object.getPrototypeOf(element);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(
      prototype,
      'value',
    ).set;

    if (valueSetter && valueSetter !== prototypeValueSetter) {
      prototypeValueSetter.call(element, value);
    } else {
      valueSetter.call(element, value);
    }
  };

  return (
    <Input
      ref={ref}
      className={clsx('app-input', className)}
      {...rest}
      {...extraProps}
    />
  );
});

export default AppInput;
AppInput.propTypes = {
  trim: PropTypes.bool,
  className: PropTypes.string,
  initialValues: PropTypes.string,
  onChange: PropTypes.func,
};
AppInput.defaultProps = {
  trim: true,
};
