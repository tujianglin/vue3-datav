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
  {
    url: '/api/project/group',
    method: 'get',
    response: () => {
      return Mock.mock({
        code: 200,
        message: 'ok',
        'data|1-3': [
          {
            'id|1-10000': 0,
            name: '@word',
            'children|1-3': [
              {
                'id|100-10000': 1,
                name: '@word',
                'share|0-1': '@url',
                groupId: 0,
                'thumbnail|0-1': '//files.pengxiaotian.com/datav/bj.png',
                config: {},
                createAt: '@datetime',
                updateAt: '@datetime',
              },
            ],
            'type|0-1': 1,
          },
        ],
      });
    },
  },
  {
    url: '/api/project/addGroup',
    method: 'post',
    response: ({ body }) => {
      console.log(body);
      return {
        code: 200,
        message: 'ok',
        'data|1-10000': 1,
      };
    },
  },
] as MockMethod[];
