// AUTH
export const LOGIN_BY_PASSWORD_API = '/sso-module/api/auth/login';
export const LOGIN_REQUEST_OTP_API = '/sso-module/api/auth/login/phone';
export const LOGIN_CONFIRM_OTP_API = '/sso-module/api/auth/verifyOTP';
export const SIGNUP_REQUEST_OTP_API = '/sso-module/api/auth/register/phone/request';
export const SIGNUP_CONFIRM_OTP_API = '/sso-module/api/auth/register/phone/verify';
export const SIGNUP_CONFIRM_PHONE_API = '/sso-module/api/auth/register/oauth/request';
export const RESET_PASSWORD_API = '/auth/updatePassword';
export const CHAGE_PASSWORD_API = '/sso-module/api/auth/password/change';
export const FORGET_PASSWORD_REQUEST_OTP_API = '/sso-module/api/auth/password/forget';
export const FORGET_PASSWORD_CONFIRM_OTP_API = '/auth/resetPassword';
export const LOGOUT_API = '/sso-module/api/auth/logoutAll';
export const LOGIN_GOOGLE_API = '/sso-module/api/auth/login/google';
export const LOGIN_FACEBOOK_API = '/sso-module/api/auth/login/facebook';
export const REGISTER_GOOGLE_API = '/auth/register/google';
export const REQUEST_PHONE_OAUTH_API = '/sso-module/api/auth/register/oauth/request';
export const VERIFY_PHONE_OAUTH_API = '/sso-module/api/auth/register/oauth/verify';
export const REGISTER_FACEBOOK_API = '/auth/register/facebook';
export const VERIFY_FACEBOOK_API = '/auth/verifyEmailFacebook';
export const REQUEST_OTAC_API = '/sso-module/api/auth/requestOTAC';

export const OTP_REQUEST_API='/otp/request'
export const OTP_VERIFY_API='/otp/verify'

// PROFILE
export const GET_USER_INFO_API = '/sso-module/api/auth/userInfo';
export const UPDATE_USER_INFO_API = '/sso-module/api/auth/user/update';


// CATEGORY
export const ADDRESS_LIST_API = '/category/view/addressList';
export const GET_CATEGORY_GROUP_API =
  '/sso-module/api/category/view/getCategoryGroup';
export const GET_LIST_CATEGORY_API =
  '/sso-module/api/category/view/getListCategory';
export const GET_DETAIL_CATEGORY_API =
  '/sso-module/api/category/view/getCategory/';
export const CREATE_CATEGORY_API =
  '/sso-module/api/category/edit/createCategory';
export const UPDATE_CATEGORY_API =
  '/sso-module/api/category/edit/updateCategory';
export const DELETE_CATEGORY_API =
  '/sso-module/api/category/edit/deleteCategory';

// PERMISISON
export const GET_ASSIGNABLE_PERMISSION_API =
  '/sso-module/api/permission/view/getAssignablePermission';
export const GET_LIST_PERMISSION_API =
  '/sso-module/api/permission/view/getListPermission';
export const GET_DETAIL_PERMISSION_API =
  '/sso-module/api/permission/view/getPermission/';
export const CREATE_PERMISSION_API =
  '/sso-module/api/permission/edit/createPermission';
export const UPDATE_PERMISSION_API =
  '/sso-module/api/permission/edit/updatePermission';
export const DELETE_PERMISSION_API =
  '/sso-module/api/permission/edit/deletePermission';

// AM ROLE
export const GET_LIST_ROLE_API = '/sso-module/api/role/view/getListRole';
export const GET_DETAIL_ROLE_API = '/sso-module/api/role/view/getRole/';
export const CREATE_ROLE_API = '/sso-module/api/role/edit/createRole';
export const UPDATE_ROLE_API = '/sso-module/api/role/edit/updateRole';
export const ASSIGN_ROLE_API = '/sso-module/api/role/edit/assignRoles';

// AM USER
export const GET_LIST_USER_API = '/sso-module/api/auth/view/getListUser';
export const CREATE_USER_API = '/sso-module/api/auth/createUser';
export const GET_DETAIL_USER_API = '/sso-module/api/auth/getUser';

// ADMIN APPLICATION
export const GET_LIST_APPLICATION_API =
  '/sso-module/api/app/view/getListApplication';
export const CREATE_APPLICATION_API =
  '/sso-module/api/app/edit/createApplication';
export const UPDATE_APPLICATION_API =
  '/sso-module/api/app/edit/updateApplication';
export const GET_DETAIL_APPLICATION_API =
  '/sso-module/api/app/view/getApplication';
export const ADD_CLIENT_API = '/sso-module/api/app/edit/createClient';
export const DELETE_CLIENT_API = '/sso-module/api/app/edit/deleteClient';
export const GET_USER_APP_API = '/sso-module/api/app/view/getUserApplication';
export const VALIDATING_CLIENT = '/sso-module/api/app/view/validateClient';

// USER APPLICATION
export const GET_MANAGABLE_APPLICATION_API =
  '/sso-module/api/app/view/getManageableApp';

// SECURITY
export const CLIENT_SECURITY_CHECK = '/sso-module/api/auth/checkClientId';

// HELPER

export const GET_CAPTCHA = 'https://192.168.1.26:8543/vcaptcha/captcha/generate';
export const CHECK_CAPTCHA = 'https://192.168.1.26:8543/vcaptcha/captcha/validate';


// GET CATEGORY 

export const GET_GENDER_CATEGORY = 'https://192.168.1.26:8543/vcat/categories/code/gender';
export const GET_JOB_TYPE_CATEGORY = 'https://192.168.1.26:8543/vcat/categories/code/jobType';

