import { MockMethod } from 'vite-plugin-mock';
// import Mock from 'mockjs';
const provinces = [
  '北京市',
  '天津市',
  '上海市',
  '重庆市',
  '河北省',
  '河南省',
  '云南省',
  '辽宁省',
  '黑龙江省',
  '湖南省',
  '安徽省',
  '山东省',
  '江苏省',
  '浙江省',
  '江西省',
  '湖北省',
  '甘肃省',
  '山西省',
  '陕西省',
  '吉林省',
  '福建省',
  '贵州省',
  '广东省',
  '青海省',
  '四川省',
  '海南省',
  '台湾省',
  '西藏自治区',
  '内蒙古自治区',
  '宁夏回族自治区',
  '广西壮族自治区',
  '新疆维吾尔自治区',
  '香港特别行政区',
  '澳门特别行政区',
];
export default [
  {
    url: '/api/getData',
    method: 'get',
    response: () => {
      const data = provinces.map((i) => ({ name: i, value: Math.ceil(Math.random() * 100) }));
      data.sort((a, b) => a.value - b.value);
      return {
        code: 200,
        data,
      };
    },
  },
] as MockMethod[];
