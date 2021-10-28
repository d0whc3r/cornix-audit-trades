/* eslint-disable sonarjs/no-duplicate-string */
export interface ExchangeSignalsDataInfo {
  time_passed: string;
  entry_progress: number;
  take_profit_progress: number;
  profit?: number | null;
}

export interface RiskReward {
  risk: number;
  reward: number;
}

export interface ExchangeSignalsData {
  symbol: string;
  date: Date;
  info: ExchangeSignalsDataInfo;
  position: string;
  type: string;
  group: string;
  rr: RiskReward;
  potential?: number | null;
}

export interface IExchangeSignalsData {
  signal_cards: [number, number, string, number, number, ExchangeSignalsDataInfo, [string, string | null][]][];
}

export type SignalsDataDataContent = Map<string, ExchangeSignalsData[]>;

export interface ISignalsDataDataContent {
  [exchange: string]: IExchangeSignalsData;
}

// export interface Header {
//   'Signal Status'?: any;
//   Exchanges?: any;
// }
//
// export interface Values {
//   'Signal Status': string[];
//   Exchanges: string[];
// }
//
// export interface ButtonType {
//   Exchanges: string;
//   'Signal Status': string;
// }

// export interface Filters {
//   headers: Header[];
//   values: Values;
//   button_type: ButtonType;
// }

// export interface Balance {
//   USD: number;
//   BTC: number;
// }

// export interface ExchangeDataSymbol {
//   price: number;
//   quantity: number;
//   amount: number;
// }

// export interface IExchangeData {
//   [symbol: string]: ExchangeDataSymbol;
// }

// export interface IExchanges {
//   [exchange: string]: IExchangeData;
// }

// export type ExchangeData = Map<string, ExchangeDataSymbol>;
// export type Exchanges = Map<string, ExchangeData>;

// export interface Precision {
//   default: number;
//   balance: Balance;
//   percent: number;
//   exchanges: Exchanges;
// }

export interface SignalsDataData {
  data: SignalsDataDataContent;
  headers: string[];
  // filters: Filters;
  // precision: Precision;
  info_link: string;
}

export interface SignalsDataResponse {
  message: string;
  error_type: string;
  data: SignalsDataData;
  code: number;
}
