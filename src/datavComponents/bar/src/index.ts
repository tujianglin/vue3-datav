import { assign } from 'lodash-es';
import { DatavComponent, EchartConfig } from '../../../components/_models/datav-component';
import {
  ApiConfigMap,
  ApiDataConfigMap,
  setApiConfig,
  setApiData,
} from '../../../components/_models/data-source';
import { DataEventConfig } from '../../../components/_models/data-event';
export class VBar extends DatavComponent {
  config: EchartConfig = {
    global: {},
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
    const fields = [];
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
    } catch (error) {
      throw error;
    }
  }
}
export default VBar;
