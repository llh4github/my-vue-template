import {
  CreatedByUser,
  PageQueryParam,
  UpdatedByUser,
  getReq,
  postPageQuery,
  postReq,
} from "./utils"

/**
 * RoleSimpleSpec
 */
export interface RoleSimpleSpec {
  code?: string
  page: PageQueryParam
  title?: string
}
/**
 * 简单角色数据
 */
export interface RoleSimpleView {
  code: string
  createdByUser?: CreatedByUser
  /**
   * 创建时间
   */
  createdTime?: Date
  id: number
  title: string
  updatedByUser?: UpdatedByUser
  /**
   * 更新时间
   */
  updatedTime?: Date
}
/**
 * 新增角色数据
 */
export interface RoleAddInput {
  /**
   * 角色代号
   */
  code: string
  /**
   * 此角色可访问的菜单资源ID列表
   */
  menuResourceIds: number[]
  /**
   * 角色名
   */
  title: string
}
export const simplePageQuery = (data: RoleSimpleSpec) => {
  return postPageQuery<RoleSimpleView>("/auth/role/page", data)
}

export const addDataReq = (data: RoleAddInput) => {
  return postReq<RoleSimpleView>("/auth/role", data)
}
/** 检查角色代号是否存在 */
export const checkCodeExist = (code: string, notId?: number) => {
  return getReq<RoleSimpleView>("/auth/role/checkExist/code", { code, notId })
}
