export interface ExchangeSignalsDataInfo {
  time_passed: string
  entry_progress: number
  take_profit_progress: number
  profit?: number | null
}

export interface RiskReward {
  risk: number
  reward: number
}

export enum MarginType {
  ISOLATED = 1,
  CROSS = 2,
}

export interface ExchangeSignalsData {
  signalId: number
  symbol: string
  date: Date
  info: ExchangeSignalsDataInfo
  position: string
  type: string
  group: string
  rr: RiskReward
  potential?: number | null
  marginType: string
  leverage: number
}

export interface IExchangeSignalsData {
  signal_cards: [
    number,
    string,
    number,
    number,
    number,
    number,
    number,
    ExchangeSignalsDataInfo,
    [string, string | number | null][],
    number[],
    number[],
    number[],
    number[],
    number[],
    number[],
    number[],
    number[],
  ][]
}

export type SignalsDataDataContent = Map<string, ExchangeSignalsData[]>

export interface ISignalsDataDataContent {
  [exchange: string]: IExchangeSignalsData
}

export interface SignalsDataData {
  data: SignalsDataDataContent
  headers: string[]
  // filters: Filters;
  // precision: Precision;
  info_link: string
}

export interface SignalsDataResponse {
  message: string
  error_type: string
  data: SignalsDataData
  code: number
}
