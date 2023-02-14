import { defHttp } from '/@/utils/http';

export const getMapData = (code = 100000) => {
  return fetch(`https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=${code}_full`)
    .then((res) => res.json())
    .then((res) => res);
};

export const getData = () => {
  return defHttp.get({
    url: '/getData',
  });
};
