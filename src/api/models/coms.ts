export const coms = [
  {
    id: 'MainTitle_Wrw7xct_pA',
    name: 'VMainTitle',
    type: 'com',
    alias: '通用标题',
    icon: 'v-icon-title',
    img: '//files.pengxiaotian.com/com-thum/main-title-370-208.png',
    locked: false,
    hided: false,
    selected: false,
    hovered: false,
    renameing: false,
    tag: 0,
    scaling: { zoom: false, w: 300, h: 56, sx: 1, sy: 1 },
    attr: { x: 561, y: 973, w: 300, h: 56, deg: 0, opacity: 1, filpV: false, filpH: false },
    projectId: 0,
    config: {
      title: '我是标题数据',
      textStyle: {
        fontFamily: 'Microsoft Yahei',
        fontSize: 24,
        color: '#fff',
        fontWeight: 'normal',
      },
      textAlign: 'center',
      writingMode: 'horizontal-tb',
      letterSpacing: 0,
      backgroundStyle: {
        show: false,
        bgColor: '#008bff',
        borderRadius: 15,
        borderColor: '#fff',
        borderStyle: 'solid',
        borderWidth: 1,
      },
      ellipsis: false,
      urlConfig: { url: '', isBlank: false },
    },
    apis: {
      source: {
        fields: {
          title: { type: 'string', map: '', description: '标题值', optional: true },
          url: { type: 'string', map: '', description: '超链接', optional: true },
        },
        description: '',
        useAutoUpdate: false,
        autoUpdate: 1,
        handler: 'render',
      },
    },
    apiData: {
      source: {
        id: 'w9JNrebKim',
        type: 'static',
        pageFilters: [],
        config: { useFilter: false, data: '' },
        comId: 'MainTitle_Wrw7xct_pA',
      },
    },
    events: {},
    actions: {},
  },
  {
    id: 'NumberTitleFlop_SvIgAAd_9G',
    name: 'VNumberTitleFlop',
    type: 'com',
    alias: '数字翻牌器',
    icon: 'v-icon-title',
    img: '//files.pengxiaotian.com/com-thum/number-title-flop-370-208.png',
    locked: false,
    hided: false,
    selected: false,
    hovered: false,
    renameing: false,
    tag: 0,
    scaling: { zoom: false, w: 350, h: 64, sx: 1, sy: 1 },
    attr: { x: 1505, y: 145, w: 350, h: 64, deg: 0, opacity: 1, filpV: false, filpH: false },
    projectId: 0,
    config: {
      global: { fontFamily: 'Microsoft Yahei', arrangement: 'top', distance: 0 },
      title: {
        content: 'Typesomething',
        textStyle: {
          fontSize: 18,
          color: '#79daff',
          fontWeight: 'normal',
          textAlign: 'flex-start',
        },
      },
      counter: {
        fontFamily: 'Microsoft Yahei',
        justifyContent: 'flex-start',
        margin: { preNum: 0, numSuff: 0 },
        prefix: {
          content: '￥',
          textStyle: { fontSize: 36, color: '#0a73ff', fontWeight: 'bolder' },
        },
        suffix: { content: '', textStyle: { fontSize: 30, color: '#fff', fontWeight: 'bolder' } },
      },
      numbers: {
        textStyle: { fontSize: 36, color: '#0a73ff', fontWeight: 'bolder' },
        marginRight: 0,
        bgColor: 'rgba(51,51,51,0)',
        bgRadius: 6,
        bgSeparating: false,
        digit: 0,
        decimal: 0,
        divisor: 0,
        separatingChart: true,
        separatingSymbol: ',',
        decimalSymbol: '.',
        fixedWidth: 0,
        increment: true,
        animation: true,
        sameDataFlip: false,
        duration: 1000,
      },
    },
    apis: {
      source: {
        fields: {
          title: { type: 'string', map: '', description: '标题', optional: true },
          value: { type: 'string', map: '', description: '翻牌器数值', optional: false },
          prefix: { type: 'string', map: '', description: '翻牌器前缀', optional: true },
          suffix: { type: 'string', map: '', description: '翻牌器后缀', optional: true },
        },
        description: '',
        useAutoUpdate: false,
        autoUpdate: 1,
        handler: 'render',
      },
    },
    apiData: {
      source: {
        id: '-ghGQm4h7E',
        type: 'static',
        pageFilters: [],
        config: { useFilter: false, data: '' },
        comId: 'NumberTitleFlop_SvIgAAd_9G',
      },
    },
    events: {},
    actions: {},
  },
  {
    id: 'DatePicker_S-N03aBG-',
    name: 'VDatePicker',
    type: 'com',
    alias: '日期选择器',
    icon: 'v-icon-other',
    img: '//files.pengxiaotian.com/com-thum/time-selector.jpg',
    locked: false,
    hided: false,
    selected: false,
    hovered: false,
    renameing: false,
    tag: 0,
    scaling: { zoom: false, w: 250, h: 50, sx: 1, sy: 1 },
    attr: { x: 236, y: 219, w: 250, h: 50, deg: 0, opacity: 1, filpV: false, filpH: false },
    projectId: 0,
    config: {
      global: { date: '2021-07-01', fontFamily: 'Microsoft Yahei' },
      input: {
        size: { width: 180, height: 30 },
        border: { width: 1, color: '#ccc', radius: 0 },
        bgColor: '#01becc',
        fontSize: 18,
        fontColor: '#fff',
        separator: '-',
        pos: 'left',
      },
      calendar: {
        fontSize: 14,
        fontColor: '#fff',
        bgColor: '#126973',
        selectBGColor: '#01becc',
        border: { width: 1, color: '#ccc', radius: 5 },
        paddingBorder: { width: 1, color: '#ccc', padding: 6 },
        select: { time: 2, today: 4 },
      },
    },
    apis: {
      source: {
        fields: { date: { type: 'string', map: '', description: '默认日期', optional: true } },
        description: '',
        useAutoUpdate: false,
        autoUpdate: 1,
        handler: 'render',
      },
    },
    apiData: {
      source: {
        id: 'RIXswMSrbY',
        type: 'static',
        pageFilters: [],
        config: { useFilter: false, data: '' },
        comId: 'DatePicker_S-N03aBG-',
      },
    },
    events: {
      changed: {
        description: '当日期变化时',
        fields: { date: { type: 'string', map: '', description: '默认日期', optional: true } },
      },
    },
    actions: {},
  },
  {
    id: 'BgBox_zc0voppBa2',
    name: 'VBgBox',
    type: 'com',
    alias: '自定义背景块',
    icon: 'v-icon-material',
    img: '//files.pengxiaotian.com/com-thum/bg-box-370-208.png',
    locked: false,
    hided: false,
    selected: false,
    hovered: false,
    renameing: false,
    tag: 0,
    scaling: { zoom: false, w: 300, h: 180, sx: 1, sy: 1 },
    attr: { x: 763, y: 183, w: 300, h: 180, deg: 0, opacity: 1, filpV: false, filpH: false },
    projectId: 0,
    config: {
      borderRadius: 0,
      fills: [{ fill: '#003a8c', opacity: 10 }],
      border: {
        show: true,
        type: 'flat',
        flat: { width: 1, style: 'solid', color: '#008bff' },
        linearGradient: {
          width: 2,
          color: {
            angle: 135,
            stops: [
              { offset: 0, color: '#00DEFF' },
              { offset: 100, color: '#008BFF' },
            ],
          },
        },
        imageType: 'preset',
        presetImage: 'box38',
        customImage: {
          source: 'https://files.pengxiaotian.com/datav/custom-bg-border.png',
          slice: '32 37 fill',
          width: '32px 37px',
          outset: '0',
          repeat: 'no-repeat',
        },
      },
      filter: { blur: '0px' },
      backdropFilter: { blur: '0px' },
      urlConfig: { url: '', ifBlank: false },
    },
    apis: {},
    apiData: {},
    events: {},
    actions: {},
  },
  {
    id: 'BorderBox_FrMhk50JV9',
    name: 'VBorderBox',
    type: 'com',
    alias: '边框',
    icon: 'v-icon-material',
    img: '//files.pengxiaotian.com/com-thum/border-box-370-208.png',
    locked: false,
    hided: false,
    selected: false,
    hovered: false,
    renameing: false,
    tag: 0,
    scaling: { zoom: false, w: 300, h: 180, sx: 1, sy: 1 },
    attr: { x: 642, y: 75, w: 300, h: 180, deg: 0, opacity: 1, filpV: false, filpH: false },
    projectId: 0,
    config: { boxStyle: { style: 'box15' } },
    apis: {},
    apiData: {},
    events: {},
    actions: {},
  },
  {
    id: 'Decoration_YEOTokTGzN',
    name: 'VDecoration',
    type: 'com',
    alias: '装饰',
    icon: 'v-icon-material',
    img: '//files.pengxiaotian.com/com-thum/decoration-370-208.png',
    locked: false,
    hided: false,
    selected: false,
    hovered: false,
    renameing: false,
    tag: 0,
    scaling: { zoom: false, w: 200, h: 200, sx: 1, sy: 1 },
    attr: { x: 483, y: 10, w: 200, h: 200, deg: 0, opacity: 1, filpV: false, filpH: false },
    projectId: 0,
    config: { global: { img: 'gif1', opacity: 1 } },
    apis: {},
    apiData: {},
    events: {},
    actions: {},
  },
  {
    id: 'BasicBar_AtYdxP83MyP',
    name: 'VBasicBar',
    type: 'com',
    alias: '柱状图',
    icon: 'v-icon-chart-bar',
    img: '//files.pengxiaotian.com/com-thum/basic-bar-368-208.png',
    locked: false,
    hided: false,
    selected: false,
    hovered: false,
    renameing: false,
    tag: 0,
    scaling: { zoom: false, w: 500, h: 300, sx: 1, sy: 1 },
    attr: { x: 1279, y: 13, w: 500, h: 300, deg: 0, opacity: 1, filpV: false, filpH: false },
    projectId: 0,
    config: {
      global: {
        fontFamily: 'Microsoft Yahei',
        margin: { top: 40, bottom: 50, left: 50, right: 10 },
        innerPadding: 20,
        outerPadding: 30,
        barWidth: 'auto',
        background: { show: true, color: 'rgba(255, 255, 255, 0.1)' },
      },
      label: {
        show: false,
        position: 'top',
        textStyle: { fontSize: 12, color: 'rgba(255, 255, 255, 0.6)', fontWeight: 'normal' },
        offsetX: 0,
        offsetY: 0,
      },
      xAxis: {
        show: true,
        type: 'category',
        boundaryGap: true,
        title: {
          show: true,
          name: 'X轴',
          location: 'center',
          display: { rotate: 0, offset: 20 },
          textStyle: { fontSize: 12, color: '#90a0ae', fontWeight: 'normal' },
        },
        axisLine: { show: true, type: 'solid', width: 1, color: 'rgba(255, 255, 255, 0.5)' },
        axisTick: { show: true, type: 'solid', width: 1, color: 'rgba(255, 255, 255, 0.5)' },
        axisLabel: {
          show: true,
          valueFormat: 'd',
          timeFormat: 'MM/DD',
          interval: 'auto',
          display: { rotate: 0, margin: 10 },
          align: 'center',
          textStyle: { fontSize: 12, color: 'rgba(255, 255, 255, 0.6)', fontWeight: 'normal' },
        },
        grid: {
          show: true,
          line: {
            type: 'dashed',
            width: 1,
            color: 'rgba(233, 228, 228, 0.1)',
            dashedLength: 4,
            dashedSpace: 4,
          },
        },
      },
      yAxis: {
        show: true,
        extent: { min: 'auto', max: 'auto' },
        splitNumber: 0,
        title: {
          show: false,
          name: 'Y轴',
          location: 'center',
          display: { rotate: 90, offset: 20 },
          textStyle: { fontSize: 12, color: '#90a0ae', fontWeight: 'normal' },
        },
        axisLine: { show: true, type: 'solid', width: 1, color: 'rgba(255, 255, 255, 0.5)' },
        axisTick: { show: true, type: 'solid', width: 1, color: 'rgba(255, 255, 255, 0.5)' },
        axisLabel: {
          show: true,
          valueFormat: 'auto',
          boundaryGap: 0,
          display: { rotate: 0, margin: 8 },
          align: 'right',
          textStyle: { fontSize: 12, color: 'rgba(255, 255, 255, 0.6)', fontWeight: 'normal' },
        },
        grid: {
          show: true,
          line: {
            type: 'dashed',
            width: 1,
            color: 'rgba(233, 228, 228, 0.1)',
            dashedLength: 4,
            dashedSpace: 4,
          },
        },
      },
      tooltip: {
        show: true,
        textStyle: { fontSize: 14, color: '#fff', fontWeight: 'normal' },
        background: { padding: { h: 5, v: 5 }, color: 'rgba(0, 0, 0, 0.65)' },
        pointer: {
          show: true,
          line: { type: 'dashed', width: 1, color: '#f5dc69', dashedLength: 4, dashedSpace: 4 },
        },
      },
      legend: {
        show: true,
        position: 'top-center',
        orient: 'horizontal',
        textStyle: { fontSize: 12, color: '#90a0ae', fontWeight: 'normal' },
        symbol: { show: true, icon: 'auto', width: 25, height: 14, gap: 10 },
        page: {
          enabled: false,
          size: { width: 100, height: 100 },
          button: { size: 15, color: '#000', inactiveColor: '#000' },
          pageNumColor: '#90a0ae',
        },
      },
      series: [
        {
          type: 'bar',
          id: '系列1_OzKq0z629Ck',
          name: '系列1',
          color: { type: 'solid', value: '#00baff', from: '#fff', to: '#000' },
        },
      ],
      animation: { enabled: true, duration: 1000, easing: 'cubicOut', delay: 0 },
    },
    apis: {
      source: {
        fields: {
          x: { type: 'string', map: '', description: '类目', optional: false },
          y: { type: 'string', map: '', description: '值', optional: false },
        },
        description: '基本柱状图接口',
        useAutoUpdate: false,
        autoUpdate: 1,
        handler: 'render',
      },
    },
    apiData: {
      source: {
        id: '3nVJ75n4JT_',
        type: 'static',
        pageFilters: [],
        config: { useFilter: false, data: '' },
        comId: 'BasicBar_AtYdxP83MyP',
      },
    },
    events: {
      click: {
        description: '当点击数据项时',
        fields: {
          x: { type: 'string', map: '', description: '类目', optional: false },
          y: { type: 'string', map: '', description: '值', optional: false },
        },
      },
    },
    actions: {},
  },
  {
    id: 'Marquee_y8kbi4f2iK',
    name: 'VMarquee',
    type: 'com',
    alias: '跑马灯',
    icon: 'v-icon-title',
    img: '//files.pengxiaotian.com/com-thum/marquee-370-208.png',
    locked: false,
    hided: false,
    selected: false,
    hovered: false,
    renameing: false,
    tag: 0,
    scaling: { zoom: false, w: 300, h: 56, sx: 1, sy: 1 },
    attr: { x: 176, y: 883, w: 300, h: 56, deg: 0, opacity: 1, filpV: false, filpH: false },
    projectId: 0,
    config: {
      textStyle: {
        fontFamily: 'Microsoft Yahei',
        fontSize: 18,
        color: '#fff',
        fontWeight: 'normal',
      },
      loop: true,
      ifSpeed: false,
      duration: 8000,
      speed: 1000,
      timeout: 1000,
    },
    apis: {
      source: {
        fields: { value: { type: 'string', map: '', description: '值', optional: false } },
        description: '跑马灯接口',
        useAutoUpdate: false,
        autoUpdate: 1,
        handler: 'render',
      },
    },
    apiData: {
      source: {
        id: 'B3kpYhG_LL',
        type: 'static',
        pageFilters: [],
        config: { useFilter: false, data: '' },
        comId: 'Marquee_y8kbi4f2iK',
      },
    },
    events: {},
    actions: {},
  },
  {
    id: 'Paragraph_4KpKj1cfkp',
    name: 'VParagraph',
    type: 'com',
    alias: '多行文本',
    icon: 'v-icon-title',
    img: '//files.pengxiaotian.com/com-thum/paragraph-370-208.png',
    locked: false,
    hided: false,
    selected: false,
    hovered: false,
    renameing: false,
    tag: 0,
    scaling: { zoom: false, w: 300, h: 180, sx: 1, sy: 1 },
    attr: { x: 1481, y: 171, w: 300, h: 180, deg: 0, opacity: 1, filpV: false, filpH: false },
    projectId: 0,
    config: {
      content:
        'DataV 提供运营动态直播、数据综合展示、设备监控预警等多种场景模板，稍加修改就能够直接服务于您的可视化需求。通过拖拽即可实现灵活的可视化布局，在模板的基础上任何人都能够发挥创意，实现您自己的可视化应用。支持阿里云分析数据库、关系型数据库、Restful API、CSV、静态JSON等多种数据来源，且能够动态轮询。能够实现多个数据源汇聚于一个可视化界面中',
      textStyle: {
        fontFamily: 'Microsoft Yahei',
        fontSize: 16,
        color: '#fff',
        fontWeight: 'normal',
      },
      scroll: { duration: 5000, overScroll: false },
      lineHeight: 36,
      textAlign: 'left',
      textIndent: 32,
    },
    apis: {
      source: {
        fields: { value: { type: 'string', map: '', description: '值', optional: false } },
        description: '多行文本接口',
        useAutoUpdate: false,
        autoUpdate: 1,
        handler: 'render',
      },
    },
    apiData: {
      source: {
        id: 'AbX8rG0Xh1',
        type: 'static',
        pageFilters: [],
        config: { useFilter: false, data: '' },
        comId: 'Paragraph_4KpKj1cfkp',
      },
    },
    events: {},
    actions: {},
  },
  {
    id: 'Timer_54Els9N1nx',
    name: 'VTimer',
    type: 'com',
    alias: '时间器',
    icon: 'v-icon-title',
    img: '//files.pengxiaotian.com/com-thum/timer-370-208.png',
    locked: false,
    hided: false,
    selected: false,
    hovered: false,
    renameing: false,
    tag: 0,
    scaling: { zoom: false, w: 300, h: 56, sx: 1, sy: 1 },
    attr: { x: 339, y: 1021, w: 300, h: 56, deg: 0, opacity: 1, filpV: false, filpH: false },
    projectId: 0,
    config: {
      iconStyle: { show: true, size: 1.2, color: 'rgba(93,245,244,1)', marginRight: 6 },
      time: {
        textStyle: {
          fontFamily: 'Microsoft Yahei',
          fontSize: 18,
          color: '#fff',
          fontWeight: 'normal',
        },
        format: 'YYYY-MM-DD HH:mm:ss',
        duration: 1000,
        horizontal: 'center',
        vertical: 'center',
      },
    },
    apis: {},
    apiData: {},
    events: {},
    actions: {},
  },
  {
    id: 'FullScreen_OnZLWYpEtTg',
    name: 'VFullScreen',
    type: 'com',
    alias: '全屏切换',
    icon: 'v-icon-interact',
    img: '//files.pengxiaotian.com/com-thum/full-screen-368-208.png',
    locked: false,
    hided: false,
    selected: false,
    hovered: false,
    renameing: false,
    tag: 0,
    scaling: { zoom: false, w: 200, h: 200, sx: 1, sy: 1 },
    attr: { x: 1086, y: 848, w: 200, h: 200, deg: 0, opacity: 1, filpV: false, filpH: false },
    projectId: 0,
    config: {
      request: 'https://files.pengxiaotian.com/datav/fsrequest.png',
      exit: 'https://files.pengxiaotian.com/datav/fsexit.png',
      bgColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 50,
      alwaysShow: true,
    },
    apis: {},
    apiData: {},
    events: {},
    actions: {},
  },
  {
    id: 'MainImg_LuEijxxeQv2',
    name: 'VMainImg',
    type: 'com',
    alias: '单张图片',
    icon: 'v-icon-material',
    img: '//files.pengxiaotian.com/com-thum/main-img-370-208.png',
    locked: false,
    hided: false,
    selected: false,
    hovered: false,
    renameing: false,
    tag: 0,
    scaling: { zoom: false, w: 300, h: 180, sx: 1, sy: 1 },
    attr: { x: 249, y: 691, w: 300, h: 180, deg: 0, opacity: 1, filpV: false, filpH: false },
    projectId: 0,
    config: {
      imageType: 'bitmap',
      backgroundImage: 'https://files.pengxiaotian.com/datav/main-img.png',
      vectorImage: 'https://files.pengxiaotian.com/datav/datav-vue-logo.svg',
      vectorFill: '#38ae70',
      repeat: 'no-repeat',
      radius: 1,
      urlConfig: { url: '', ifBlank: false },
      cursor: true,
    },
    apis: {},
    apiData: {},
    events: {},
    actions: {},
  },
  {
    id: 'WordCloud_4V68mcrhViF',
    name: 'VWordCloud',
    type: 'com',
    alias: '词云',
    icon: 'v-icon-other',
    img: '//files.pengxiaotian.com/com-thum/word-cloud-370-208.png',
    locked: false,
    hided: false,
    selected: false,
    hovered: false,
    renameing: false,
    tag: 0,
    scaling: { zoom: false, w: 300, h: 200, sx: 1, sy: 1 },
    attr: { x: 1422, y: 165, w: 300, h: 200, deg: 0, opacity: 1, filpV: false, filpH: false },
    projectId: 0,
    config: {
      global: {
        fontFamily: 'Microsoft Yahei',
        max: 35,
        min: 14,
        rotationRange: { min: -90, max: 90 },
        rotate: 45,
        drawType: 'preset',
        shape: 'circle',
        image: 'https://files.pengxiaotian.com/datav/echarts-logo.png',
      },
      series: [
        { type: 'wordCloud', id: '0_LCU1ZP9oKYq', name: '0', color: '#0a73ff' },
        { type: 'wordCloud', id: '1_1hi8ikpdkzM', name: '1', color: '#3dabff' },
        { type: 'wordCloud', id: '2_-Y89xsM3tu8', name: '2', color: '#79daff' },
      ],
      tooltip: {
        show: false,
        textStyle: { fontSize: 14, color: '#fff', fontWeight: 'normal' },
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
      },
      animation: { enabled: true },
    },
    apis: {
      source: {
        fields: {
          name: { type: 'string', map: '', description: '名称', optional: false },
          value: { type: 'string', map: '', description: '值', optional: false },
          type: { type: 'string', map: '', description: '系列', optional: false },
        },
        description: '',
        useAutoUpdate: false,
        autoUpdate: 1,
        handler: 'render',
      },
    },
    apiData: {
      source: {
        id: 'HjiMjuZNPJO',
        type: 'static',
        pageFilters: [],
        config: { useFilter: false, data: '' },
        comId: 'WordCloud_4V68mcrhViF',
      },
    },
    events: {},
    actions: {},
  },
  {
    id: 'CarouselTable_Cj1pM-aPTs',
    name: 'VCarouselTable',
    type: 'com',
    alias: '轮播列表',
    icon: 'v-icon-view-list',
    img: '//files.pengxiaotian.com/com-thum/carousel-table-370-208.png',
    locked: false,
    hided: false,
    selected: false,
    hovered: false,
    renameing: false,
    tag: 0,
    scaling: { zoom: false, w: 300, h: 200, sx: 1, sy: 1 },
    attr: { x: 740, y: 746, w: 300, h: 200, deg: 0, opacity: 1, filpV: false, filpH: false },
    projectId: 0,
    config: {
      global: {
        rowCount: 5,
        isLoop: true,
        fontFamily: 'arial',
        animation: { mode: 'bottom', duration: 2, singleStop: true },
        highLight: {
          show: false,
          isOrder: true,
          hlIndex: '3,4',
          hlStyle: {
            textStyle: { fontFamily: 'arial', fontSize: 12, color: '#fff', fontWeight: 'normal' },
            bgColor: 'rgb(154, 205, 50)',
            border: { width: 1, style: 'solid', color: '#f00' },
          },
        },
        ifRowHidden: true,
        textAnimate: { ifRun: true, isSpeed: true, animateDur: 2, speedRate: 0.03 },
        defaultImg: 'https://files.pengxiaotian.com/datav/datav-img-placeholder.png',
      },
      header: {
        show: true,
        heightPercent: 20,
        bgColor: 'rgb(10, 115, 255)',
        textStyle: {
          textAlign: 'left',
          fontFamily: 'arial',
          color: '#ffffff',
          fontSize: 12,
          fontWeight: 'normal',
        },
      },
      row: { oddBGColor: 'rgb(10, 115, 255)', evenBGColor: 'rgb(36, 130, 255)' },
      idList: {
        show: true,
        bgColor: 'rgb(44, 156, 255)',
        width: 12,
        radius: 60,
        textStyle: {
          fontFamily: 'Microsoft Yahei',
          fontWeight: 'normal',
          fontSize: 10,
          color: '#ffffff',
        },
      },
      series: [
        {
          columnName: 'area',
          displayName: '地区',
          width: 20,
          dataType: 'text',
          widthPercent: 50,
          margin: { top: 0, bottom: 10, left: 0, right: 10 },
          isBr: false,
          textAlign: 'left',
          textStyle: {
            fontFamily: 'Microsoft Yahei',
            fontWeight: 'normal',
            fontSize: 12,
            color: 'rgba(255,255,255,0.8)',
          },
        },
        {
          columnName: 'pv',
          displayName: '流量(pv)',
          width: 20,
          dataType: 'text',
          widthPercent: 50,
          margin: { top: 0, bottom: 10, left: 0, right: 10 },
          isBr: false,
          textAlign: 'left',
          textStyle: {
            fontFamily: 'Microsoft Yahei',
            fontWeight: 'normal',
            fontSize: 12,
            color: 'rgba(255,255,255,0.8)',
          },
        },
        {
          columnName: 'attribute',
          displayName: '用户行为特征',
          width: 53,
          dataType: 'text',
          widthPercent: 50,
          margin: { top: 0, bottom: 10, left: 0, right: 10 },
          isBr: false,
          textAlign: 'left',
          textStyle: {
            fontFamily: 'Microsoft Yahei',
            fontWeight: 'normal',
            fontSize: 12,
            color: 'rgba(255,255,255,0.8)',
          },
        },
      ],
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
        id: 'TIXikP0_fx',
        type: 'static',
        pageFilters: [],
        config: { useFilter: false, data: '' },
        comId: 'CarouselTable_Cj1pM-aPTs',
      },
    },
    events: {
      rowClicked: {
        description: '当点击单行时',
        fields: { index: { type: 'number', map: '', description: '索引值', optional: false } },
      },
      'data-flipped': {
        description: '当数据滚动时',
        fields: { index: { type: 'number', map: '', description: '索引值', optional: false } },
      },
      'data-highLight': {
        description: '当数据高亮时',
        fields: { index: { type: 'number', map: '', description: '索引值', optional: false } },
      },
      'scroll-end': {
        description: '一轮滚动结束',
        fields: { isEnding: { type: 'boolean', map: '', description: '结束', optional: false } },
      },
    },
    actions: {},
  },
  {
    id: 'TableBar_mnOvQhlQGGE',
    name: 'VTableBar',
    type: 'com',
    alias: '轮播列表柱状图',
    icon: 'v-icon-view-list',
    img: '//files.pengxiaotian.com/com-thum/table-bar-370-208.png',
    locked: false,
    hided: false,
    selected: false,
    hovered: false,
    renameing: false,
    tag: 0,
    scaling: { zoom: false, w: 300, h: 230, sx: 1, sy: 1 },
    attr: { x: 86, y: 802, w: 300, h: 230, deg: 0, opacity: 1, filpV: false, filpH: false },
    projectId: 0,
    config: {
      global: {
        fontFamily: 'Microsoft Yahei',
        animation: true,
        duration: 1000,
        padding: 8,
        quantity: 5,
        loop: true,
        looptime: 5000,
        sort: { show: true, sort: 'desc' },
      },
      index: {
        show: true,
        textarea: { fontSize: 12, color: '#fff', fontWeight: 'normal' },
        width: 'auto',
        padding: 10,
        format: '1',
      },
      content: {
        textarea: { fontSize: 12, color: '#fff', fontWeight: 'normal' },
        marquee: { show: true, duration: 8000 },
      },
      number: {
        show: false,
        fontSize: 16,
        color: '#fff',
        fontWeight: 'normal',
        padding: 10,
        percentage: false,
        separatingChart: true,
        decimal: 2,
        symbol: { prefix: '', suffix: '', marginLeft: 0, marginRight: 0 },
      },
      bar: {
        show: true,
        fillColorType: 'solid',
        color: 'rgb(10, 115, 255)',
        fromColor: '#2d99f7',
        toColor: '#01f0ff',
        height: 8,
        radius: 8,
        threshold: {
          show: true,
          value: 80,
          fillColorType: 'gradient',
          color: '#ffc925',
          fromColor: '#f87c0b',
          toColor: '#fad422',
        },
      },
      light: { show: true, color: 'rgb(121, 218, 255)', width: 70, height: 2, duration: 3000 },
      segment: { show: true, color: 'rgba(255, 255, 255, 0.1)', height: 8 },
    },
    apis: {
      source: {
        fields: {
          value: { type: 'string', map: '', description: '值说明', optional: false },
          content: { type: 'string', map: '', description: '内容说明', optional: false },
        },
        description: '',
        useAutoUpdate: false,
        autoUpdate: 1,
        handler: 'render',
      },
    },
    apiData: {
      source: {
        id: 'kdD90vQ8E6a',
        type: 'static',
        pageFilters: [],
        config: { useFilter: false, data: '' },
        comId: 'TableBar_mnOvQhlQGGE',
      },
    },
    events: {},
    actions: {},
  },
];
