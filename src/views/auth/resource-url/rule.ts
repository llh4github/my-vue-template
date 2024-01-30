import { reactive } from "vue"
import type { FormRules } from "element-plus"
const uriRegex = /^\/[^\s$.?#]{0,199}[^\s]*$/i

const checkUrlPath = (_rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("路径为必填项"))
  }
  if (!uriRegex.test(value)) {
    return callback(new Error("路径必须在200个以内符合要求的字符"))
  }
  return callback()
}
/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  path: [{ required: true, validator: checkUrlPath, trigger: "blur" }],
  method: [{ required: true, message: "请求方法为必填项", trigger: "blur" }],
})
