import {
  CreatedByUser,
  PageQueryParam,
  UpdatedByUser,
  postPageQuery,
  postReq,
} from "./utils"

/**
 * 请求方法
 */
export enum HttpMethod {
  AllMethod = "ALL_METHOD",
  Delete = "DELETE",
  Get = "GET",
  None = "NONE",
  Post = "POST",
  Put = "PUT",
}
/**
 * UrlResourceAddInput
 */
export interface UrlResourceAddInput {
  /**
   * 请求方法
   */
  method: HttpMethod
  path: string
}
export interface UrlResourceSpec {
  /**
   * HTTP方法
   */
  method?: HttpMethod
  page: PageQueryParam
  path?: string
}
export interface UrlResourceSimpleView {
  createdByUser?: CreatedByUser
  /**
   * 创建时间
   */
  createdTime?: Date
  id: number
  /**
   * HTTP方法
   */
  method: HttpMethod
  path: string
  updatedByUser?: UpdatedByUser
  /**
   * 更新时间
   */
  updatedTime?: Date
}
/** 添加数据 */
export function addData(data: UrlResourceAddInput) {
  return postReq<any>("/auth/resource/url", data)
}
/** 分页查询 */
export function simplePageQuery(data: UrlResourceSpec) {
  return postPageQuery<UrlResourceSimpleView>("/auth/resource/url/page", data)
}
