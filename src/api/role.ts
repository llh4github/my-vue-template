import {
  CreatedByUser,
  PageQueryParam,
  UpdatedByUser,
  postPageQuery,
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

export const simplePageQuery = (data: RoleSimpleSpec) => {
  return postPageQuery<RoleSimpleView>("/auth/role/page", data)
}
