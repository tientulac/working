import { ResponseBase } from './ResponseBase';

export class ResponseLogin extends ResponseBase {
  Token: string;
  Roles:any;
  Info: UserInfo;
}
export class UserInfo {
  UserName: string;
  UserID: number;
  Email: string;
  FullName: string;
  DiaChi: string;
}
