<script setup lang="ts">
import { onMounted } from "vue"
import Refresh from "@iconify-icons/ep/refresh"
import Search from "@iconify-icons/ep/search"
import { useRenderIcon } from "@/components/ReIcon/src/hooks"
import { useRole } from "./hook"
import { PureTableBar } from "@/components/RePureTableBar"
import { simplePageQuery } from "@/api/role"
defineOptions({
  name: "Role-Page",
})
const {
  columns,
  formRef,
  dataList,
  loading,
  searchForm,
  queryDataFun,
  pagination,
  openDialog,
  handleSizeChange,
  handleCurrentChange,
} = useRole(simplePageQuery)

onMounted(() => {
  queryDataFun()
})
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="searchForm"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item label="角色名称：" prop="title">
        <el-input
          v-model="searchForm.title"
          placeholder="请输入角色名称"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item label="角色标识：" prop="code">
        <el-input
          v-model="searchForm.code"
          placeholder="请输入角色标识"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon(Search)"
          @click="queryDataFun"
          :loading="loading"
        >
          搜索
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)"> 重置 </el-button>
      </el-form-item>
    </el-form>
    <PureTableBar title="角色管理" :columns="columns()" @refresh="queryDataFun">
      <template #buttons>
        <el-button type="primary" @click="openDialog()">新增</el-button>
      </template>
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          align-whole="center"
          showOverflowTooltiP
          table-layout="auto"
          :loading="loading"
          :size="size"
          adaptive
          :data="dataList"
          :columns="dynamicColumns"
          :pagination="pagination"
          :paginationSmall="size === 'small' ? true : false"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)',
          }"
          @page-size-change="handleSizeChange"
          @page-current-change="handleCurrentChange"
      /></template>
    </PureTableBar>
  </div>
</template>

<style lang="scss" scoped></style>
