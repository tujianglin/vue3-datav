import { defHttp } from '/@/utils/http';

export const getSysTemplates = () => {
  return defHttp.get({
    url: '/template/project',
  });
};
