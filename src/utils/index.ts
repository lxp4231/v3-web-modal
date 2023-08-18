// import dayjs from 'dayjs';

type TCookieKey = 'access_token' | 'user' | 'temporary_access_token';

export function getCookie(key: TCookieKey) {
  return localStorage.getItem(key);
}
export function removeCookie(key: TCookieKey) {
  return localStorage.removeItem(key);
}
export function setCookie(key: TCookieKey, value: string | Record<string, any>) {
  if (typeof value === 'string') {
    localStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
export function isLogin(): boolean {
  return !!getCookie('access_token');
}
// 手机
export function isMobile(mobile: string): boolean {
  return /^1[3-9]\d{9}$/.test(mobile);
}
// 邮箱
export function isEmail(email: string): boolean {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  );
}
// 密码
export function isPsw(psw: string): boolean {
  const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6}/;
  const isvalid = passwordReg.test(psw);
  return isvalid;
}
// 用户名  任意数字、大小写字母、下划线、中划线且长度不小于4位
export function isLoginName(name: string): boolean {
  // eslint-disable-next-line no-useless-escape
  // /[^a-z|A-Z|0-9|\-|_|\.]/g.test(name) && name.length < 4;
  const isvalid = name.length < 4;
  return isvalid;
}
export function handlePhoneNumber(value: string): string {
  if (!value) return '';
  return `${value.substring(0, 3)}****${value.substring(7, 11)}`;
}
