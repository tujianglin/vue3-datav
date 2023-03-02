import { defHttp } from '/@/utils/http';
import { LoginModel } from './models/user';

export const login = (params) => {
  return defHttp.post<LoginModel>(
    {
      url: '/blade-auth/oauth/token',
      params: {
        ...params,
        grant_type: 'password',
        scope: 'all',
        type: 'account',
        tenantId: '000000',
      },
      headers: {
        'Tenant-Id': '000000',
      },
    },
    {
      isReturnOneResponse: true,
    },
  );
};

export const refreshToken = (refresh_token) => {
  return defHttp.post({
    url: '/blade-auth/oauth/token',
    params: {
      grant_type: 'refresh_token',
      refresh_token,
      tenantId: '000000',
    },
    headers: {
      'Tenant-Id': '000000',
    },
  });
};
