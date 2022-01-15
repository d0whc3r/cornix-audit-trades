export interface GraphData {
  time_passed: string;
  entry_progress: number;
  take_profit_progress: number;
  profit: number;
}

export interface SignalsExtraInfoDataDataGeneral {
  position: string;
  type: string;
  exchanges: string[];
  group: string;
  openedAt: Date;
  openTrades: number;
  trades: number;
  volume: number;
  closedAt: Date;
}

export type ISignalsExtraInfoDataDataGeneral = [
  ['Long/Short', string],
  ['Signal Type', string],
  ['Exchanges', string],
  ['Group', string],
  ['Opened at', number],
  ['Number of open trades', number],
  ['Number of trades', number],
  ['Open Trades Volume', number],
  ['Closed at', number]
];

export interface SignalsExtraInfoDataData {
  general: SignalsExtraInfoDataDataGeneral;
  graph_data: GraphData;
}

export interface Precision {
  default: number;
  price: number;
}

export interface SignalsExtraInfoData {
  data: SignalsExtraInfoDataData;
  precision: Precision;
}

export interface SignalsExtraInfo {
  message: string;
  error_type: string;
  data: SignalsExtraInfoData;
  code: number;
}
