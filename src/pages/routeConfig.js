import React from 'react';
import {AiOutlineIdcard} from '@react-icons/all-files/ai/AiOutlineIdcard';
import {
  AM_LIST_ROLE_ROUTE,
  AM_LIST_USER_ROUTE,
} from './AccountManagement/declareRoute';
import {LIST_APPLICATION_ROUTE} from './ApplicationManagement/declareRoute';
import {LIST_PERMISSION_ROUTE} from './PermissionManagement/declareRoute';
import {USER_PROFILE_ROUTE} from './ProfileManagement/declareRoute';

const routesConfig = [
  {
    id: 'applicationManagement',
    messageId: 'route.group.userManagement',
    type: 'group',
    children: [
      {
        id: USER_PROFILE_ROUTE,
        messageId: 'profile.information',
        type: 'item',
        //icon: <AiOutlineIdcard />,
        path: USER_PROFILE_ROUTE,
      },
    ],
  },

  {
    id: 'enterpriseManagement',
    messageId: 'route.group.enterpriseManagement',
    type: 'group',
    children: [
      {
        id: LIST_PERMISSION_ROUTE,
        messageId: 'common.register',
        type: 'item',
        //icon: <AiOutlineIdcard />,
        path: LIST_PERMISSION_ROUTE,
      },
    ],
  },
  // {
  //   id: 'applicationManagement',
  //   messageId: 'route.group.applicationManagement',
  //   type: 'group',
  //   children: [
  //     {
  //       id: LIST_APPLICATION_ROUTE,
  //       messageId: 'application.list',
  //       type: 'item',
  //       icon: <AiOutlineIdcard />,
  //       path: LIST_APPLICATION_ROUTE,
  //     },
  //   ],
  // },

  // {
  //   id: 'accountManagement',
  //   messageId: 'route.group.accountManagement',
  //   type: 'group',
  //   children: [
  //     {
  //       id: AM_LIST_USER_ROUTE,
  //       messageId: 'am.userList',
  //       type: 'item',
  //       icon: <AiOutlineIdcard />,
  //       path: AM_LIST_USER_ROUTE,
  //     },
  //     {
  //       id: AM_LIST_ROLE_ROUTE,
  //       messageId: 'am.roleList',
  //       type: 'item',
  //       icon: <AiOutlineIdcard />,
  //       path: AM_LIST_ROLE_ROUTE,
  //     },
  //   ],
  // },
  // {
  //   id: 'permissionManagement',
  //   messageId: 'route.group.permissionManagement',
  //   type: 'group',
  //   children: [
  //     {
  //       id: LIST_PERMISSION_ROUTE,
  //       messageId: 'permission.list',
  //       type: 'item',
  //       icon: <AiOutlineIdcard />,
  //       path: LIST_PERMISSION_ROUTE,
  //     },
  //   ],
  // },
];
export default routesConfig;
