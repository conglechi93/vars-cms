import {Carousel} from 'antd';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import './index.style.less';

const AppCarousel = React.forwardRef(
  ({children, dotPosition, className, ...rest}, ref) => {
    const classes = clsx(
      className,
      `app-carousel`,
      `app-carousel-dot-${dotPosition}`,
    );
    return (
      <Carousel
        dotPosition={dotPosition}
        className={classes}
        ref={ref}
        {...rest}>
        {children}
      </Carousel>
    );
  },
);

export default AppCarousel;
AppCarousel.propTypes = {
  autoplay: PropTypes.bool,
  dotPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  dots: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  easing: PropTypes.string,
  effect: PropTypes.oneOf(['scrollx', 'fade']),
  afterChange: PropTypes.func,
  beforeChange: PropTypes.func,
  children: PropTypes.node,
  swipeToSlide: PropTypes.bool,
  draggable: PropTypes.bool,
  className: PropTypes.string,
};
AppCarousel.defaultProps = {
  autoplay: false,
  dotPosition: 'bottom',
  dots: true,
  easing: 'linear',
  effect: 'scrollx',
  swipeToSlide: true,
  draggable: true,
};
