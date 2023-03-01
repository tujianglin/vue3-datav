import { getAssetsFile } from '/@/utils';
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
      name: 'VBar',
      alias: '柱状图',
      used: true,
      thum: getAssetsFile('datav/bar.png'),
    },
  ],
};

/* 折线图 */
export const line: ComDataType = {
  type: 'line',
  name: '折线图',
  data: [
    {
      name: 'VLine',
      alias: '折线图',
      used: false,
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

const getCom = (coms: ComDataDto[], name: string) => {
  for (let i = 0, len = coms.length; i < len; i++) {
    const com = coms[i];
    if (com.name === name) {
      return com;
    }

    if (com.children) {
      const subCom = getCom(com.children, name);
      if (subCom) {
        return subCom;
      }
    }
  }

  return null;
};

export function findComByName(name: string) {
  for (const classification of classifications) {
    for (const category of classification.data as ComDataType[]) {
      const com = getCom(category.data as ComDataDto[], name);
      if (com) {
        return {
          classification,
          category,
          com,
        };
      }
    }
  }

  return null;
}
