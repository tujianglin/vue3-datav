export interface LoginModel {
  tenant_id: string;
  user_id: string;
  dept_id: string;
  post_id: string;
  role_id: string;
  oauth_id: null;
  account: string;
  user_name: string;
  nick_name: string;
  role_name: string;
  avatar: string;
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  detail: { type: string };
  license: string;
}
