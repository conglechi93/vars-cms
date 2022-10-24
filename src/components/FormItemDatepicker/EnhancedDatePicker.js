import {DatePicker} from 'antd';
import moment, {isMoment} from 'moment';
import {useEffect, useState} from 'react';
import {dateFormat} from 'shared/constants/AppConst';
import isString from 'lodash/isString';
import PropTypes from 'prop-types';

const DATE_FORMAT = dateFormat;

export const EnhancedDatePicker = (props) => {
  // Support string
  const {value} = props;

  // Moment value
  const [innerValue, setInnerValue] = useState(null);

  useEffect(() => {
    if (!value) {
      setInnerValue(null);
      return;
    }
    if (isMoment(value)) {
      setInnerValue(value);
      return;
    }
    if (isString(value)) {
      const parse = moment(value, DATE_FORMAT);
      if (parse.isValid()) setInnerValue(parse);
      else setInnerValue(null);
    }
  }, [value]);

  const datepickerProps = {
    format: DATE_FORMAT,
    ...props,
    value: innerValue,
  };
  return <DatePicker {...datepickerProps} />;
};

EnhancedDatePicker.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(moment)]),
};
EnhancedDatePicker.defaultProps = {};
