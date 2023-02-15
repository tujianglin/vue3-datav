import { defHttp } from '../utils/http';

export const getProject = () => {
  return defHttp.get({
    url: '/project/group',
  });
};
