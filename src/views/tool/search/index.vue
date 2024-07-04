<script lang="ts" setup>
import { reactive, ref, computed } from "vue"
import { type FormInstance, type FormRules, ComponentSize } from "element-plus"
import { Iphone, OfficeBuilding, House, Star, Edit, Shop } from "@element-plus/icons-vue"
import { generateSecureRandomString } from "@/utils"
import { createMarketDataApi, updateMarketDataApi } from "@/api/market"
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

/** 表单数据 */
const searchFormData: CreateOrUpdateMarketRequestData = reactive({
  id: "",
  title: "珠海市斗门区路南永就围新青农贸市场交易公告", // 标题
  rentPrice: "19.5万元/月", // 月租金
  coverArea: "3684.00 平方米", // 占地面积
  buildArea: "/", // 建筑面积
  operaYear: "3", // 经营年限
  rentFreeDate: "无", // 免租期
  registerMethod: "网上报名", //报名方式
  biddingMethod: "网络竞价", //竞价方式
  sureMoney: "180万元", // 竞价保证金
  bondMoney: "180万元", // 履约保证金
  registerTime: "2024-06-19 09:00:00 至 2024-07-09 17:30:00", // 报名时间
  biddingTime: "竞投意向人请于 2024-07-10 10:00 前准时参加网上竞投，超过指定交易时间，视为放弃竞投资格。", // 竞投时间
  payMethod: "月缴，租金无递增", // 租金缴交方式
  decorateRequest: "无", // 装修要求
  documentDetail: "", // 证件手续
  contractDuty:
    "（二）乙方擅自改变该房屋的用途或不合理使用给该房屋造成永久性损害的，经检测单位确认后，甲方有权收回该房屋使用权并没收合同履约保证金，乙方还应承担房屋功能恢复责任，无法全部恢复的，承担赔偿责任。 （三）乙方必须合法经营，严禁在租赁物业内违章搭建或违章改造。在租期内乙方不得将作为废品回收行业或再生资源行业使用。甲方若发现乙方有任何违法经营或违约行为，有权单方面终止租赁合同，没收合同履约保证金并无条件收 回租赁物业有权要求乙方承担违约责任并赔偿甲方全部经济损失。如任何一方违约，守约方为维护权益向违约方追偿的一切费用(包括但不限于律师费、诉讼费、保全费、交通费、差旅费、鉴定费等等)均由违约方承担。", // 违约责任
  remark: "" // 其它说明
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

/** 表单填充逻辑 */
const handleLogin = () => {
  console.log("显示格式化后的内容")
}

// 保存JSON数据
const saveForm = () => {
  console.log(searchFormData)
  const params: CreateOrUpdateMarketRequestData = searchFormData
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
    <div>
      <el-form
        ref="searchFormRef"
        :model="searchFormData"
        :rules="formRules"
        label-width="120"
        @keyup.enter="handleLogin"
      >
        <el-row :gutter="20" style="width: 100%">
          <el-col :span="24">
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
          <el-col :span="8">
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
            <el-form-item prop="remark" label="其它说明">
              <el-input
                v-model.trim="searchFormData.remark"
                placeholder="其它说明"
                :autosize="{ minRows: 2, maxRows: 10 }"
                type="textarea"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div flex justify-center>
      <el-descriptions class="margin-top" :title="searchFormData.title" :column="3" :size="size" border>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Star />
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
                <HomeFilled />
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
                <OfficeBuilding />
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
                <AlarmClock />
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
                <Shop />
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
                <Van />
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
                <Coin />
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
                <Goods />
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
                <Scissor />
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
                <Edit />
              </el-icon>
              其它说明
            </div>
          </template>
          {{ searchFormData.remark }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div mt-6 text-center>
      <el-button type="primary" @click="saveForm">保存</el-button>
      <!-- <el-button type="primary" @click="exportExcel">导出Excel文件</el-button> -->
    </div>
  </div>
</template>

<style lang="scss">
.cell-item {
  min-width: 120px;
}
</style>
