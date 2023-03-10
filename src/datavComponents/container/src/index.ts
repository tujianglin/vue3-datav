import { assign } from 'lodash-es';
import { DatavComponent } from '../../../components/_models/datav-component';
import {
  ApiConfigMap,
  ApiDataConfigMap,
  setApiConfig,
  setApiData,
} from '../../../components/_models/data-source';
import { DataEventConfig } from '../../../components/_models/data-event';
export class VContainer extends DatavComponent {
  config = {
    children: null as Map<any, any>,
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
  };
  apis: Partial<ApiConfigMap>;
  apiData: Partial<ApiDataConfigMap>;
  events: Record<string, DataEventConfig>;
  actions: Record<string, DataEventConfig>;
  constructor() {
    super('Container', { w: 700, h: 500 });
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
export default VContainer;
