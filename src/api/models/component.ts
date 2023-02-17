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
  readonly type: ComType;
}
