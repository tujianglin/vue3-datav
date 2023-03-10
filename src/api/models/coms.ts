export const coms = [
  {
    id: 'Container_v5E6byFOl',
    name: 'VContainer',
    type: 'com',
    alias: '容器组件',
    locked: false,
    hided: false,
    selected: true,
    hovered: false,
    draged: false,
    renameing: false,
    tag: 0,
    scaling: { zoom: false, w: 700, h: 500, sx: 1, sy: 1 },
    attr: { x: 0, y: 0, w: 700, h: 500, deg: 0, opacity: 1, filpV: false, filpH: false },
    projectId: 0,
    config: {
      children: null,
      titleName: '',
      mainName: '',
      title: {
        w: 700,
        h: 200,
        wDisabled: false,
        hDisabled: false,
        margin: {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        },
        padding: {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        },
      },
      main: {
        w: 700,
        h: 300,
        wDisabled: false,
        hDisabled: false,
        margin: {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        },
        padding: {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        },
      },
    },
    apis: {
      source: {
        fields: {},
        description: '',
        useAutoUpdate: false,
        autoUpdate: 1,
        handler: 'render',
      },
    },
    apiData: {
      source: {
        id: '4I7aG8pxLX',
        type: 'static',
        pageFilters: [],
        config: { useFilter: false, data: '' },
        comId: 'Container_v5E6byFOl',
      },
    },
    events: {},
    actions: {},
  },
  // {
  //   id: 'Group_GvEp0qc9w',
  //   name: 'VGroup',
  //   type: 'layer',
  //   alias: '组',
  //   icon: 'group',
  //   img: 'undefined/com-thum/group-200-200.png',
  //   locked: false,
  //   hided: false,
  //   selected: true,
  //   hovered: false,
  //   renameing: false,
  //   tag: 0,
  //   fold: true,
  //   scaling: { zoom: false, w: 500, h: 380, sx: 1, sy: 1 },
  //   attr: {
  //     x: 100,
  //     y: 100,
  //     w: 500,
  //     h: 380,
  //     deg: 0,
  //     opacity: 1,
  //     filpV: false,
  //     filpH: false,
  //     apply3d: false,
  //     perspective: 500,
  //     perspectiveOrigin: { x: 50, y: 50 },
  //   },
  //   projectId: 0,
  //   children: [
  //     {
  //       id: 'VTitle_Wrw7xct_pA',
  //       name: 'VTitle',
  //       type: 'com',
  //       alias: '通用标题',
  //       icon: 'v-icon-title',
  //       img: '//files.pengxiaotian.com/com-thum/main-title-370-208.png',
  //       locked: false,
  //       hided: false,
  //       selected: false,
  //       hovered: false,
  //       renameing: false,
  //       tag: 0,
  //       scaling: { zoom: false, w: 300, h: 56, sx: 1, sy: 1 },
  //       attr: { x: 0, y: 0, w: 300, h: 56, deg: 0, opacity: 1, filpV: false, filpH: false },
  //       projectId: 0,
  //       config: {
  //         title: '我是标题数据',
  //         textStyle: { fontSize: 24, color: '#fff', fontWeight: 'normal' },
  //         textAlign: 'center',
  //         writingMode: 'horizontal-tb',
  //         letterSpacing: 0,
  //         backgroundStyle: {
  //           show: false,
  //           bgColor: '#008bff',
  //           borderRadius: 15,
  //           borderColor: '#fff',
  //           borderStyle: 'solid',
  //           borderWidth: 1,
  //         },
  //         ellipsis: false,
  //         urlConfig: { url: '', isBlank: false },
  //       },
  //       apis: {
  //         source: {
  //           fields: {
  //             title: { type: 'string', map: '', description: '标题值', optional: true },
  //             url: { type: 'string', map: '', description: '超链接', optional: true },
  //           },
  //           description: '',
  //           useAutoUpdate: false,
  //           autoUpdate: 1,
  //           handler: 'render',
  //         },
  //       },
  //       apiData: {
  //         source: {
  //           id: 'w9JNrebKim',
  //           type: 'static',
  //           pageFilters: [],
  //           config: { useFilter: false, data: '' },
  //           comId: 'MainTitle_Wrw7xct_pA',
  //         },
  //       },
  //       events: {},
  //       actions: {},
  //       parentId: 'Group_GvEp0qc9w',
  //     },
  //     {
  //       id: 'Bar_vet88wc4w',
  //       name: 'VBar',
  //       type: 'com',
  //       alias: '柱状图',
  //       img: 'http://localhost:3400/src/assets/datav/bar.png',
  //       locked: false,
  //       hided: false,
  //       selected: false,
  //       hovered: false,
  //       renameing: false,
  //       tag: 0,
  //       scaling: { zoom: false, w: 500, h: 300, sx: 1, sy: 1 },
  //       attr: { x: 0, y: 80, w: 500, h: 300, deg: 0, opacity: 1, filpV: false, filpH: false },
  //       projectId: 0,
  //       config: {
  //         echart: { margin: { top: 40, bottom: 50, left: 40, right: 20 } },
  //         xAxis: {
  //           show: true,
  //           type: 'category',
  //           data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  //         },
  //         yAxis: { type: 'value' },
  //         series: [
  //           {
  //             type: 'bar',
  //             id: '系列1_-mQ4C376TT',
  //             name: '系列1',
  //             color: { type: 'solid', value: '#00baff', from: '#fff', to: '#000' },
  //           },
  //         ],
  //       },
  //       apis: {
  //         source: {
  //           fields: {
  //             x: { type: 'string', map: '', description: '类目', optional: false },
  //             y: { type: 'string', map: '', description: '值', optional: false },
  //           },
  //           description: '',
  //           useAutoUpdate: false,
  //           autoUpdate: 1,
  //           handler: 'render',
  //         },
  //       },
  //       apiData: {
  //         source: {
  //           id: 'Qv7M5FAUE_',
  //           type: 'static',
  //           pageFilters: [],
  //           config: {
  //             useFilter: false,
  //             data: '[{"x":"上海","y":23},{"x":"深圳","y":13},{"x":"合肥","y":2},{"x":"成都","y":9},{"x":"安徽","y":5},{"x":"北京","y":10},{"x":"杭州","y":14},{"x":"长沙","y":24}]',
  //           },
  //           comId: 'Bar_vet88wc4w',
  //         },
  //       },
  //       events: {},
  //       actions: {},
  //       parentId: 'Group_GvEp0qc9w',
  //     },
  //   ],
  //   config: [
  //     {
  //       transform3d: {
  //         id: 'VTitle_Wrw7xct_pA',
  //         rotate3d: { axis: 'y', deg: 30 },
  //         scale3d: { x: 1, y: 1, lock: false },
  //         translate3d: { x: 0, y: 0, z: 0 },
  //       },
  //     },
  //     {
  //       transform3d: {
  //         id: 'Bar_vet88wc4w',
  //         rotate3d: { axis: 'y', deg: 30 },
  //         scale3d: { x: 1, y: 1, lock: false },
  //         translate3d: { x: 0, y: 0, z: 0 },
  //       },
  //     },
  //   ],
  // },
];
