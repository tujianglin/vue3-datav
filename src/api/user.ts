import { defHttp } from '../utils/http';

export const login = (params) => {
  return defHttp.get({
    url: '/user/login',
    params,
  });
};
