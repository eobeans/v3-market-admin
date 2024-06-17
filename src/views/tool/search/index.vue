<script lang="ts" setup>
import { reactive, ref, computed } from "vue"
import { type FormInstance, type FormRules, ComponentSize } from "element-plus"
import { Iphone, OfficeBuilding, House, Star } from "@element-plus/icons-vue"

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

/** 表单数据 */
const searchFormData: any = reactive({
  title: "", // 标题
  rentPrice: "", // 月租金
  coverArea: "", // 占地面积
  buildArea: "", // 建筑面积
  payMethod: "", // 租金缴交方式
  operaYear: "", // 经营年限
  rentFreeDate: "", // 免租期
  registerMethod: "", //报名方式
  sureMoney: "", // 竞价保证金
  bondMoney: "", // 履约保证金
  decorateRequest: "", // 装修要求
  documentDetail: "", // 证件手续
  contractDuty: "" // 违约责任
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
</script>
<template>
  <div flex flex-row w-full m10>
    <div w-120>
      <el-form
        ref="searchFormRef"
        :model="searchFormData"
        :rules="formRules"
        label-width="120"
        @keyup.enter="handleLogin"
      >
        <el-form-item prop="title" label="标题">
          <el-input v-model.trim="searchFormData.title" placeholder="标题" type="text" />
        </el-form-item>
        <el-form-item prop="rentPrice" label="月租金">
          <el-input v-model.trim="searchFormData.rentPrice" placeholder="月租金" type="text" />
        </el-form-item>
        <el-form-item prop="coverArea" label="占地面积">
          <el-input v-model.trim="searchFormData.coverArea" placeholder="占地面积" type="text" />
        </el-form-item>
        <el-form-item prop="buildArea" label="建筑面积">
          <el-input v-model.trim="searchFormData.buildArea" placeholder="建筑面积" type="text" />
        </el-form-item>
        <el-form-item prop="operaYear" label="经营年限">
          <el-input v-model.trim="searchFormData.operaYear" placeholder="经营年限" type="text" />
        </el-form-item>
        <el-form-item prop="rentFreeDate" label="免租期">
          <el-input v-model.trim="searchFormData.rentFreeDate" placeholder="免租期" type="text" />
        </el-form-item>
        <el-form-item prop="registerMethod" label="报名方式">
          <el-input v-model.trim="searchFormData.registerMethod" placeholder="报名方式" type="text" />
        </el-form-item>
        <el-form-item prop="sureMoney" label="竞价保证金">
          <el-input v-model.trim="searchFormData.sureMoney" placeholder="竞价保证金" type="text" />
        </el-form-item>
        <el-form-item prop="bondMoney" label="履约保证金">
          <el-input v-model.trim="searchFormData.bondMoney" placeholder="履约保证金" type="text" />
        </el-form-item>
        <el-form-item prop="payMethod" label="租金缴交方式">
          <el-input
            v-model.trim="searchFormData.payMethod"
            placeholder="租金缴交方式"
            :autosize="{ minRows: 2, maxRows: 10 }"
            type="textarea"
          />
        </el-form-item>
        <el-form-item prop="decorateRequest" label="装修要求">
          <el-input
            v-model.trim="searchFormData.decorateRequest"
            placeholder="装修要求"
            :autosize="{ minRows: 2, maxRows: 10 }"
            type="textarea"
          />
        </el-form-item>
        <el-form-item prop="documentDetail" label="证件手续">
          <el-input
            v-model.trim="searchFormData.documentDetail"
            placeholder="证件手续"
            :autosize="{ minRows: 2, maxRows: 10 }"
            type="textarea"
          />
        </el-form-item>
        <el-form-item prop="contractDuty" label="违约责任">
          <el-input
            v-model.trim="searchFormData.contractDuty"
            placeholder="违约责任"
            :autosize="{ minRows: 2, maxRows: 10 }"
            type="textarea"
          />
        </el-form-item>
      </el-form>
    </div>
    <div w-300 flex justify-center>
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
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <ArrowUpBold />
              </el-icon>
              月租金
            </div>
          </template>
          {{ searchFormData.rentPrice }}
        </el-descriptions-item>
        <el-descriptions-item>
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
        <el-descriptions-item>
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
        <el-descriptions-item>
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
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <BellFilled />
              </el-icon>
              免租期
            </div>
          </template>
          {{ searchFormData.rentFreeDate }}
        </el-descriptions-item>
        <el-descriptions-item>
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
        <el-descriptions-item>
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
        <el-descriptions-item :span="2">
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
                <AlarmClock />
              </el-icon>
              违约责任
            </div>
          </template>
          {{ searchFormData.contractDuty }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>
