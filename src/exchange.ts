import * as ccxt from 'ccxt';

export enum Exchange {
  BINANCE = 'binance',
  'BINANCE FUTURES' = 'binance futures',
  KRAKEN = 'kraken',
  BITMEX = 'bitmex',
  FTX = 'ftx',
  KUCOIN = 'kucoin',
  HUOBI = 'huobi.pro',
  OKEX = 'okex',
  BITTREX = 'bittrex'
}

export type ValidExchange = ccxt.binance | ccxt.ftx | ccxt.huobipro | ccxt.bitmex | ccxt.kraken | ccxt.kucoin | ccxt.okex;

const EXCHANGES = new Map<Exchange, ValidExchange>();

async function getExchange(exchange: Exchange) {
  if (!EXCHANGES.has(exchange)) {
    let ex: ValidExchange;
    switch (exchange) {
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
        console.error('Unknown exchange', exchange);
        return undefined;
    }
    ex.enableRateLimit = true;
    ex.options.defaultType = 'future';
    await ex.loadMarkets(true);
    EXCHANGES.set(exchange, ex);
  }
  return EXCHANGES.get(exchange)!;
}

export function parsePrice(ticker: string, price: number, exchange = Exchange.BINANCE) {
  return getExchange(exchange).then((ex) => {
    if (ex) {
      const market = ex.market(ticker);
      const decimals = 10 ** market.precision.price;
      return Math.round(price * decimals) / decimals;
    }
    return price;
  });
}
