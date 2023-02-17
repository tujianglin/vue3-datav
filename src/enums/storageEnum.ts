export enum StorageEnum {
  TOKEN_KEY = 'TOKEN_KEY',
  APP_CONFIG = 'APP_CONFIG',
  PANEL_STATE = 'PANEL_STATE',
}

export type BaseStorage = keyof typeof StorageEnum;
