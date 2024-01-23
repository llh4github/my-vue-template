import { defineStore } from "pinia"
import { store } from "@/store"
import { userType } from "./types"
import { routerArrays } from "@/layout/types"
import { router, resetRouter } from "@/router"
import { storageSession } from "@pureadmin/utils"
import { getLogin, refreshTokenApi } from "@/api/user"
import { UserResult, RefreshTokenResult } from "@/api/user"
import { useMultiTagsStoreHook } from "@/store/modules/multiTags"
import {
  type DataInfo,
  setToken,
  removeToken,
  sessionKey,
  setTokenForLogin,
  getToken,
} from "@/utils/auth"
import { LoginResult, loginReq, logoutReq } from "@/api/auth"
import { JsonWrapper } from "@/api/utils"

export const useUserStore = defineStore({
  id: "pure-user",
  state: (): userType => ({
    // 用户名
    username:
      storageSession().getItem<DataInfo<number>>(sessionKey)?.username ?? "",
    // 页面级别权限
    roles: storageSession().getItem<DataInfo<number>>(sessionKey)?.roles ?? [],
  }),
  actions: {
    /** 存储用户名 */
    SET_USERNAME(username: string) {
      this.username = username
    },
    /** 存储角色 */
    SET_ROLES(roles: Array<string>) {
      this.roles = roles
    },
    /** 登入 */
    async loginByUsername(data) {
      return new Promise<JsonWrapper<LoginResult>>((resolve, reject) => {
        loginReq(data)
          .then(data => {
            const rs = data.data
            if (data.code === "OK") {
              setTokenForLogin(rs)
            }
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    /** 前端登出（不调用接口） */
    logOut() {
      const accessToken = getToken().accessToken
      const refreshToken = getToken().refreshToken
      logoutReq({ accessToken, refreshToken })
        .then(resp => console.log("fuck", resp))
        .finally(() => {
          this.username = ""
          this.roles = []
          removeToken()
          useMultiTagsStoreHook().handleTags("equal", [...routerArrays])
          resetRouter()
          router.push("/login")
        })
    },
    /** 刷新`token` */
    async handRefreshToken(data) {
      return new Promise<RefreshTokenResult>((resolve, reject) => {
        refreshTokenApi(data)
          .then(data => {
            if (data) {
              setToken(data.data)
              resolve(data)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  },
})

export function useUserStoreHook() {
  return useUserStore(store)
}
