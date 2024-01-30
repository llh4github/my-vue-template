<script setup lang="ts">
import { ref } from "vue"
import { formRules } from "./rule"
import {
  HttpMethod,
  UrlResourceAddInput,
  UrlResourceUpdateInput,
} from "@/api/resource-url"

defineOptions({
  name: "url-resource-form",
})
interface FormProps {
  formInline: UrlResourceUpdateInput | UrlResourceAddInput
}
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: null,
    path: "",
    method: HttpMethod.None,
  }),
})
const newFormInline = ref(props.formInline)
const ruleFormRef = ref()
function getRef() {
  return ruleFormRef.value
}

defineExpose({ getRef })
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-form-item label="路径" prop="path">
      <el-input
        v-model="newFormInline.path"
        clearable
        placeholder="请输入路径"
      />
    </el-form-item>

    <el-form-item label="请求方法" prop="method">
      <el-select v-model="newFormInline.method">
        <el-option
          v-for="item in HttpMethod"
          :key="item"
          :value="item.valueOf()"
          :label="item.valueOf()"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped></style>
