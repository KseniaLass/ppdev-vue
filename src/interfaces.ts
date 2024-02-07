export interface IFormField {
  value: string
  label: string
  name: string
  required: boolean
}
export interface IHashRequest {
  txHash: string
}
export interface IHashResponse {
  success: boolean
  error: string
  txHash: string
  pools: IPool[]
  block: number
}
export interface IChartResponse {
  success: boolean
  error: string
  poolInfo: IPoolInfo
  blocks: IBlock[]
}
export interface IChartRequest {
  poolAddress: string
  startingBlock: string
  blocks: string
}
export interface IPool {
  Address: string
  Name: string
  Token0: string
  Token1: string
  Liquidity0: string
  Liquidity1: string
}
export interface IPrice {
  txHash: string
  priceAfter: string
  liquidity0: string
  liquidity1: string
  txURL?: string
}
// y: [open, high, low, close]
export interface ICandle {
  x: string,
  y: [string, string, string, string],
  prices: IPrice[]
}
export interface IPoolInfo {
  poolAddress: string
  token0: string
  token1: string
  ticker0: string
  ticker1: string
  decimals0: number
  decimals1: number
  poolVersion: string
  startingPrice: string
}
interface IBlock {
  blockNumber: number
  prices: IPrice[]
}
