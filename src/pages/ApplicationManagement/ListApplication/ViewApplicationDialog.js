import {AppLoader} from '@crema';
import AppFormTextView from '@crema/core/AppFormTextView';
import AppModal from '@crema/core/AppModal';
import AppSpace from '@crema/core/AppSpace';
import IntlMessages from '@crema/utility/IntlMessages';
import {Button, Col, Row} from 'antd';
import PropTypes from 'prop-types';
import React, {memo, useEffect} from 'react';

const ViewApplicationDialog = ({
  visible,
  loading,
  error,
  applicationDetail,
  onCancel,
}) => {
  useEffect(() => {
    if (error) onCancel?.();
  }, [visible, error]);

  const {name} = applicationDetail || {};

  return (
    <AppModal
      width={600}
      title={<IntlMessages id='application.view' />}
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
                label={<IntlMessages id='application.name' />}>
                {name}
              </AppFormTextView.Item>
            </Col>
          </Row>
        </AppFormTextView>
      )}
    </AppModal>
  );
};

export default memo(ViewApplicationDialog);

ViewApplicationDialog.propTypes = {
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  onCancel: PropTypes.func,
  applicationDetail: PropTypes.object,
};

ViewApplicationDialog.defaultProps = {};
