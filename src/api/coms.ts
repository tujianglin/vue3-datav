import { defHttp } from '/@/utils/http';

export const getComs = (projectId) => {
  return defHttp.get({
    url: '/coms',
    params: {
      projectId,
    },
  });
};
