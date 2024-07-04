<script lang="ts" setup>
import { nextTick, reactive, ref } from "vue"
import { type ElMessageBoxOptions, ElMessageBox, ElMessage } from "element-plus"
import { generateSecureRandomString } from "@/utils"
import { deleteMarketDataApi, getMarketDataApi, createMarketDataApi, updateMarketDataApi } from "@/api/market"
import { type GetMarketResponseData, type CreateOrUpdateMarketRequestData } from "@/api/market/types/market"
// import RoleColumnSolts from "./tsx/RoleColumnSolts"
// import StatusColumnSolts from "./tsx/StatusColumnSolts"
import {
  type VxeGridInstance,
  type VxeGridProps,
  type VxeModalInstance,
  type VxeModalProps,
  type VxeFormInstance,
  type VxeFormProps
} from "vxe-table"

defineOptions({
  // 命名当前组件
  name: "VxeTable"
})

//#region vxe-grid  查询表单
interface RowMeta extends CreateOrUpdateMarketRequestData {}

const xGridDom = ref<VxeGridInstance>()
const xGridOpt: VxeGridProps = reactive({
  loading: true,
  autoResize: true,
  /** 分页配置项 */
  pagerConfig: {
    align: "right"
  },
  /** 表单配置项 */
  formConfig: {
    items: [
      {
        field: "title",
        itemRender: {
          name: "$input",
          props: { placeholder: "公告标题", clearable: true }
        }
      },
      {
        itemRender: {
          name: "$buttons",
          children: [
            {
              props: { type: "submit", content: "查询", status: "primary" }
            },
            {
              props: { type: "reset", content: "重置" }
            }
          ]
        }
      }
    ]
  },
  /** 工具栏配置 */
  toolbarConfig: {
    refresh: true,
    custom: true,
    slots: { buttons: "toolbar-btns" }
  },
  /** 自定义列配置项 */
  customConfig: {
    /** 是否允许列选中  */
    checkMethod: ({ column }) => !["username"].includes(column.field)
  },
  /** 列配置 */
  columns: [
    {
      type: "checkbox",
      width: "50px"
    },
    {
      field: "title",
      title: "公告标题"
    },
    {
      field: "rentPrice",
      title: "月租金"
    },
    {
      field: "coverArea",
      title: "占地面积"
    },
    {
      field: "buildArea",
      title: "建筑面积"
    },
    {
      field: "operaYear",
      title: "经营年限"
    },
    {
      title: "操作",
      width: "150px",
      fixed: "right",
      showOverflow: false,
      slots: { default: "row-operate" }
    }
  ],
  /** 数据代理配置项（基于 Promise API） */
  proxyConfig: {
    /** 启用动态序号代理 */
    seq: true,
    /** 是否代理表单 */
    form: true,
    /** 是否自动加载，默认为 true */
    // autoLoad: false,
    props: {
      total: "total"
    },
    ajax: {
      query: ({ page, form }) => {
        xGridOpt.loading = true
        crudStore.clearTable()
        return new Promise((resolve) => {
          let total = 0
          let result: RowMeta[] = []
          /** 加载数据 */
          const callback = (res: GetMarketResponseData) => {
            if (res?.data) {
              // 总数
              total = res.data.total
              // 列表数据
              result = res.data.list
            }
            xGridOpt.loading = false
            // 返回值有格式要求，详情见 vxe-table 官方文档
            resolve({ total, result })
          }

          /** 接口需要的参数 */
          const params = {
            title_like: form.title || undefined,
            _limit: page.pageSize,
            _page: page.currentPage
          }
          /** 调用接口 */
          getMarketDataApi(params).then(callback).catch(callback)
        })
      }
    }
  }
})
//#endregion

//#region vxe-modal  新增、修改弹窗
const xModalDom = ref<VxeModalInstance>()
const xModalOpt: VxeModalProps = reactive({
  title: "",
  showClose: true,
  escClosable: true,
  maskClosable: true,
  width: "60%",
  beforeHideMethod: () => {
    xFormDom.value?.clearValidate()
    return Promise.resolve()
  }
})
//#endregion

//#region vxe-form  新增、修改表单
const xFormDom = ref<VxeFormInstance>()
const xFormOpt: VxeFormProps = reactive({
  span: 24,
  titleWidth: "100px",
  loading: false,
  /** 是否显示标题冒号 */
  titleColon: false,
  /** 表单数据 */
  data: {
    id: "",
    title: "", // 标题
    rentPrice: "", // 月租金
    coverArea: "", // 占地面积
    buildArea: "", // 建筑面积
    operaYear: "", // 经营年限
    rentFreeDate: "", // 免租期
    registerMethod: "", //报名方式
    biddingMethod: "", //竞价方式
    sureMoney: "", // 竞价保证金
    bondMoney: "", // 履约保证金
    registerTime: "", // 报名时间
    biddingTime: "", // 竞投时间
    payMethod: "", // 租金缴交方式
    decorateRequest: "", // 装修要求
    documentDetail: "", // 证件手续
    contractDuty: "", // 违约责任
    remark: "" // 其它说明
  },
  /** 项列表 */
  items: [
    {
      field: "title",
      title: "标题",
      span: 12,
      itemRender: { name: "$input", props: { placeholder: "请输入" } }
    },
    {
      field: "rentPrice",
      title: "月租金",
      span: 12,
      itemRender: { name: "$input", props: { placeholder: "请输入" } }
    },
    {
      field: "coverArea",
      title: "占地面积",
      span: 12,
      itemRender: { name: "$input", props: { placeholder: "请输入" } }
    },
    {
      field: "buildArea",
      title: "建筑面积",
      span: 12,
      itemRender: { name: "$input", props: { placeholder: "请输入" } }
    },
    {
      field: "operaYear",
      title: "经营年限",
      span: 12,
      itemRender: { name: "$input", props: { placeholder: "请输入" } }
    },
    {
      field: "rentFreeDate",
      title: "免租期",
      span: 12,
      itemRender: { name: "$input", props: { placeholder: "请输入" } }
    },
    {
      field: "registerMethod",
      title: "报名方式",
      span: 12,
      itemRender: { name: "$input", props: { placeholder: "请输入" } }
    },
    {
      field: "biddingMethod",
      title: "竞价方式",
      span: 12,
      itemRender: { name: "$input", props: { placeholder: "请输入" } }
    },
    {
      field: "sureMoney",
      title: "竞价保证金",
      itemRender: { name: "$input", props: { placeholder: "请输入" } }
    },
    {
      field: "bondMoney",
      title: "履约保证金",
      itemRender: { name: "$input", props: { placeholder: "请输入" } }
    },
    {
      field: "registerTime",
      title: "报名时间",
      itemRender: { name: "$input", props: { placeholder: "请输入" } }
    },
    {
      field: "biddingTime",
      title: "竞投时间",
      itemRender: { name: "$input", props: { placeholder: "请输入" } }
    },
    {
      field: "payMethod",
      title: "租金缴交方式",
      itemRender: { name: "$input", props: { placeholder: "月、季、半年、年缴，递增方式" } }
    },
    {
      field: "decorateRequest",
      title: "装修要求",
      itemRender: { name: "$input", props: { placeholder: "请输入" } }
    },
    {
      field: "documentDetail",
      title: "证件手续",
      itemRender: { name: "$input", props: { placeholder: "产权证、建设工程规划许可证、一消消防证" } }
    },
    {
      field: "contractDuty",
      title: "违约责任",
      itemRender: { name: "$input", props: { placeholder: "请输入" } }
    },
    {
      field: "remark",
      title: "其它说明",
      itemRender: { name: "$input", props: { placeholder: "请输入" } }
    },
    {
      align: "right",
      itemRender: {
        name: "$buttons",
        children: [
          { props: { content: "取消" }, events: { click: () => xModalDom.value?.close() } },
          {
            props: { type: "submit", content: "确定", status: "primary" },
            events: { click: () => crudStore.onSubmitForm() }
          }
        ]
      }
    }
  ],
  /** 校验规则 */
  rules: {
    username: [
      {
        required: true,
        validator: ({ itemValue }) => {
          switch (true) {
            case !itemValue:
              return new Error("请输入")
            case !itemValue.trim():
              return new Error("空格无效")
          }
        }
      }
    ],
    password: [
      {
        required: true,
        validator: ({ itemValue }) => {
          switch (true) {
            case !itemValue:
              return new Error("请输入")
            case !itemValue.trim():
              return new Error("空格无效")
          }
        }
      }
    ]
  }
})
//#endregion

//#region 增删改查
const crudStore = reactive({
  /** 表单类型，true 表示修改，false 表示新增 */
  isUpdate: true,
  /** 加载表格数据 */
  commitQuery: () => xGridDom.value?.commitProxy("query"),
  /** 清空表格数据 */
  clearTable: () => xGridDom.value?.reloadData([]),
  /** 点击显示弹窗 */
  onShowModal: (row?: RowMeta) => {
    if (row) {
      crudStore.isUpdate = true
      xModalOpt.title = "修改市场"
      // 赋值
      xFormOpt.data = row
    } else {
      crudStore.isUpdate = false
      xModalOpt.title = "新增市场"
    }
    // 禁用表单项
    // const props = xFormOpt.items?.[0]?.itemRender?.props
    // props && (props.disabled = crudStore.isUpdate)
    xModalDom.value?.open()
    nextTick(() => {
      !crudStore.isUpdate && xFormDom.value?.reset()
      xFormDom.value?.clearValidate()
    })
  },
  /** 确定并保存 */
  onSubmitForm: () => {
    if (xFormOpt.loading) return
    xFormDom.value?.validate((errMap) => {
      if (errMap) return
      xFormOpt.loading = true
      const callback = () => {
        xFormOpt.loading = false
        xModalDom.value?.close()
        ElMessage.success("操作成功")
        !crudStore.isUpdate && crudStore.afterInsert()
        crudStore.commitQuery()
      }
      if (crudStore.isUpdate) {
        // 模拟调用修改接口成功
        // setTimeout(() => callback(), 1000)
        updateMarketDataApi(xFormOpt.data).then(() => {
          callback()
        })
      } else {
        // 模拟调用新增接口成功
        // setTimeout(() => callback(), 1000)
        xFormOpt.data.id = generateSecureRandomString(8)
        createMarketDataApi(xFormOpt.data).then(() => {
          callback()
        })
      }
    })
  },
  /** 新增后是否跳入最后一页 */
  afterInsert: () => {
    const pager = xGridDom.value?.getProxyInfo()?.pager
    if (pager) {
      const currentTotal = pager.currentPage * pager.pageSize
      if (currentTotal === pager.total) {
        ++pager.currentPage
      }
    }
  },
  /** 删除 */
  onDelete: (row: RowMeta) => {
    const tip = `确定 <strong style="color: var(--el-color-danger);"> 删除 </strong> 市场 <strong style="color: var(--el-color-primary);"> ${row.title} </strong> ？`
    const config: ElMessageBoxOptions = {
      type: "warning",
      showClose: true,
      closeOnClickModal: true,
      closeOnPressEscape: true,
      cancelButtonText: "取消",
      confirmButtonText: "确定",
      dangerouslyUseHTMLString: true
    }
    ElMessageBox.confirm(tip, "提示", config).then(() => {
      deleteMarketDataApi(row.id).then(() => {
        ElMessage.success("删除成功")
        crudStore.afterDelete()
        crudStore.commitQuery()
      })
    })
  },
  /** 删除后是否返回上一页 */
  afterDelete: () => {
    const tableData: RowMeta[] = xGridDom.value!.getData()
    const pager = xGridDom.value?.getProxyInfo()?.pager
    if (pager && pager.currentPage > 1 && tableData.length === 1) {
      --pager.currentPage
    }
  },
  /** 更多自定义方法 */
  moreFn: () => {}
})
//#endregion
</script>

<template>
  <div class="app-container">
    <!-- 表格 -->
    <vxe-grid ref="xGridDom" v-bind="xGridOpt">
      <!-- 左侧按钮列表 -->
      <template #toolbar-btns>
        <vxe-button status="primary" icon="vxe-icon-add" @click="crudStore.onShowModal()">新增市场</vxe-button>
        <!-- <vxe-button status="danger" icon="vxe-icon-delete">批量删除</vxe-button> -->
      </template>
      <!-- 操作 -->
      <template #row-operate="{ row }">
        <el-button link type="primary" @click="crudStore.onShowModal(row)">修改</el-button>
        <el-button link type="danger" @click="crudStore.onDelete(row)">删除</el-button>
      </template>
    </vxe-grid>
    <!-- 弹窗 -->
    <vxe-modal ref="xModalDom" v-bind="xModalOpt">
      <!-- 表单 -->
      <vxe-form ref="xFormDom" v-bind="xFormOpt" />
    </vxe-modal>
  </div>
</template>
