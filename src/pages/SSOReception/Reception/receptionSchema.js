import * as yup from 'yup';

const ReceptionSchema = yup.object().shape({
  appCode: yup.string().strict().required(),
  clientId: yup.string().strict().required(),
  mode: yup.string().oneOf(['window', 'redirect']).required(),
  action: yup.string().oneOf(['loginDefault']).required(),
  redirectTo: yup
    .string()
    .nullable()
    .when('mode', {
      is: (mode) => mode == 'redirect',
      then: yup.string().strict().required(),
    }),
});

export default ReceptionSchema;
