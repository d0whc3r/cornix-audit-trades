// @JsonObject('TotalEntity')
// export class TotalEntity implements Total {
//   @JsonProperty('allocated', Number)
//   allocated = 0;
//   @JsonProperty('invested', Number)
//   invested = 0;
// }
//
// @JsonObject('ClosedTradesDataEntity')
// export class ClosedTradesDataEntity implements ClosedTradesData {
//   'Binance Coin-Futures': ExchangeAccounts;
//   'Binance Futures': ExchangeAccounts;
//   'ByBit USDT': ExchangeAccounts;
//   'FTX Futures': ExchangeAccounts;
//   'Huobi.pro': ExchangeAccounts;
//   Binance: ExchangeAccounts;
//   BitMEX: ExchangeAccounts;
//   Bittrex: ExchangeAccounts;
//   ByBit: ExchangeAccounts;
//   FTX: ExchangeAccounts;
//   Kucoin: ExchangeAccounts;
//   total: Total;
// }

// @JsonObject('DataEntity')
// export class DataEntity implements Data {
//   @JsonProperty('data', ClosedTradesDataConverter)
//   data = new ClosedTradesDataEntity();
// }
//
// @JsonObject('ClosedTradesEntity')
// export class ClosedTradesEntity implements ClosedTrades {
//   @JsonProperty('code', Number)
//   code = 0;
//   @JsonProperty('data', DataEntity)
//   data = new DataEntity();
//   @JsonProperty('error_type', String)
//   error_type = '';
//   @JsonProperty('message', String)
//   message = '';
// }
