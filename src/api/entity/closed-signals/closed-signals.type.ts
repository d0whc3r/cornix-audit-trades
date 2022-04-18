export interface Total {
  allocated: number
  invested: number
}

export interface Total3 {
  change: number
}

export type AccountInfoOperation = [
  number, // id
  string, // pair
  number, // current price
  number, // amount
  number, // ??
  number,
  number,
  number,
  number,
  number,
  number,
  {
    time_passed: string
    entry_progress: number
    take_profit_progress: number
    profit: number
  },
  string, // exchange
  string, // account name
  string, // channel
  string, // leverage
  string, // potential profit
  number,
  number,
  number, // date * 1000 (timestamp)
  string, // position (Long, Short)
  string, // type (Regular, breakout)
  string, // Fulfilled, Cancelled, Partial Fulfilled, Position Closed, Stopped Out
]

export interface AccountInfo {
  total: Total3
  trade_cards: AccountInfoOperation[]
}

export interface ExchangeAccounts {
  [accountName: string]: AccountInfo
}

export type ClosedTradesDataExchanges = {
  [exchange in SupportedExchange]: ExchangeAccounts
}

export interface ClosedTradesData extends ClosedTradesDataExchanges {
  total: Total
}

export interface Data {
  data: ClosedTradesData
}

export interface ClosedTrades {
  message: string
  error_type: string
  data: Data
  code: number
}

export type SupportedExchange =
  | 'Binance'
  | 'Binance Futures'
  | 'Binance Coin-Futures'
  | 'FTX'
  | 'FTX Futures'
  | 'Kucoin'
  | 'ByBit'
  | 'ByBit USDT'
  | 'Bittrex'
  | 'BitMEX'
  | 'Huobi.pro'
