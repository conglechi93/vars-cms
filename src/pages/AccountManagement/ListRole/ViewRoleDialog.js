import {AppLoader} from '@crema';
import AppFormTextView from '@crema/core/AppFormTextView';
import AppModal from '@crema/core/AppModal';
import AppSpace from '@crema/core/AppSpace';
import IntlMessages from '@crema/utility/IntlMessages';
import {Button, Col, Row} from 'antd';
import PropTypes from 'prop-types';
import React, {memo, useEffect} from 'react';

const ViewRoleDialog = ({visible, loading, error, roleDetail, onCancel}) => {
  useEffect(() => {
    if (error) onCancel?.();
  }, [visible, error]);

  const {name, code, description, permissions} = roleDetail || {};

  return (
    <AppModal
      width={600}
      title={<IntlMessages id='am.viewRole' />}
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
              <AppFormTextView.Item label={<IntlMessages id='am.roleCode' />}>
                {code}
              </AppFormTextView.Item>
              <AppFormTextView.Item label={<IntlMessages id='am.roleName' />}>
                {name}
              </AppFormTextView.Item>
              <AppFormTextView.Item
                label={<IntlMessages id='common.description' />}>
                {description}
              </AppFormTextView.Item>
              <AppFormTextView.Item
                label={<IntlMessages id='common.permission' />}>
                {permissions?.length && (
                  <ul>
                    {permissions.map((item) => (
                      <li key={item.objectId}>{item.name}</li>
                    ))}
                  </ul>
                )}
              </AppFormTextView.Item>
            </Col>
          </Row>
        </AppFormTextView>
      )}
    </AppModal>
  );
};

export default memo(ViewRoleDialog);

ViewRoleDialog.propTypes = {
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  onCancel: PropTypes.func,
  roleDetail: PropTypes.object,
};

ViewRoleDialog.defaultProps = {};
