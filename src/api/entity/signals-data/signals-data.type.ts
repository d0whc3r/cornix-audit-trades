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
}

export interface IExchangeSignalsData {
  signal_cards: [number, number, string, number, number, ExchangeSignalsDataInfo, [string, string | null][]][]
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
