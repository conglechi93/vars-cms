import {Space} from 'antd';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

const AppSpace = ({preset, children, size, ...rest}) => {
  const [fontSize, setFontSize] = useState(16);
  const [measureSize, setMeasureSize] = useState(fontSize / 2);

  useEffect(() => {
    const fontSize = getComputedStyle(
      document.documentElement,
    ).getPropertyValue('--font-size');
    if (fontSize) setFontSize(Number(fontSize.replace('px', '')));
  }, []);

  useEffect(() => {
    setMeasureSize(measure);
  }, [fontSize]);

  const measure = () => {
    if (size != null) return size;
    else if (preset) {
      if (typeof preset == 'object') {
        return preset.map((i) => i * fontSize);
      } else return Number(preset) * fontSize;
    }
    return fontSize / 2;
  };

  return (
    <Space size={measureSize} {...rest}>
      {children}
    </Space>
  );
};

export default AppSpace;
AppSpace.propTypes = {
  align: PropTypes.oneOf(['start', 'end', 'center', 'baseline']),
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  preset: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.string,
  ]),
  split: PropTypes.bool,
  wrap: PropTypes.bool,
  children: PropTypes.node,
};
AppSpace.defaultProps = {
  align: undefined,
  direction: 'horizontal',
  size: undefined,
  preset: 0.5,
  split: false,
  wrap: false,
};
