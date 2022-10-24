import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import Settings from './Setting';
import Common from './Common';
import Auth from './Auth';
import Category from './Category';
import Permission from './Permission';
import View from './View';
import SSO from './SSO';
import AMUser from './AMUser';
import AMRole from './AMRole';
import AdminApplication from './AdminApplication';
import UserApplication from './UserApplication';
import Profile from './Profile';
import OTP from './OTP';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'default',
  storage,
  blacklist: ['loading'],
};

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['OTPTimeout', 'waitOTPConfirm', 'waitFbEmailConfirm', 'profile'],
};

const categoryPersistConfig = {
  key: 'category',
  storage,
  blacklist: ['address'],
};

const ssoPersistConfig = {
  key: 'sso',
  storage,
  whitelist: ['settings'],
};

const reducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    settings: persistReducer(persistConfig, Settings),
    common: persistReducer(persistConfig, Common),
    auth: persistReducer(authPersistConfig, Auth),
    category: persistReducer(categoryPersistConfig, Category),
    view: View,
    sso: persistReducer(ssoPersistConfig, SSO),
    amUser: AMUser,
    amRole: AMRole,
    adminApplication: AdminApplication,
    userApplication: UserApplication,
    permission: Permission,
    profile:Profile,
    otp: OTP
  });
export default reducers;
