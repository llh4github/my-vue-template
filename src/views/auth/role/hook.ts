import { JsonWrapper, PageResult } from "@/api/utils"
import type { PaginationProps } from "@pureadmin/table"
import { reactive, ref } from "vue"

export function useRole<T>(
  query: (data: any) => Promise<JsonWrapper<PageResult<T>>>,
) {
  const formRef = ref()
  const dataList = ref([])
  const loading = ref(true)
  const searchForm = reactive({
    title: "",
    code: "",
  })
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true,
  })
  const handleSizeChange = (val: number) => {
    pagination.pageSize = val
    queryDataFun()
  }
  const handleCurrentChange = (val: number) => {
    pagination.currentPage = val
    queryDataFun()
  }
  const queryDataFun = async () => {
    const param = {
      ...searchForm,
      page: {
        pageIndex: pagination.currentPage,
        pageSize: pagination.pageSize,
      },
    }
    query(param)
      .then(resp => {
        if (resp.success) {
          dataList.value = resp.data.records
          pagination.total = resp.data.totalPage
        }
      })
      .finally(() => (loading.value = false))
  }
  const columns: TableColumnList = [
    {
      label: "角色名称",
      prop: "title",
      minWidth: 120,
    },
    {
      label: "角色标识",
      prop: "code",
      minWidth: 150,
    },
  ]
  return {
    columns,
    formRef,
    dataList,
    loading,
    searchForm,
    pagination,
    queryDataFun,
    handleSizeChange,
    handleCurrentChange,
  }
}
