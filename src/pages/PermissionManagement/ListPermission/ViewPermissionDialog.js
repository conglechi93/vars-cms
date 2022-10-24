import {AppLoader} from '@crema';
import AppFormTextView from '@crema/core/AppFormTextView';
import AppModal from '@crema/core/AppModal';
import AppSpace from '@crema/core/AppSpace';
import IntlMessages from '@crema/utility/IntlMessages';
import {Button, Col, Row} from 'antd';
import PropTypes from 'prop-types';
import React, {memo, useEffect} from 'react';

const ViewPermissionDialog = ({
  visible,
  loading,
  error,
  permissionDetail,
  onCancel,
}) => {
  useEffect(() => {
    if (error) onCancel?.();
  }, [error]);

  const {code, name, description} = permissionDetail || {};

  return (
    <AppModal
      width={600}
      title={<IntlMessages id='permission.view' />}
      maskClosable={true}
      onCancel={onCancel}
      footer={
        <AppSpace>
          <Button onClick={onCancel} type='default'>
            <IntlMessages id='common.cancel' />
          </Button>
        </AppSpace>
      }
      visible={visible}>
      {loading ? (
        <AppLoader block />
      ) : (
        <AppFormTextView>
          <Row gutter={16}>
            <Col span={24}>
              <AppFormTextView.Item
                label={<IntlMessages id='permission.code' />}>
                {code}
              </AppFormTextView.Item>
              <AppFormTextView.Item
                label={<IntlMessages id='permission.name' />}>
                {name}
              </AppFormTextView.Item>
              <AppFormTextView.Item
                label={<IntlMessages id='common.description' />}>
                {description}
              </AppFormTextView.Item>
            </Col>
          </Row>
        </AppFormTextView>
      )}
    </AppModal>
  );
};

export default memo(ViewPermissionDialog);

ViewPermissionDialog.propTypes = {
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  onCancel: PropTypes.func,
  permissionDetail: PropTypes.object,
};

ViewPermissionDialog.defaultProps = {};
