import {AppLoader} from '@crema';
import AppFormTextView from '@crema/core/AppFormTextView';
import AppModal from '@crema/core/AppModal';
import AppSpace from '@crema/core/AppSpace';
import AppTab from '@crema/core/AppTab';
import IntlMessages from '@crema/utility/IntlMessages';
import {Button, Col, Row} from 'antd';
import PropTypes from 'prop-types';
import React, {memo, useEffect} from 'react';

const ViewCategoryDialog = ({
  visible,
  loading,
  error,
  categoryDetail,
  onCancel,
}) => {
  useEffect(() => {
    if (error) onCancel?.();
  }, [error]);

  const {code, group, names, descriptions} = categoryDetail || {};
  const locales = Object.keys(names || {});

  return (
    <AppModal
      width={600}
      title={<IntlMessages id='category.view' />}
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
              <AppFormTextView.Item label={<IntlMessages id='category.code' />}>
                {code}
              </AppFormTextView.Item>
              <AppFormTextView.Item
                label={<IntlMessages id='category.group' />}>
                {group}
              </AppFormTextView.Item>
              <AppFormTextView.Item>
                {locales && (
                  <AppTab defaultActiveKey='0' onChange={() => {}}>
                    {locales.map((code, idx) => (
                      <AppTab.Pane
                        tab={<IntlMessages id={`locale.${code}`} />}
                        key={idx}>
                        <AppFormTextView.Item
                          label={<IntlMessages id='category.name' />}>
                          {names?.[code] || ''}
                        </AppFormTextView.Item>
                        {descriptions?.[code] && (
                          <AppFormTextView.Item
                            label={<IntlMessages id='common.description' />}>
                            {descriptions[code]}
                          </AppFormTextView.Item>
                        )}
                      </AppTab.Pane>
                    ))}
                  </AppTab>
                )}
              </AppFormTextView.Item>
            </Col>
          </Row>
        </AppFormTextView>
      )}
    </AppModal>
  );
};

export default memo(ViewCategoryDialog);

ViewCategoryDialog.propTypes = {
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  onCancel: PropTypes.func,
  categoryDetail: PropTypes.object,
};

ViewCategoryDialog.defaultProps = {};
