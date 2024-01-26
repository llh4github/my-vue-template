/**  true 为显示字段*/
export interface AuditFieldIsDisplay {
  updateUsername?: boolean
  createUsername?: boolean
  createdTime?: boolean
  updatedTime?: boolean
}

export const auditFields = (isDisplay?: AuditFieldIsDisplay) => {
  const columns: TableColumnList = [
    {
      label: "创建人",
      prop: "createdByUser.username",
      minWidth: 150,
      hide: !isDisplay?.createUsername ?? true,
    },
    {
      label: "更新人",
      prop: "updatedByUser.username",
      minWidth: 150,
      hide: !isDisplay?.updateUsername ?? true,
    },

    {
      label: "创建时间",
      prop: "createdTime",
      minWidth: 150,
      hide: !isDisplay?.createdTime ?? true,
    },
    {
      label: "更新时间",
      prop: "updatedTime",
      minWidth: 150,
      hide: !isDisplay?.updatedTime ?? true,
    },
  ]
  return columns
}
