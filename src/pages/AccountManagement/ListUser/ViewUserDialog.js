import {AppLoader} from '@crema';
import AppFormTextView from '@crema/core/AppFormTextView';
import AppModal from '@crema/core/AppModal';
import AppSpace from '@crema/core/AppSpace';
import IntlMessages from '@crema/utility/IntlMessages';
import {Button, Col, Row} from 'antd';
import PropTypes from 'prop-types';
import React, {memo, useEffect} from 'react';

const ViewUserDialog = ({visible, loading, error, userDetail, onCancel}) => {
  useEffect(() => {
    if (error) onCancel?.();
  }, [visible, error]);

  const {email, others, roles} = userDetail || {};
  const {phoneNumber, fullName} = others || {};

  return (
    <AppModal
      width={600}
      title={<IntlMessages id='am.viewUser' />}
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
            <Col span={24}>\
              <AppFormTextView.Item
                label={<IntlMessages id='common.fullName' />}>
                {fullName}
              </AppFormTextView.Item>
              <AppFormTextView.Item label={<IntlMessages id='common.email' />}>
                {email}
              </AppFormTextView.Item>
              <AppFormTextView.Item
                label={<IntlMessages id='common.phoneNumber' />}>
                {phoneNumber}
              </AppFormTextView.Item>
              <AppFormTextView.Item label={<IntlMessages id='common.role' />}>
                <ul>
                  {(roles || []).map((item) => (
                    <li key={item.objectId}>{item.name}</li>
                  ))}
                </ul>
              </AppFormTextView.Item>
            </Col>
          </Row>
        </AppFormTextView>
      )}
    </AppModal>
  );
};

export default memo(ViewUserDialog);

ViewUserDialog.propTypes = {
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  onCancel: PropTypes.func,
  userDetail: PropTypes.object,
};

ViewUserDialog.defaultProps = {};
