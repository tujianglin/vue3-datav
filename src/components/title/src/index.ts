import { assign } from 'lodash-es';
import { DatavComponent } from '../../_models/datav-component';
import {
  ApiConfigMap,
  ApiDataConfigMap,
  setApiConfig,
  setApiData,
} from '../../_models/data-source';
import { DataEventConfig } from '../../_models/data-event';
/* Title 配置 */
export class Title extends DatavComponent {
  config = {
    title: '我是标题',
  };
  apis: Partial<ApiConfigMap>;
  apiData: Partial<ApiDataConfigMap>;
  events: Record<string, DataEventConfig>;
  actions: Record<string, DataEventConfig>;
  constructor() {
    super('Title', { w: 300, h: 500 });
  }
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

  async loadData(): Promise<void> {
    try {
      this.apiData.source!.config.data = '标题';
    } catch (error) {
      throw error;
    }
  }
}
