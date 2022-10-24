import React from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'antd';
import clsx from 'clsx';
import './index.style.less';

const AppModal = ({className, children, maskClosable, closable, ...rest}) => {
  return (
    <Modal
      className={clsx(className, 'app-modal')}
      maskClosable={maskClosable}
      closable={closable}
      {...rest}>
      {children}
    </Modal>
  );
};

export default AppModal;

AppModal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  maskClosable: PropTypes.bool,
  closable: PropTypes.bool,
};

AppModal.defaultProps = {
  maskClosable: false,
  closable: true,
};
