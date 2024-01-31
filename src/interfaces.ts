export interface IFormField {
  value: String;
  label: String;
  name: String;
  required: Boolean;
}
export interface IHashRequest {
  txHash: string;
}
export interface IHashResponse {
  success: Boolean
  error: string;
  txHash: string;
  pools: IPool[];
  block: number;
}
export interface IChartResponse {
  success: Boolean
  error: string;
  poolInfo: IPoolInfo
  blocks: IBlock[]
}

export interface IChartRequest {
  poolAddress: string;
  startingBlock: string;
  blocks: string;
}
interface IPoolInfo {
  poolAddress: string;
  token0: string;
  token1: string;
  ticker0: string;
  ticker1: string;
  decimals0: number;
  decimals1: number;
  poolVersion: string;
  startingPrice: string;
}
interface IPrice {
  txHash: string;
  priceAfter: string;
  liquidity0: string;
  liquidity1: string;
  txURL?: string;
}
interface IBlock {
  blockNumber: number;
  prices: IPrice[]
}
export interface IPool {
  Address: string,
  Name: string,
  Token0: string,
  Token1: string,
  Liquidity0: string,
  Liquidity1: string
}
