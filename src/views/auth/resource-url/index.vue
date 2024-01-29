<script setup lang="ts">
import { onMounted } from "vue"
import Refresh from "@iconify-icons/ep/refresh"
import Search from "@iconify-icons/ep/search"
import { useRenderIcon } from "@/components/ReIcon/src/hooks"
import { PureTableBar } from "@/components/RePureTableBar"
import { simplePageQuery, HttpMethod } from "@/api/resource-url"
import { useResourceUrl } from "./hook"
defineOptions({
  name: "url-resource-page",
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
} = useResourceUrl(simplePageQuery)
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
      <el-form-item label="路径" prop="path">
        <el-input
          v-model="searchForm.path"
          placeholder="请输入路径"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>

      <el-form-item label="路径" prop="path">
        <el-select
          v-model="searchForm.method"
          :clear="
            () => {
              searchForm.method = null
            }
          "
          clearable
        >
          <el-option
            v-for="item in HttpMethod"
            :key="item"
            :value="item.valueOf()"
            :label="item.valueOf()"
          />
        </el-select>
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
    <PureTableBar
      title="url资源管理"
      :columns="columns()"
      @refresh="queryDataFun"
    >
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
