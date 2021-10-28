import * as ccxt from 'ccxt';

export enum Exchange {
  BINANCE = 'binance',
  KRAKEN = 'kraken',
  BITMEX = 'bitmex',
  FTX = 'ftx',
  KUCOIN = 'kucoin',
  HUOBI = 'huobi.pro',
  OKEX = 'okex',
  BITTREX = 'bittrex'
}

export type ExchangeInfo = {
  name: Exchange;
  futures?: boolean;
  apiKey: string;
  apiSecret: string;
};

export type ValidExchange = ccxt.binance | ccxt.ftx | ccxt.huobipro | ccxt.bitmex | ccxt.kraken | ccxt.kucoin | ccxt.okex;

const EXCHANGES = new Map<Exchange, ValidExchange>();

export async function getExchange({ apiSecret, apiKey, name, futures }: ExchangeInfo) {
  if (!EXCHANGES.has(name)) {
    let ex: ValidExchange;
    switch (name) {
      case Exchange.BINANCE:
        ex = new ccxt.binance();
        break;
      case Exchange.FTX:
        ex = new ccxt.ftx();
        break;
      case Exchange.HUOBI:
        ex = new ccxt.huobipro();
        break;
      case Exchange.BITMEX:
        ex = new ccxt.bitmex();
        break;
      case Exchange.KRAKEN:
        ex = new ccxt.kraken();
        break;
      case Exchange.KUCOIN:
        ex = new ccxt.kucoin();
        break;
      case Exchange.OKEX:
        ex = new ccxt.okex();
        break;
      case Exchange.BITTREX:
        ex = new ccxt.bittrex();
        break;
      default:
        console.error('Unknown exchange', name);
        return undefined;
    }
    ex.enableRateLimit = true;
    ex.options.defaultType = futures ? 'future' : 'spot';
    ex.apiKey = apiKey;
    ex.secret = apiSecret;
    await ex.loadMarkets(true);
    EXCHANGES.set(name, ex);
  }
  return EXCHANGES.get(name)!;
}
