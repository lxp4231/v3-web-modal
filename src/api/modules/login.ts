import { GET, POST, DELETE, PUT } from '../http';

interface ILogin {
  loginName: string;
  otp: string;
  check?: boolean;
}
interface PLogin {
  loginName: string;
  password: string;
  check?: boolean;
}
interface BLogin {
  identityProvider: string;
  identityProviderUid: string;
  loginName?: string;
  otp?: string;
}
interface IOpt {
  receiver: string;
}
// 短信验证码登录
export function userLogin(data: ILogin) {
  return POST<string>('/usercenter/login/byotp', data);
}
// 密码登录
export function userPwdLogin(data: PLogin) {
  return POST<string>('/usercenter/login/bypwd', data);
}
// 用户信息
export function userInfo() {
  return GET<any>('/usercenter/user');
}
// 发送短信
export function userOpt(data: IOpt) {
  return POST<boolean>('/usercenter/login/otp', data);
}
// 三方登录
export function userByidpLogin(data: BLogin) {
  return POST<boolean>('/usercenter/login/byidp', data);
}
// 绑定手机号
