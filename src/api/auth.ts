import { postReq } from "./utils"
/**
 * 登录参数
 */
export interface LoginDto {
  password: string
  username: string
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
