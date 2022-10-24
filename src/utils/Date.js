import moment from 'moment';
import {dateFormat} from 'shared/constants/AppConst';

const formatString = (dateObj) => {
  if (!dateObj) return '';
  const m = moment(dateObj);
  if (m.isValid()) {
    return m.format(dateFormat);
  }
  return '';
};

const Date = {formatString};
export default Date;
