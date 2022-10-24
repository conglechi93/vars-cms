import IntlMessages from '@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';

const requiredSourceId = 'validator.required';

export default function useFormMessage() {
  const intl = useIntl();

  const formatRequiredMessageId = (labelId) => {
    const label = intl.messages[labelId];
    return intl.formatMessage({id: requiredSourceId}, {label});
  };

  const formatRequiredPlaceholderId = (labelId) => {
    return intl.formatMessage({id: labelId}) + '*';
  };

  const formatRequiredLabelId = (labelId) => {
    return (
      <span>
        <IntlMessages id={labelId} />
        <span className='text-red text-height-1'>*</span>
      </span>
    );
  };

  return {
    formatRequiredMessageId,
    formatRequiredPlaceholderId,
    formatRequiredLabelId,
  };
}
