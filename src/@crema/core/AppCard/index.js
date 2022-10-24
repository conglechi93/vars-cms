import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'antd';
import clsx from 'clsx';
import './index.style.less';

const AppCard = React.forwardRef(
  (
    {
      title,
      extra,
      children,
      cover,
      className,
      actions,
      heightFull,
      titleSize,
      secondary,
      mini,
      bordered,
      ...rest
    },
    ref,
  ) => {
    return (
      <Card
        ref={ref}
        className={clsx(
          'card',
          {heightFull: heightFull},
          titleSize,
          {secondary},
          {mini},
          {bordered},
          className,
        )}
        title={title}
        extra={extra ? extra : null}
        cover={cover}
        actions={actions}
        bordered={false}
        {...rest}>
        {children}
      </Card>
    );
  },
);

export default AppCard;

AppCard.propTypes = {
  action: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  extra: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node,
  cover: PropTypes.any,
  className: PropTypes.string,
  actions: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  heightFull: PropTypes.bool,
  titleSize: PropTypes.oneOf(['large', 'default']),
  secondary: PropTypes.bool,
  mini: PropTypes.bool,
  bordered: PropTypes.bool,
};

AppCard.defaultProps = {
  titleSize: 'default',
  secondary: false,
  mini: false,
  bordered: true,
};
