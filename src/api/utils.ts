import { http } from "@/utils/http"
import { PureHttpResponse } from "@/utils/http/types"
import { message } from "@/utils/message"
/**
 * 通用响应结构（JSON）
 */
export interface JsonWrapper<T> {
  /**
   * 响应码
   */
  code: string
  data?: T
  /**
   * 模块名，在异常的情况下，此值才有意义
   */
  module: string
  /**
   * 响应消息
   */
  msg: string
  /**
   * 响应是否成功
   */
  success: boolean
}
/**
 * 分页参数
 */
export interface PageQueryParam {
  /**
   * 页码
   */
  pageIndex: number
  /**
   * 页大小
   */
  pageSize: number
}
/**
 * 数据创建者
 */
export interface CreatedByUser {
  id: number
  username: string
}
/**
 * 数据更新者
 */
export interface UpdatedByUser {
  id: number
  username: string
}
/**
 * 分页结果类
 */
export interface PageResult<T> {
  /**
   * 数据
   */
  records: T[]
  /**
   * 总页数
   */
  totalPage: number
  /**
   * 数据总量
   */
  totalRowCount: number
}
const baseUrl = (url: string) => {
  return "/api" + url
}

export function postPageQuery<T>(url: string, data?: any) {
  return postReq<PageResult<T>>(url, data)
}
export function getReq<T>(url: string, params?: any) {
  return http.request<JsonWrapper<T>>("get", baseUrl(url), params, {
    beforeResponseCallback,
  })
}
export function postReq<T>(url: string, data?: any) {
  return http.request<JsonWrapper<T>>(
    "post",
    baseUrl(url),
    { data },
    {
      beforeResponseCallback,
    },
  )
}
export function putReq<T>(url: string, data?: any) {
  return http.request<JsonWrapper<T>>(
    "put",
    baseUrl(url),
    { data },
    {
      beforeResponseCallback,
    },
  )
}
export function deleteReq<T>(url: string, data?: any) {
  return http.request<JsonWrapper<T>>("delete", baseUrl(url), { data })
}

const beforeResponseCallback = (response: PureHttpResponse) => {
  if (response.status !== 200) {
    console.log("请求出错: ", response.data)
    message("请求出错", { type: "error" })
    return
  }
  const data = response.data
  if (!data.success) {
    let msgHtml = `
   <strong> 操作出错： ${data.msg}</strong> <br>
    错误代号： ${data.code} <br>
    错误模块： ${data.module}<br>
    `
    if (data.data && Object.keys(data.data).length > 0) {
      msgHtml += "错误说明：" + JSON.stringify(data.data)
    }
    message(msgHtml, {
      type: "warning",
      grouping: true,
      dangerouslyUseHTMLString: true,
    })
    return
  }
}
