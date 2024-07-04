export interface CreateOrUpdateMarketRequestData {
  id: string
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

export interface GetMarketData {
  id: string
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
}

export type GetMarketResponseData = ApiResponseData<{
  list: GetMarketData[]
  total: number
}>
