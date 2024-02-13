export interface IFormField {
  name: string
  value: string | number
  type: InputType
  required: boolean
}
export interface IPoolsRequest {
  txHash: string
}
export interface IPoolsResponse {
  success: boolean
  error: string
  txHash: string
  pools: IPool[]
  block: number
}
export interface IBlocksResponse {
  success: boolean
  error: string
  poolInfo: IPoolInfo
  blocks: IBlock[]
}
export interface IBlocksRequest {
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
  coinbaseTransfer: string
  fee: string
  impact: string
  liquidity0: string
  liquidity1: string
  priceAfter: string
  sender: string
  side: string
  txHash: string
  x: string
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
type InputType = 'text' | 'number' | 'select'
