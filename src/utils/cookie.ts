/**
 * Cookie 工具函数
 * 提供设置、获取和删除 cookie 的方法
 */

/**
 * 设置 cookie
 * @param name cookie 名称
 * @param value cookie 值
 * @param days 过期天数，默认为 30 天
 * @param path cookie 路径，默认为 '/'
 */
export function setCookie(name: string, value: string, days: number = 30, path: string = '/'): void {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  const expiresStr = `expires=${expires.toUTCString()}`;
  document.cookie = `${name}=${value};${expiresStr};path=${path}`;
}

/**
 * 获取 cookie 值
 * @param name cookie 名称
 * @returns cookie 值，如果不存在则返回 null
 */
export function getCookie(name: string): string | null {
  const nameEQ = `${name}=`;
  const cookies = document.cookie?.split(';');
  
  if (!cookies) {
    return null;
  }
  
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    if (!cookie) continue;
    
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  
  return null;
}

/**
 * 删除 cookie
 * @param name cookie 名称
 * @param path cookie 路径，默认为 '/'
 */
export function deleteCookie(name: string, path: string = '/'): void {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=${path}`;
}

/**
 * 检查 cookie 是否存在
 * @param name cookie 名称
 * @returns 是否存在
 */
export function hasCookie(name: string): boolean {
  return getCookie(name) !== null;
}
