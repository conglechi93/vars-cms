import {Form} from 'antd';
import PropTypes from 'prop-types';
import {dateFormat} from 'shared/constants/AppConst';
import {EnhancedDatePicker} from './EnhancedDatePicker';

export const FormItemDatePicker = ({formItemProps, datepickerProps}) => {
  return (
    <Form.Item
      {...formItemProps}
      getValueFromEvent={(_moment, dateString) => dateString}>
      <EnhancedDatePicker format={dateFormat} {...datepickerProps} />
    </Form.Item>
  );
};

FormItemDatePicker.propTypes = {
  formItemProps: PropTypes.object,
  datepickerProps: PropTypes.object,
};

FormItemDatePicker.defaultProps = {};
