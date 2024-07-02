import { request } from "@/utils/jsonServer"
import type * as Market from "./types/market"

/** 增 */
export function createMarketDataApi(data: Market.CreateOrUpdateMarketRequestData) {
  return request({
    url: "market",
    method: "post",
    data
  })
}

/** 删 */
export function deleteMarketDataApi(id: string) {
  return request({
    url: `market/${id}`,
    method: "delete"
  })
}

/** 改 */
export function updateMarketDataApi(data: Market.CreateOrUpdateMarketRequestData) {
  return request({
    url: "market",
    method: "put",
    data
  })
}

/** 查 */
export function getMarketDataApi(params: Market.GetMarketRequestData) {
  return request<Market.GetMarketResponseData>({
    url: "market",
    method: "get",
    params
  })
}
