import { reactive, ref, h } from "vue"
import { JsonWrapper, PageResult } from "@/api/utils"
import { auditFields } from "@/views/commons"
import type { PaginationProps } from "@pureadmin/table"
import { addDialog } from "@/components/ReDialog"
import { RoleAddInput } from "@/api/role"
import editForm from "./form.vue"

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
          pagination.total = resp.data.totalRowCount
        }
      })
      .finally(() => (loading.value = false))
  }
  const columns = () => {
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
      ...auditFields({
        createUsername: false,
        createdTime: true,
      }),
    ]
    return columns
  }
  const openDialog = (title = "新增", row?: RoleAddInput) => {
    addDialog({
      title: `${title}角色`,
      props: {
        formInline: {
          name: row?.title ?? "",
          code: row?.code ?? "",
          // remark: row?.remark ?? "",
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
            console.log("curData", curData)
            done()
          }
        })
        console.log("form sure func ...")
      },
    })
  }

  return {
    columns,
    formRef,
    dataList,
    loading,
    searchForm,
    pagination,
    queryDataFun,
    openDialog,
    handleSizeChange,
    handleCurrentChange,
  }
}
