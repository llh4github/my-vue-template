import { reactive, ref, h } from "vue"
import { UrlResourceSimpleView, addData, updateData } from "@/api/resource-url"
import { JsonWrapper, PageResult } from "@/api/utils"
import { addDialog } from "@/components/ReDialog"
import { auditFields } from "@/views/commons"
import type { PaginationProps } from "@pureadmin/table"
import editForm from "./form.vue"
import { successMsg } from "@/utils/message"

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
        updatedTime: true,
      }),
      {
        label: "操作",
        fixed: "right",
        width: 240,
        slot: "operation",
      },
    ]
    return columns
  }
  const openDialog = (title = "新增", row?: UrlResourceSimpleView) => {
    addDialog({
      title: `${title}URL资源`,
      props: {
        formInline: {
          id: row?.id ?? null,
          path: row?.path ?? "",
          method: row?.method ?? undefined,
        },
      },
      width: "30%",
      draggable: true,
      fullscreenIcon: true,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef()
        const curData = options.props.formInline
        FormRef.validate(valid => {
          if (valid) {
            addOrUpdate(curData).then(resp => {
              if (resp.success) {
                successMsg()
                queryDataFun()
                done()
              }
            })
          }
        })
      },
    })
  }
  function addOrUpdate(data: any) {
    if ("id" in data && data.id) {
      return updateData(data)
    } else {
      return addData(data)
    }
  }

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
