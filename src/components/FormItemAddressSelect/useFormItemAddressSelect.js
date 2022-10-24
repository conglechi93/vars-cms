import {Form, Select} from 'antd';
import {useEffect, useState} from 'react';
import capitalize from 'lodash/capitalize';
import {useIntl} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
import {onGetWard, onGetDistrict, onGetProvince} from 'redux/actions/Category';
import AppSelect from '@crema/core/AppSelect';

const TITLE_KEY = (locale) => `name${capitalize(locale)}`;
const VALUE_KEY = (_type) => 'fullCode';

export const useFormItemAddressSelect = (
  form,
  provinceObj,
  districtObj,
  wardObj,
) => {
  const intl = useIntl();
  const locale = intl.locale.substring(0, 2);
  const dispatch = useDispatch();
  const {Option} = Select;
  const {id: provinceId, ...provinceAttrs} = provinceObj;
  const {id: districtId, ...districtAttrs} = districtObj;
  const {id: wardId, ...wardAttrs} = wardObj;

  const {address} = useSelector(({category}) => category);
  const {
    province: provinceOpts,
    district: districtOpts,
    ward: wardOpts,
  } = address;

  const provinceWatch = Form.useWatch(provinceId, form);
  const districtWatch = Form.useWatch(districtId, form);

  const [provinceTouch, setProvinceTouch] = useState(false);
  const [districtTouch, setDistrictTouch] = useState(false);

  useEffect(() => {
    dispatch(onGetProvince());
  }, []);

  useEffect(() => {
    if (provinceWatch) dispatch(onGetDistrict(provinceWatch));
    if (provinceTouch)
      form.setFieldsValue({
        [districtId]: null,
      });
  }, [provinceWatch, provinceTouch]);

  useEffect(() => {
    if (districtWatch) dispatch(onGetWard(districtWatch));
    if (provinceTouch || districtTouch)
      form.setFieldsValue({
        [wardId]: null,
      });
  }, [districtWatch, districtTouch]);

  const buildOptions = (uniqueKey, options) =>
    options.map((item) => (
      <Option
        key={`${uniqueKey}${item[VALUE_KEY(locale)]}`}
        value={item[VALUE_KEY(locale)]}>
        {item[TITLE_KEY(locale)]}
      </Option>
    ));
  const provinceNode = (
    <Form.Item key={provinceId} name={provinceId} {...provinceAttrs}>
      <AppSelect
        onSelect={() => {
          setProvinceTouch(true);
        }}>
        {buildOptions('province', provinceOpts || [])}
      </AppSelect>
    </Form.Item>
  );

  const districtNode = (
    <Form.Item key={districtId} name={districtId} {...districtAttrs}>
      <AppSelect
        onSelect={() => {
          setDistrictTouch(true);
        }}>
        {buildOptions('district', districtOpts?.[provinceWatch] || [])}
      </AppSelect>
    </Form.Item>
  );

  const wardNode = (
    <Form.Item key={wardId} name={wardId} {...wardAttrs}>
      <AppSelect>
        {buildOptions('ward', wardOpts?.[districtWatch] || [])}
      </AppSelect>
    </Form.Item>
  );

  return {provinceNode, districtNode, wardNode};
};
