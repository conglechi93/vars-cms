import {AppLoader} from '@crema';
import AppInput from '@crema/core/AppInput';
import AppModal from '@crema/core/AppModal';
import AppSpace from '@crema/core/AppSpace';
import AppTab from '@crema/core/AppTab';
import AppTextarea from '@crema/core/AppTextarea';
import IntlMessages from '@crema/utility/IntlMessages';
import {Button, Checkbox, Col, Form, Row} from 'antd';
import useFormMessage from 'hooks/useFormMessage';
import omit from 'lodash/omit';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import React, {memo, useEffect, useState} from 'react';
import {localeConfig} from 'shared/constants/AppConst';
import confirm from 'antd/lib/modal/confirm';
import {useIntl} from 'react-intl';

const UpdateCategoryDialog = ({
  visible,
  onSubmit,
  onCancel,
  loading,
  error,
  categoryDetail,
  duplicate,
}) => {
  const [form] = Form.useForm();
  const [isUpdate, setIsUpdate] = useState(false);
  const {formatRequiredMessageId: frm, formatRequiredLabelId: frl} =
    useFormMessage();
  const [locales, setLocales] = useState([]);
  const {messages} = useIntl();
  const [tabKey, setTabKey] = useState(null);

  useEffect(() => {
    form.resetFields();
    setLocales([]);
  }, [visible]);

  const onFinish = () => {
    onSubmit?.({
      ...form.getFieldsValue(),
      group: form.getFieldValue('group').toUpperCase(),
      code: form.getFieldValue('code').toUpperCase(),
    });
  };

  const onFinishFailed = ({errorFields}) => {
    const firstError = errorFields[0];
    if (firstError?.name?.length == 2) {
      const errorTab = firstError.name[1];
      setTabKey(errorTab);
    }
  };

  useEffect(() => {
    if (error) onCancel?.();
  }, [error]);

  useEffect(() => {
    if (!categoryDetail || isEqual(categoryDetail, {})) {
      form.resetFields();
      setIsUpdate(false);
    } else {
      const detail = duplicate
        ? omit(categoryDetail, ['code'])
        : {...categoryDetail};
      const {names} = detail;
      const nameLocales = Object.keys(names || {});
      const usageLanguage = localeConfig.enabled.filter((i) =>
        nameLocales.includes(i),
      );
      form.setFieldsValue({
        ...detail,
        usageLanguage,
      });
      setLocales(usageLanguage);
      setTabKey(usageLanguage.length ? usageLanguage[0] : null);
      setIsUpdate(!duplicate);
    }
  }, [categoryDetail]);

  const onValuesChange = (changes) => {
    const {usageLanguage} = changes;
    if (usageLanguage) {
      if (usageLanguage.length > locales.length) {
        const selected = usageLanguage.filter((i) => !locales.includes(i))[0];
        onSelectLang(selected);
      } else {
        const deselected = locales.filter((i) => !usageLanguage.includes(i))[0];
        onDeselectLang(deselected);
      }
    }
  };

  const onSelectLang = (v) => {
    const newLocales = localeConfig.enabled.filter((i) =>
      [...locales, v].includes(i),
    );
    setLocales(newLocales);
    if (newLocales.length == 1) setTabKey(newLocales[0]);
  };

  const onDeselectLang = (v) => {
    form.setFieldsValue({
      usageLanguage: locales,
    });
    confirm({
      title: messages['common.confirm'],
      content: messages['category.removeLang'],
      okText: messages['common.yes'],
      cancelText: messages['common.no'],
      onOk: () => {
        const setFormValue = {
          ...omit(form.getFieldsValue(), [`names.${v}`, `descriptions.${v}`]),
          usageLanguage: locales.filter((i) => i !== v),
        };
        form.resetFields(['names', v]);
        form.resetFields(['descriptions', v]);
        form.setFieldsValue(setFormValue);
        const newLocales = locales.filter((i) => i !== v);
        setLocales(newLocales);
        if (newLocales.length > 1) setTabKey(newLocales[0]);
      },
    });
  };

  const validateGroup = (v) =>
    /(^[A-Za-z])([A-Za-z_]){0,}$/.test(v.toUpperCase().trim());

  return (
    <AppModal
      width={600}
      title={<IntlMessages id={isUpdate ? 'am.updateRole' : 'am.createRole'} />}
      maskClosable={false}
      onCancel={onCancel}
      footer={
        <Form.Item className='mb-0' shouldUpdate>
          <AppSpace>
            <Button
              disabled={loading}
              onClick={() => form.submit()}
              type='primary'>
              <IntlMessages id={isUpdate ? 'common.update' : 'common.create'} />
            </Button>
            <Button onClick={onCancel} type='default'>
              <IntlMessages id='common.cancel' />
            </Button>
          </AppSpace>
        </Form.Item>
      }
      visible={visible}>
      {loading ? (
        <AppLoader block />
      ) : (
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
          layout='vertical'
          initialValues={{
            usageLanguage: [],
          }}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                rules={[
                  {required: true, message: frm('category.group')},
                  {
                    validator: (r, v) =>
                      validateGroup(v) ? Promise.resolve() : Promise.reject(),
                    message: messages['validator.invalidFormat'],
                  },
                ]}
                label={frl('category.group')}
                name='group'>
                <AppInput
                  className='category-code-input'
                  placeholder={messages['category.format']}
                  disabled={isUpdate}
                  autoFocus={!isUpdate}
                />
              </Form.Item>
              <Form.Item
                rules={[
                  {required: true, message: frm('category.code')},
                  {
                    validator: (r, v) =>
                      validateGroup(v) ? Promise.resolve() : Promise.reject(),
                    message: messages['validator.invalidFormat'],
                  },
                ]}
                label={frl('category.code')}
                name='code'>
                <AppInput
                  className='category-code-input'
                  disabled={isUpdate}
                  placeholder={messages['category.format']}
                />
              </Form.Item>
              <Form.Item
                rules={[{required: true, message: frm('common.usageLanguage')}]}
                label={frl('common.usageLanguage')}
                name='usageLanguage'>
                <Checkbox.Group className='w-100'>
                  <Row gutter={[16, 8]}>
                    {(localeConfig?.enabled || []).map((code) => (
                      <Col key={code} sm={12}>
                        <Checkbox value={code}>
                          <IntlMessages id={`locale.${code}`} />
                        </Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </Form.Item>
              {!!locales?.length && (
                <Form.Item>
                  <AppTab onChange={(k) => setTabKey(k)} activeKey={tabKey}>
                    {locales.map((code) => (
                      <AppTab.Pane
                        tab={<IntlMessages id={`locale.${code}`} />}
                        key={code}
                        forceRender>
                        <Form.Item
                          rules={[
                            {required: true, message: frm('category.name')},
                          ]}
                          label={frl('category.name')}
                          name={['names', code]}>
                          <AppInput />
                        </Form.Item>
                        <Form.Item
                          label={<IntlMessages id='common.description' />}
                          name={['descriptions', code]}>
                          <AppTextarea rows='6' />
                        </Form.Item>
                      </AppTab.Pane>
                    ))}
                  </AppTab>
                </Form.Item>
              )}
            </Col>
          </Row>
        </Form>
      )}
    </AppModal>
  );
};

export default memo(UpdateCategoryDialog);

UpdateCategoryDialog.propTypes = {
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  categoryDetail: PropTypes.object,
  duplicate: PropTypes.bool,
};

UpdateCategoryDialog.defaultProps = {};
