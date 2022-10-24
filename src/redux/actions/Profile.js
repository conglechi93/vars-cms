import API from 'api/Request';
import {appIntl} from '@crema/utility/helper/Utils';
import {
    GET_USER_INFO_API,
    // RESET_PASSWORD_API,
    UPDATE_USER_INFO_API,
} from 'shared/constants/ApiUrls';
import {
  SHOW_MESSAGE,
  GET_USER_INFO_REQUEST,
  GET_PROFILE_DETAIL_SUCCESS,
  } from 'shared/constants/ActionTypes';
import {REQUEST_MUTED} from '@api/RequestEnum';
// import { CHANGE_PASSWORD_ROUTE } from 'pages/ProfileManagement/declareRoute';
// import {defaultPageOption} from 'shared/constants/AppConst';
// import {appIntl} from '@crema/utility/helper/Utils';

export const onGetUserInfo = () => {
    return (dispatch) => {
      dispatch({type: GET_USER_INFO_REQUEST});
      API.get(GET_USER_INFO_API, {REQUEST_MUTED})
        .then((userInfo) => {
          dispatch({type: GET_PROFILE_DETAIL_SUCCESS, payload: userInfo });
        })
        .catch((error) => {
          console.log("error",error);
        });
    };
  };

// export const onUpdateProfile = (req) => {
//   console.log(req);
//   return (dispatch) => {
//     API.put(UPDATE_USER_INFO_API, {req})
//       .then((res) => {
//         console.log("res",res);
//         console.log(dispatch);
//       })
//       .catch((error) => {
//         console.log("error",error);
//       });
//   };
// };

//
export const onUpdateProfile = ({phoneNumber,address,email,fullName,jobType,sex,tax}) => {
  const {messages} = appIntl();
  return (dispatch) => {
    console.log(phoneNumber,dispatch);
    API.post(UPDATE_USER_INFO_API, {phoneNumber,address,email,fullName,jobType,sex,tax})
      .then(() => {
        dispatch({type: SHOW_MESSAGE, payload: messages['common.successUpdate']});
      })
      .catch((error) => {
        console.log("error",error);
      });
  };
};


// export const onChangePassword = (oldPassword,newPassword) => {
//   //const data_req = {phoneNumber,email,fullName};
//   console.log(oldPassword, newPassword);
//   return (dispatch) => {
//     API.patch(RESET_PASSWORD_API, {oldPassword, newPassword})
//       .then((res) => {
//         po
//       })
//       .catch((error) => {
//         console.log("error",error);
//       });
//   };
// };


// export const onChangePassword = (oldPassword, newPassword) => {
//   const {messages} = appIntl();
//   return (dispatch) => {
//     API.post(RESET_PASSWORD_API, {oldPassword, newPassword}).then(() => {
//       dispatch({type: RESET_PASSWORD});
//       dispatch({type: SHOW_MESSAGE, payload: messages['common.successUpdate']});
//     });
//   };
// };


