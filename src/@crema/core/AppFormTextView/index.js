import React from 'react';
import PropTypes from 'prop-types';
import './index.style.less';
import clsx from 'clsx';
import {Col, Row} from 'antd';
import './index.style.less';

const AppFormTextViewItem = ({
  className,
  label,
  content,
  children,
  ...rest
}) => {
  return (
    <Row className={clsx('app-form-text-view-item', className)} {...rest}>
      {label && (
        <Col className={clsx('app-form-text-view-item-label')}>
          <label>{label}</label>
        </Col>
      )}
      <Col className={clsx('app-form-text-view-item-content')}>
        {content || children}
      </Col>
    </Row>
  );
};

AppFormTextViewItem.propTypes = {
  className: PropTypes.string,
  label: PropTypes.object,
  content: PropTypes.node,
  children: PropTypes.node,
};
AppFormTextViewItem.defaultProps = {};

const AppFormTextView = ({className, ...rest}) => {
  return (
    <div
      className={clsx(
        'app-form-text-view',
        'app-form-text-view-vertical',
        className,
      )}
      {...rest}></div>
  );
};

AppFormTextView.propTypes = {
  className: PropTypes.string,
};
AppFormTextView.defaultProps = {};

AppFormTextView.Item = AppFormTextViewItem;

export default AppFormTextView;
