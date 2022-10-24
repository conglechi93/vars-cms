import React from 'react';
import {Tabs} from 'antd';
import './index.style.less';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const AppTab = React.forwardRef((props, ref) => {
  const {className, ...rest} = props;

  return <Tabs ref={ref} className={clsx('app-tab', className)} {...rest} />;
});

AppTab.Pane = Tabs.TabPane;
export default AppTab;

AppTab.propTypes = {
  className: PropTypes.string,
};

AppTab.defaultProps = {};
