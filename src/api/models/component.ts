/* 组件类型 */
export enum ComType {
  com = 'com',
  subCom = 'subCom',
  layer = 'layer',
}
export interface ComponentAttr {
  x: number;
  y: number;
  w: number;
  h: number;
  deg: number;
  opacity: number;
  filpV: boolean;
  filpH: boolean;
}
export interface ComponentGroupAttr extends ComponentAttr {
  apply3d: boolean;
  perspective: number;
  perspectiveOrigin: {
    x: number;
    y: number;
  };
}

export abstract class DatavComponent {
  id: string;
  name: string;
  renameing: string;
  icon: string;
  attr: ComponentAttr = {
    x: 0,
    y: 0,
    w: 100,
    h: 100,
    deg: 0,
    opacity: 1,
    filpV: false,
    filpH: false,
  };
  // 组件类型
  readonly type: ComType;
  // 组件别名
  alias: string;
  // 图片
  img: string;
  // 组件隐藏
  hided? = false;
  // 组件锁定
  locked? = false;
  // 是否选中
  selected? = false;
  // 是否停留
  hovered? = false;
  // 是否成组
  fold? = false;
  // 用于组合组件，如：底图和图层关系
  parentId?: string;

  scaling?: any = {
    zoom: false,
    w: 0,
    h: 0,
    sx: 1,
    sy: 1,
  };
  // 子组件
  children?: DatavComponent[];
  constructor(name: string, attr: Partial<ComponentAttr>, type = ComType.com) {
    this.id = '111';
    this.name = `V${name}`;
    this.type = type;
    this.attr = { ...this.attr, ...attr };
    this.scaling.w = attr.w;
    this.scaling.h = attr.h;
  }
}

export interface GroupTransform3d {
  id: string;
  rotate3d: {
    axis: string;
    deg: number;
  };
  scale3d: {
    x: number;
    y: number;
    lock: boolean;
  };
  translate3d: {
    x: number;
    y: number;
    z: number;
  };
}

export interface GroupConfig {
  transform3d: GroupTransform3d;
}

export const createTransform3d = (com: DatavComponent): GroupTransform3d => {
  return {
    id: com.id,
    rotate3d: {
      axis: 'y',
      deg: 30,
    },
    scale3d: {
      x: 1,
      y: 1,
      lock: false,
    },
    translate3d: {
      x: 0,
      y: 0,
      z: 0,
    },
  };
};

export const createGroupConfig = (com: DatavComponent) => {
  return {
    transform3d: createTransform3d(com),
  };
};

/* 排序 */
export const sortGroupConfig = (group: DatavGroup) => {
  const list: any[] = [];
  group.children?.forEach((com) => {
    const oc = group.config.find((m) => com.id === m.transform3d.id);
    list.push(oc ?? createGroupConfig(com));
  });
  group.config = list;
};

/* 成组的数据 */
export class DatavGroup extends DatavComponent {
  attr: ComponentGroupAttr = {
    x: 0,
    y: 0,
    w: 100,
    h: 100,
    deg: 0,
    opacity: 1,
    filpV: false,
    filpH: false,
    apply3d: false,
    perspective: 500,
    perspectiveOrigin: {
      x: 50,
      y: 50,
    },
  };
  fold = true;
  scaling: {};
  config: GroupConfig[] = [];
  icon: string;

  constructor(attr: Partial<ComponentGroupAttr>) {
    super('Group', attr, ComType.layer);
    this.alias = '组';
    this.icon = 'group';
    this.img = `${import.meta.env.VITE_APP_CDN}/com-thum/group-200-200.png`;
    this.attr = { ...this.attr, ...attr };
    this.scaling = {
      zoom: false,
      w: attr.w,
      h: attr.h,
      sx: 1,
      sy: 1,
    };

    this.initData();
  }

  initData() {
    this.children = [];
    return this;
  }

  async loadData() {}
}
