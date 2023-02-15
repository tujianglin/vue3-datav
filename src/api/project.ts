import { defHttp } from '../utils/http';

export const getProject = () => {
  return defHttp.get({
    url: '/project/group',
  });
};

export const postProject = (data) => {
  return defHttp.post({
    url: '/project/addGroup',
    data,
  });
};

export const delProject = (params) => {
  return defHttp.delete({
    url: '/project/delGroup',
    params,
  });
};
