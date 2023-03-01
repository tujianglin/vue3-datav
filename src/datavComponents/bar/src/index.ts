import { assign } from 'lodash-es';
import { DatavChartSeries, DatavEChartsComponent } from '/@/components/_models/datav-component';
import {
  ApiConfigMap,
  ApiDataConfigMap,
  setApiConfig,
  setApiData,
} from '/@/components/_models/data-source';
import { DataEventConfig } from '/@/components/_models/data-event';
import { createField } from '/@/components/_models/data-field';
export class BasicBarSeries extends DatavChartSeries {
  constructor(name: string) {
    super('bar', name);
  }

  color = {
    type: 'solid',
    value: '#00baff',
    from: '#fff',
    to: '#000',
  };
}
export class VBar extends DatavEChartsComponent {
  config = {
    echart: {
      margin: {
        top: 40,
        bottom: 50,
        left: 40,
        right: 20,
      },
    },
    xAxis: {
      show: true,
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [new BasicBarSeries('系列1')],
  };
  apis: Partial<ApiConfigMap>;
  apiData: Partial<ApiDataConfigMap>;
  events: Record<string, DataEventConfig>;
  actions: Record<string, DataEventConfig>;
  constructor() {
    super('Bar', { w: 500, h: 300 });
    this.initData();
  }
  /* 初始化数据 */
  initData() {
    const fields = [
      createField('x', { description: '类目' }),
      createField('y', { description: '值' }),
    ];
    setApiConfig(this, {
      fields: assign({}, ...fields),
    });
    setApiData(this);
    this.events = {};
    this.actions = {};
    return this;
  }
  /* 加载数据 */
  async loadData(): Promise<void> {
    try {
      this.apiData.source.config.data = JSON.stringify([
        { x: '上海', y: 23 },
        { x: '深圳', y: 13 },
        { x: '合肥', y: 2 },
        { x: '成都', y: 9 },
        { x: '安徽', y: 5 },
        { x: '北京', y: 10 },
        { x: '杭州', y: 14 },
        { x: '长沙', y: 24 },
      ]);
    } catch (error) {
      throw error;
    }
  }
}
export default VBar;
