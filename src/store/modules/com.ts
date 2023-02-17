import { defineStore } from 'pinia';
import {
  ComType,
  createGroupConfig,
  DatavComponent,
  DatavGroup,
  sortGroupConfig,
} from '/@/api/models/component';
import { coms } from '/@/api/models/coms';
import { MoveType } from '/@/api/models/editor';
export interface IComState {
  coms: DatavComponent[];
  subComs: DatavComponent[];
}

/* 获取子组件数据 */
export const getChildState = (com: DatavComponent): { hovered: boolean; selected: boolean } => {
  let hovered = false;
  let selected = false;
  if (com.type === ComType.layer) {
    for (let i = 0, len: any = com.children?.length; i < len; i++) {
      const sc = com?.children?.[i];
      if (sc?.selected) selected = sc.selected;
      if (sc?.hovered) hovered = sc?.hovered;

      if (!selected && sc?.type === ComType.layer) {
        const s = getChildState(sc);
        if (s.selected) selected = s.selected;
        if (s.hovered) hovered = s.hovered;
      }

      if (selected && hovered) {
        break;
      }
    }
  }
  return {
    hovered,
    selected,
  };
};

const findCom = (coms: DatavComponent[], id: string): DatavComponent | null => {
  for (let i = 0, len = coms.length; i < len; i++) {
    const com = coms[i];
    if (com.id === id) {
      return com;
    }
    if (com.type === ComType.layer) {
      const subCom = findCom(com.children as DatavComponent[], id);
      if (subCom) {
        return subCom;
      }
    }
  }
  return null;
};

/* 寻找组件 */
const findComs = (coms: DatavComponent[], parentId?: string) => {
  if (!parentId) {
    return coms;
  }
  for (let i = 0, len = coms.length; i < len; i++) {
    const com = coms[i];
    if (com.id === parentId) {
      return com.children;
    }
    if (com.type === ComType.layer) {
      const item = com?.children?.find((m) => m.id === parentId);
      if (item) {
        return item.children;
      }
    }
  }
};

/* 获取组件下标 */
const getComIndex = (coms: DatavComponent[], data: string | DatavComponent) => {
  const id = typeof data === 'string' ? data : data.id;
  return coms.findIndex((c) => c.id === id);
};

/* 获取选中组件列表 */
const getSelected = (coms: DatavComponent[]) => {
  let list = coms.filter((m) => m.selected);
  if (list.length > 0) {
    return list;
  }
  for (let i = 0, len = coms.length; i < len; i++) {
    const com = coms[i];
    if (com.type === ComType.layer) {
      list = getSelected(com.children as any);
      if (list.length > 0) {
        return list;
      }
    }
  }
  return list;
};

/* 确认选中当前组件 */
const confirmSelect = (
  coms: DatavComponent[],
  id: string,
  pid: string,
  multiple = false,
  callback?: Function,
) => {
  for (let i = 0, len = coms.length; i < len; i++) {
    const com = coms[i];
    com.hovered = false;
    if (multiple) {
      if (com.id === id) {
        com.selected = !com.selected;
        if (com.parentId != pid) {
          callback?.();
          com.selected = true;
          break;
        }
      }
    } else {
      com.selected = com.id === id;
    }

    if (com.type === ComType.layer) {
      confirmSelect(com.children as DatavComponent[], id, pid, multiple, callback);
    }
  }
};

/* 取消选中当前组件 */
const cancelSelect = (coms: DatavComponent[]) => {
  coms.forEach((com) => {
    com.hovered = false;
    com.selected = false;

    if (com.type === ComType.layer) {
      cancelSelect(com.children as DatavComponent[]);
    }
  });
};

export const useComStore = defineStore('com', {
  state: (): IComState => ({
    coms: [],
    subComs: [],
  }),
  getters: {
    selectedComs(state) {
      return getSelected(state.coms);
    },
  },
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
    async request() {
      this.coms = coms as any;
    },
    /* 添加单个组件 */
    async add(com: DatavComponent) {
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
    /* 选中单个组件 */
    select(id: string, parentId?: string, multiple = false) {
      if (id) {
        let pid: any = parentId;
        if (multiple) {
          const scoms = this.selectedComs;
          if (scoms.length > 0) {
            pid = scoms[0].parentId;
          }
        }
        confirmSelect(this.coms, id, pid, multiple, () => {
          cancelSelect(this.coms);
        });
      } else {
        cancelSelect(this.coms);
      }
    },
    /* 选中多个组件 */
    selects(toCom: DatavComponent) {
      const scoms = this.selectedComs;
      if (toCom.selected || scoms.length > 0) {
        if (toCom.parentId != scoms[0].parentId) {
          this.select(toCom.id, toCom.parentId);
          return;
        }
        // 虽有小bug，但是够用。O(∩_∩)O哈哈~
        const list = findComs(this.coms, toCom.parentId) as DatavComponent[];
        let fromIdx = getComIndex(list, scoms[0]);
        const toIdx = getComIndex(list, toCom);
        if (scoms.length > 1) {
          const sidx = fromIdx;
          const ecom = scoms[scoms.length - 1];
          if (ecom.id !== toCom.id) {
            const eidx = getComIndex(list, ecom);
            fromIdx = Math.abs(toIdx - sidx) > Math.abs(toIdx - eidx) ? eidx : sidx;
          }
        }
        if (fromIdx === toIdx) {
          return;
        }
        const sidx = Math.min(fromIdx, toIdx);
        const eidx = Math.max(fromIdx, toIdx);
        list.forEach((com, idx) => {
          com.selected = sidx <= idx && idx <= eidx;
        });
      } else {
        toCom.selected = true;
      }
    },
    /* 移动组件 */
    move(moveType: MoveType, id: string, pid: string) {
      let com: DatavComponent | any;
      let i = -1,
        len = 0;
      if (pid) {
        com = findCom(this.coms, pid) as DatavComponent;
        i = getComIndex(com.children as DatavComponent[], id);
        len = (com.children as DatavComponent[]).length;
      } else {
        i = getComIndex(this.coms, id);
        len = this.coms.length;
      }
      if (moveType === MoveType.up) {
        if (i > 0) {
          if (com) {
            com.children?.splice(i - 1, 0, ...com.children.splice(i, 1));
          } else {
            this.coms.splice(i - 1, 0, ...this.coms.splice(i, 1));
          }
        }
      } else if (moveType === MoveType.down) {
        if (i + 1 < len) {
          if (com) {
            com.children?.splice(i + 1, 0, ...com.children.splice(i, 1));
          } else {
            this.coms.splice(i + 1, 0, ...this.coms.splice(i, 1));
          }
        }
      } else if (moveType === MoveType.top) {
        if (i > 0) {
          if (com) {
            com.children?.unshift(...com.children.splice(i, 1));
          } else {
            this.coms.unshift(...this.coms.splice(i, 1));
          }
        }
      } else if (moveType === MoveType.bottom) {
        if (i + 1 < len) {
          if (com) {
            com.children?.push(...com.children.splice(i, 1));
          } else {
            this.coms.push(...this.coms.splice(i, 1));
          }
        }
      }
      if (com) {
        sortGroupConfig(com as DatavGroup);
      }
    },
    /* 创建成组 */
    createGroup() {
      const scoms = this.selectedComs;
      const sids = scoms.map((i) => i.id);
      let top = Infinity,
        left = Infinity;
      let right = -Infinity,
        bottom = -Infinity;
      scoms.forEach(({ attr }) => {
        top = Math.min(attr.y, top);
        left = Math.min(attr.x, left);
        right = Math.max(attr.x + attr.w, right);
        bottom = Math.max(attr.y + attr.h, bottom);
      });
      const gcom = new DatavGroup({
        x: left,
        y: top,
        w: right - left,
        h: bottom - top,
      });
      gcom.parentId = scoms[0].parentId;
      gcom.children?.push(...scoms);
      gcom.children?.forEach((com) => {
        com.parentId = gcom.id;
        com.attr.x -= gcom.attr.x;
        com.attr.y -= gcom.attr.y;
        gcom.config.push(createGroupConfig(com));
      });

      if (gcom.parentId) {
        const oldGroup = findCom(this.coms, gcom.parentId) as DatavGroup;
        oldGroup.children = oldGroup.children?.filter((i) => !sids.includes(i.id));
        oldGroup.config = oldGroup.config.filter((i) => !sids.includes(i.transform3d.id));
        oldGroup.children?.push(gcom);
        oldGroup.config.push(createGroupConfig(gcom));
      } else {
        this.coms = this.coms.filter((i) => !i.selected);
        this.add(gcom).then(() => {
          this.select(gcom.id);
        });
      }
    },
  },
});
