import { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';
export default [
  {
    url: '/api/user/login',
    method: 'get',
    response: () => {
      return Mock.mock({
        code: 200,
        message: 'ok',
        'data|30': '',
      });
    },
  },
] as MockMethod[];
