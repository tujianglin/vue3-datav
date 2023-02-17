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

export abstract class DatavComponent {
  id: string;
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
  // 子组件
  children?: DatavComponent[];
}
