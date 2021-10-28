import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import { CornixConnection } from './api/axios-cornix';
import { ExchangeSignalsDataEntity } from './api/entity/signals-data/signals-data.entity';
import { Config, formatDate, formatDecimal, timeToHours } from './config';

const OUT_FILE = path.join('./out', 'statistics.csv');
const cornix = new CornixConnection(Config.AUTH_TOKEN, Config.REFRESH_TOKEN);

function writeTrades(text: string) {
  const headers = 'Exchange,Date,Symbol,"Duration (hours)",Position,Type,Channel,"Entry Progress","TP Progress",Profit,Potential,"Risk/Reward"';
  mkdirp.sync(path.dirname(OUT_FILE));
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.writeFileSync(OUT_FILE, [headers, text.replace(/\n\n/g, '\n')].join('\n'));
}

function generateCsvContent(trades: Map<string, ExchangeSignalsDataEntity[]>) {
  if (!trades) {
    return '';
  }
  const body: string[] = [];
  Array.from(trades.entries()).forEach(([exchange, infos]) => {
    const rowBase = [exchange];
    const rows: string[] = [];
    infos.forEach(({ date, symbol, info: { time_passed, entry_progress, take_profit_progress, profit }, position, type, group, potential, rr }) => {
      const rowInfo = [
        formatDate(date),
        symbol,
        formatDecimal(timeToHours(time_passed)),
        position,
        type,
        group,
        formatDecimal(entry_progress),
        formatDecimal(take_profit_progress),
        formatDecimal(profit * 100),
        formatDecimal(potential),
        formatDecimal(rr.calculateRR())
      ];
      rows.push(`"${[...rowBase, ...rowInfo].join('","')}"`);
    });
    body.push(rows.join('\n'));
  });
  return body.join('\n');
}

async function getTrades(channelId: number) {
  console.log('[?] Extracting channel', channelId);
  const closedTrades = await cornix.getClosedTrades(channelId);
  const openTrades = await cornix.getOpenTrades(channelId);
  const trades: string[] = [];
  if (closedTrades) {
    trades.push(generateCsvContent(closedTrades));
  }
  if (openTrades) {
    trades.push(generateCsvContent(openTrades));
  }
  return trades.join('\n');
}

function wait(secs: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, secs * 1000);
  });
}

async function extractor() {
  const channelsId = [
    2260, 5065, 5316, 6294, 4955, 4957, 4958, 5585, 5605, 5958, 6610, 6627, 6631, 7465, 6683, 6767, 6719, 6886, 6867, 6870, 6868, 6370, 7037, 4286,
    3922, 3985, 3923, 4048, 673
  ].filter((x, i, a) => a.indexOf(x) === i);
  // const channelsId = [2260, 5065].filter((x, i, a) => a.indexOf(x) === i);
  const delay = 3;
  const bigDelay = 10;
  const result: string[] = [];
  for (let i = 0; i < channelsId.length; i++) {
    if (i !== 0) {
      const d = i % 4 ? delay : bigDelay;
      console.log(`[?] Waiting ${d}secs`);
      await wait(d);
    }
    result.push(await getTrades(channelsId[+i]));
  }
  writeTrades(result.join('\n'));
}

export default extractor;
