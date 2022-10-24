import React from 'react';
import {Spin} from 'antd';
import './index.style.less';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const AppLoader = ({block}) => {
  return (
    <div className={clsx('app-loader', {block})}>
      <Spin />
    </div>
  );
};

export default AppLoader;

AppLoader.propTypes = {
  block: PropTypes.bool,
};

AppLoader.defaultProps = {};
