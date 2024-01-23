import { getReq, postReq } from "./utils"
/**
 * 登录参数
 */
export interface LoginDto {
  password: string
  username: string
}
/**
 * 登出所需参数
 */
export interface LogoutDto {
  accessToken: string
  refreshToken: string
}
/**
 * 响应数据
 */
export interface LoginResult {
  accessToken: string
  refreshToken: string
  username: string
}

export const loginReq = (data: LoginDto) => {
  return postReq<LoginResult>("/auth/login", data)
}

export const logoutReq = (data: LogoutDto) => {
  return postReq<LoginResult>("/auth/logout", data)
}

export const testApi = () => {
  return getReq<string>("/now")
}
