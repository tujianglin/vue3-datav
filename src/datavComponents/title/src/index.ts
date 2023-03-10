import { assign } from 'lodash-es';
import { DatavComponent } from '../../../components/_models/datav-component';
import {
  ApiConfigMap,
  ApiDataConfigMap,
  setApiConfig,
  setApiData,
} from '../../../components/_models/data-source';
import { DataEventConfig } from '../../../components/_models/data-event';
/* Title 配置 */
export class VTitle extends DatavComponent {
  config = {
    title: '我是标题',
    textStyle: {
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
    urlConfig: {
      url: '',
      isBlank: false,
    },
  };
  apis: Partial<ApiConfigMap>;
  apiData: Partial<ApiDataConfigMap>;
  events: Record<string, DataEventConfig>;
  actions: Record<string, DataEventConfig>;
  constructor() {
    super('Title', { w: 300, h: 56 });
    this.initData();
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
export default VTitle;
