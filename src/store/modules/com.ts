import { defineStore } from 'pinia';
import { ComType, DatavComponent } from '/@/api/models/component';
import { getComs } from '/@/api/coms';
import { coms } from '/@/api/models/coms';
export interface IComState {
  coms: DatavComponent[];
  subComs: DatavComponent[];
}
export const useComStore = defineStore('com', {
  state: (): IComState => ({
    coms: coms,
    subComs: [],
  }),
  actions: {
    load(data: DatavComponent[]) {
      const coms: DatavComponent[] = [];
      const subComs: DatavComponent[] = [];
      data.forEach((i) => {
        if (i.type === ComType.com) {
          subComs.push(i);
        } else {
          coms.push(i);
        }
      });
      this.coms = coms;
      this.subComs = subComs;
    },
    /* 请求组件列表 */
    async request(projectId: number) {
      const res = await getComs(projectId);
      console.log(res);
    },
    /* 添加单个组件 */
    add(com: DatavComponent) {
      if (com.type === ComType.subCom) {
        this.subComs.push(com);
      } else {
        this.coms.push(com);
      }
    },
    /* 添加多个组件 */
    addComs(coms: DatavComponent[]) {
      for (const com of coms) {
        if (com.type === ComType.subCom) {
          this.subComs.push(com);
        } else {
          this.coms.push(com);
        }
      }
    },
  },
});
