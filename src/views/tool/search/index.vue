<script lang="ts" setup>
import { ref, computed } from "vue"
import { type FormInstance, type FormRules, ComponentSize } from "element-plus"
import { Iphone, House, Edit, Collection, Top, Notebook } from "@element-plus/icons-vue"
import { generateSecureRandomString } from "@/utils"
import { createMarketDataApi, updateMarketDataApi, getMarketDataApi } from "@/api/market"
import { type CreateOrUpdateMarketRequestData } from "@/api/market/types/market"
// import * as XLSX from "xlsx"

// /** 导出excel */
// const exportExcel = () => {
//   const data = [
//     { name: "张三", age: 20 },
//     { name: "李四", age: 25 }
//   ]

//   const worksheet = XLSX.utils.json_to_sheet(data)
//   const workbook = XLSX.utils.book_new()
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")

//   XLSX.writeFile(workbook, "export.xlsx")
// }
/** 表单元素的引用 */
const searchFormRef = ref<FormInstance | null>(null)

/** 登录表单校验规则 */
const formRules: FormRules = {
  //   username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  //   password: [
  //     { required: true, message: "请输入密码", trigger: "blur" },
  //     { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
  //   ]
}

// const defaultTime: [Date, Date] = [new Date(2000, 1, 1, 9, 0, 0), new Date(2000, 2, 1, 17, 0, 0)] // '9:00:00', '17:00:00'
const marketList = ref<CreateOrUpdateMarketRequestData[]>()
const getMarketList = () => {
  /** 接口需要的参数 */
  const params = {
    _limit: 1000,
    _page: 1
  }
  /** 调用接口 */
  getMarketDataApi(params).then((res) => {
    marketList.value = res.data.list
  })
}
getMarketList()

/** 表单数据 */
const searchFormData = ref<CreateOrUpdateMarketRequestData>({
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
  remark: "", // 其它说明
  flawSituation: "", // 瑕疵情况
  upgrade: "", // 升级改造
  sureMoneyReturnMethod: "", // 保证金退回方式（财务）
  firstRent: "", // 首期租金（财务）
  insure: "", // 保险要求（运营）
  peopleArrange: "", // 人员安排（运营）
  publicTime: "", // 公示时间（运营）
  handoverTime: "", // 交接时间（运营）
  handoverAddress: "", // 交接地点（运营）
  handoverContact: "", // 交接联系人和方式（运营）
  decorateDesc: "", // 装修要求（工程）
  contact: "" // 联系人和方式
})

const size = ref<ComponentSize>("default")

const iconStyle = computed(() => {
  const marginMap: any = {
    large: "8px",
    default: "6px",
    small: "4px"
  }
  return {
    marginRight: marginMap[size.value] || marginMap.default
  }
})

// 保存JSON数据
const saveForm = () => {
  const params: CreateOrUpdateMarketRequestData = searchFormData.value
  if (params.id) {
    updateMarketDataApi(params)
  } else {
    params.id = generateSecureRandomString(8)
    createMarketDataApi(params)
  }
}
</script>

<template>
  <div class="app-container" flex flex-col>
    <div mb-6 text-center flex flex-row>
      <el-button type="primary" @click="saveForm">保存</el-button>
    </div>
    <div>
      <el-form ref="searchFormRef" :model="searchFormData" :rules="formRules" label-width="120">
        <el-row :gutter="20" style="width: 100%">
          <el-col :span="24" m-2><span style="color: var(--el-color-primary)">搜索信息</span></el-col>
          <el-col :span="8">
            <el-form-item prop="title" label="标题">
              <el-input v-model.trim="searchFormData.title" placeholder="标题" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="coverArea" label="占地面积">
              <el-input v-model.trim="searchFormData.coverArea" placeholder="占地面积" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="buildArea" label="建筑面积">
              <el-input v-model.trim="searchFormData.buildArea" placeholder="建筑面积" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="operaYear" label="经营年限">
              <el-input v-model.trim="searchFormData.operaYear" placeholder="经营年限" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="rentFreeDate" label="免租期">
              <el-input v-model.trim="searchFormData.rentFreeDate" placeholder="免租期" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="registerMethod" label="报名方式">
              <el-input v-model.trim="searchFormData.registerMethod" placeholder="报名方式" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="biddingMethod" label="竞价方式">
              <el-input v-model.trim="searchFormData.biddingMethod" placeholder="竞价方式" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="rentPrice" label="月租金">
              <el-input v-model.trim="searchFormData.rentPrice" placeholder="月租金" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="sureMoney" label="竞价保证金">
              <el-input v-model.trim="searchFormData.sureMoney" placeholder="竞价保证金" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="bondMoney" label="履约保证金">
              <el-input v-model.trim="searchFormData.bondMoney" placeholder="履约保证金" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="registerTime" label="报名时间">
              <el-input v-model.trim="searchFormData.registerTime" placeholder="报名时间" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="biddingTime" label="竞投时间">
              <el-input v-model.trim="searchFormData.biddingTime" placeholder="竞投时间" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="payMethod" label="租金缴交方式">
              <el-input
                v-model.trim="searchFormData.payMethod"
                placeholder="租金缴交方式（月、半年、年，递增方式）"
                :autosize="{ minRows: 2, maxRows: 10 }"
                type="textarea"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="decorateRequest" label="装修要求">
              <el-input
                v-model.trim="searchFormData.decorateRequest"
                placeholder="装修要求"
                :autosize="{ minRows: 2, maxRows: 10 }"
                type="textarea"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="documentDetail" label="证件手续">
              <el-input
                v-model.trim="searchFormData.documentDetail"
                placeholder="证件手续（产权证、建设工程规划许可证、消防验收）"
                :autosize="{ minRows: 2, maxRows: 10 }"
                type="textarea"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="contractDuty" label="违约责任">
              <el-input
                v-model.trim="searchFormData.contractDuty"
                placeholder="违约责任"
                :autosize="{ minRows: 2, maxRows: 10 }"
                type="textarea"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="flawSituation" label="瑕疵情况">
              <el-input
                v-model.trim="searchFormData.flawSituation"
                placeholder="瑕疵情况"
                :autosize="{ minRows: 2, maxRows: 10 }"
                type="textarea"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="upgrade" label="升级改造">
              <el-input
                v-model.trim="searchFormData.upgrade"
                placeholder="升级改造"
                :autosize="{ minRows: 2, maxRows: 10 }"
                type="textarea"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="remark" label="其它说明">
              <el-input
                v-model.trim="searchFormData.remark"
                placeholder="其它说明"
                :autosize="{ minRows: 2, maxRows: 10 }"
                type="textarea"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24" m-2><span style="color: var(--el-color-primary)">其它信息</span></el-col>
          <el-col :span="12">
            <el-form-item prop="sureMoneyReturnMethod" label="保证金退回方式">
              <el-input
                v-model.trim="searchFormData.sureMoneyReturnMethod"
                placeholder="保证金退回方式"
                :autosize="{ minRows: 2, maxRows: 10 }"
                type="textarea"
              />
            </el-form-item> </el-col
          ><el-col :span="12">
            <el-form-item prop="firstRent" label="首期租金">
              <el-input
                v-model.trim="searchFormData.firstRent"
                placeholder="首期租金"
                :autosize="{ minRows: 2, maxRows: 10 }"
                type="textarea"
              />
            </el-form-item> </el-col
          ><el-col :span="12">
            <el-form-item prop="insure" label="保险要求">
              <el-input
                v-model.trim="searchFormData.insure"
                placeholder="保险要求"
                :autosize="{ minRows: 2, maxRows: 10 }"
                type="textarea"
              />
            </el-form-item> </el-col
          ><el-col :span="12">
            <el-form-item prop="peopleArrange" label="人员安排">
              <el-input
                v-model.trim="searchFormData.peopleArrange"
                placeholder="人员安排"
                :autosize="{ minRows: 2, maxRows: 10 }"
                type="textarea"
              />
            </el-form-item> </el-col
          ><el-col :span="12">
            <el-form-item prop="publicTime" label="公示时间">
              <el-input v-model.trim="searchFormData.publicTime" placeholder="公示时间" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="handoverTime" label="交接时间">
              <el-input v-model.trim="searchFormData.handoverTime" placeholder="交接时间" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="handoverAddress" label="交接地点">
              <el-input v-model.trim="searchFormData.handoverAddress" placeholder="交接地点" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="handoverContact" label="交接联系方式">
              <el-input v-model.trim="searchFormData.handoverContact" placeholder="交接联系方式" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="decorateDesc" label="装修要求-工程">
              <el-input v-model.trim="searchFormData.decorateDesc" placeholder="装修要求-工程" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="contact" label="联系人和方式">
              <el-input v-model.trim="searchFormData.contact" placeholder="联系人和方式" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div flex justify-center>
      <el-descriptions w-xl :title="searchFormData.title" :column="3" :size="size" border>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Collection />
              </el-icon>
              标题
            </div>
          </template>
          {{ searchFormData.title }}
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <House />
              </el-icon>
              占地面积
            </div>
          </template>
          {{ searchFormData.coverArea }}
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <House />
              </el-icon>
              建筑面积
            </div>
          </template>
          {{ searchFormData.buildArea }}
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <House />
              </el-icon>
              经营年限
            </div>
          </template>
          {{ searchFormData.operaYear }}
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <iphone />
              </el-icon>
              免租期
            </div>
          </template>
          {{ searchFormData.rentFreeDate }}
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <iphone />
              </el-icon>
              报名方式
            </div>
          </template>
          {{ searchFormData.registerMethod }}
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <iphone />
              </el-icon>
              竞价方式
            </div>
          </template>
          {{ searchFormData.biddingMethod }}
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Money />
              </el-icon>
              月租金
            </div>
          </template>
          {{ searchFormData.rentPrice }}
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Money />
              </el-icon>
              竞价保证金
            </div>
          </template>
          {{ searchFormData.sureMoney }}
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Money />
              </el-icon>
              履约保证金
            </div>
          </template>
          {{ searchFormData.bondMoney }}
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Clock />
              </el-icon>
              报名时间
            </div>
          </template>
          {{ searchFormData.registerTime }}
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Clock />
              </el-icon>
              竞投时间
            </div>
          </template>
          {{ searchFormData.biddingTime }}
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Notebook />
              </el-icon>
              租金缴交方式
            </div>
          </template>
          {{ searchFormData.payMethod }}
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Notebook />
              </el-icon>
              装修要求
            </div>
          </template>
          {{ searchFormData.decorateRequest }}
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Notebook />
              </el-icon>
              证件手续
            </div>
          </template>
          {{ searchFormData.documentDetail }}
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Notebook />
              </el-icon>
              违约责任
            </div>
          </template>
          {{ searchFormData.contractDuty }}
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Notebook />
              </el-icon>
              瑕疵情况
            </div>
          </template>
          {{ searchFormData.flawSituation }}
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Top />
              </el-icon>
              升级改造
            </div>
          </template>
          {{ searchFormData.upgrade }}
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Edit />
              </el-icon>
              其它说明
            </div>
          </template>
          {{ searchFormData.remark }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<style lang="scss">
.cell-item {
  min-width: 120px;
}
</style>
