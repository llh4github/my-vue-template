<script setup lang="ts">
import { ref } from "vue"
import { RoleAddInput } from "@/api/role"
import { formRules } from "./rule"
defineOptions({
  name: "role-add-from",
})
interface FormProps {
  formInline: RoleAddInput
}
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    title: "",
    code: "",
    menuResourceIds: [],
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
    <el-form-item label="角色名称" prop="title">
      <el-input
        v-model="newFormInline.title"
        clearable
        placeholder="请输入角色名称"
      />
    </el-form-item>

    <el-form-item label="角色标识" prop="code">
      <el-input
        v-model="newFormInline.code"
        clearable
        placeholder="请输入角色标识"
      />
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped></style>
