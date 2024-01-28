import { reactive } from "vue"
import type { FormRules } from "element-plus"
import { checkCodeExist } from "@/api/role"

const checkCode = (rule: any, value: any, callback: any) => {
  console.log("fuck ", rule, value)
}

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  title: [{ required: true, message: "角色名称为必填项", trigger: "blur" }],
  code: [{ required: true, validator: checkCode, trigger: "blur" }],
})

export const formRuleFun = (model: { id?: number }) => {
  return reactive(<FormRules>{
    title: [{ required: true, message: "角色名称为必填项", trigger: "blur" }],
    code: [{ required: true, validator: checkCode, trigger: "blur" }],
  })
}
