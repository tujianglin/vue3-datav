export interface ComDataDto {
  name: string;
  alias: string;
  img?: string;
  thum?: string;
  used: boolean;
  children?: ComDataDto[];
}

export interface ComDataType {
  type: string;
  name: string;
  icon?: string;
  data: (ComDataType | ComDataDto)[];
}

/* 柱状图 */
export const bar: ComDataType = {
  type: 'bar',
  name: '柱状图',
  data: [
    {
      name: 'VBisicBar',
      alias: '柱状图',
      used: true,
    },
  ],
};

/* 折线图 */
export const line: ComDataType = {
  type: 'line',
  name: '折线图',
  data: [
    {
      name: 'VBisicLine',
      alias: '折线图',
      used: true,
    },
  ],
};

/* 信息组件 */
export const title: ComDataType = {
  type: 'title',
  name: '标题',
  data: [
    {
      name: 'VTitle',
      alias: '通用标题',
      used: true,
    },
  ],
};

/* 组件类型 */
export const classifications: ComDataType[] = [
  {
    type: 'regular',
    name: '图表',
    data: [bar, line],
  },
  {
    type: 'text',
    name: '信息',
    data: [title],
  },
];
