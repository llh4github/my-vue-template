import { HttpMethod, UrlResourceSpec } from "@/api/resource-url"
import { JsonWrapper, PageResult } from "@/api/utils"
import { auditFields } from "@/views/commons"
import type { PaginationProps } from "@pureadmin/table"
import { reactive, ref } from "vue"

export function useResourceUrl<T>(
  query: (data: any) => Promise<JsonWrapper<PageResult<T>>>,
) {
  const formRef = ref()
  const dataList = ref([])
  const loading = ref(true)
  const searchForm = reactive({
    path: "",
    method: null,
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
          pagination.total = resp.data.totalRowCount
        }
      })
      .finally(() => (loading.value = false))
  }
  const columns = () => {
    const columns: TableColumnList = [
      {
        label: "路径",
        prop: "path",
        minWidth: 150,
      },
      {
        label: "请求方法",
        prop: "method",
        minWidth: 50,
      },
      ...auditFields({
        createdTime: true,
      }),
    ]
    return columns
  }
  const openDialog = (title = "新增", row?: any) => {}
  return {
    columns,
    formRef,
    dataList,
    loading,
    openDialog,
    searchForm,
    pagination,
    queryDataFun,
    handleSizeChange,
    handleCurrentChange,
  }
}
