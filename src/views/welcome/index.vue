<script setup lang="ts">
import { testApi } from "@/api/auth"
import { ref } from "vue"

defineOptions({
  name: "Welcome",
})
const time = ref("")
const clickFun = () => {
  testApi().then(res => (time.value = res.data))
}
</script>

<template>
  <div>
    <h1>Pure-Admin-Thin（非国际化版本）</h1>
    {{ time }}
    <el-button @click="clickFun" type="primary">click me</el-button>
  </div>
</template>
