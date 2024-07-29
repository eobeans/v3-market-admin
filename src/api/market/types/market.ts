export interface CreateOrUpdateMarketRequestData {
  id?: string
  title?: string
  rentPrice?: string // 月租金
  coverArea?: string // 占地面积
  buildArea?: string // 建筑面积
  operaYear?: string // 经营年限
  rentFreeDate?: string // 免租期
  registerMethod?: string //报名方式
  biddingMethod?: string //竞价方式
  sureMoney?: string // 竞价保证金
  bondMoney?: string // 履约保证金
  registerTime?: string // 报名时间
  biddingTime?: string // 竞投时间
  payMethod?: string // 租金缴交方式
  decorateRequest?: string // 装修要求
  documentDetail?: string // 证件手续
  contractDuty?: string
  remark?: string // 其它说明
  flawSituation?: string // 瑕疵情况
  upgrade?: string // 升级改造
  sureMoneyReturnMethod?: string // 保证金退回方式（财务）
  firstRent?: string // 首期租金（财务）
  insure?: string // 保险要求（运营）
  peopleArrange?: string // 人员安排（运营）
  publicTime?: string // 公示时间（运营）
  handoverTime?: string // 交接时间（运营）
  handoverAddress?: string // 交接地点（运营）
  handoverContact?: string // 交接联系人和方式（运营）
  decorateDesc?: string // 装修要求（工程）
  contact?: string // 联系人和方式
}

export interface GetMarketRequestData {
  /** 当前页码 */
  currentPage?: number
  /** 查询条数 */
  size?: number
  /** 查询参数：市场名 */
  title?: string
  /** 当前页码 */
  _page?: number
  /** 查询条数 */
  _limit?: number
  /** 查询参数：市场名 */
  title_like?: string
  /** 查询参数：排序desc asc */
  _order?: string
}

export type GetMarketResponseData = ApiResponseData<{
  list: CreateOrUpdateMarketRequestData[]
  total: number
}>
