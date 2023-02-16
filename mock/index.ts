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
            edit: false,
          },
        ],
      });
    },
  },
  {
    url: '/api/project/addGroup',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        'data|1-10000': 1,
      };
    },
  },
  {
    url: '/api/project/delGroup',
    method: 'delete',
    response: ({ query }) => {
      return {
        code: 200,
        message: 'ok',
        data: query.id,
      };
    },
  },
  {
    url: '/api/template/project',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: [
          {
            id: 1,
            name: '全部组件示例',
            description: '',
            size: ['比例 16:9', '1920x1080px'],
            snapshot: '//files.pengxiaotian.com/datav/datav-vue-logo.png',
            thumbnail: '//files.pengxiaotian.com/datav/datav-vue-logo.png',
            config: {},
          },
          {
            id: 2,
            name: '数字看板',
            description: '常规的数字看板，可直接套用于各个行业日常关键业务指标KPI的监控展示',
            size: ['比例 16:9', '1920x1080px'],
            snapshot: '//img.alicdn.com/tfs/TB1vRyCQFXXXXXVXFXXXXXXXXXX-1440-1080.jpg',
            thumbnail: '//img.alicdn.com/tfs/TB1vRyCQFXXXXXVXFXXXXXXXXXX-1440-1080.jpg',
            config: {},
          },
        ],
      };
    },
  },
] as MockMethod[];
