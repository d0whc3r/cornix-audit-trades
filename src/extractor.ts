import fs from 'fs';
import inquirer from 'inquirer';
import mkdirp from 'mkdirp';
import path from 'path';
import { CornixConnection } from './api/axios-cornix';
import { ExchangeSignalsDataEntity } from './api/entity/signals-data/signals-data.entity';
import { Config, formatDate, formatDecimal, timeToHours, wait } from './config';

type SelectChannelDetail = {
  id: number;
  name: string;
};

type SelectChannelsResult = {
  groups: SelectChannelDetail[];
};

const OUT_FILE = path.join('./out', 'statistics.csv');
const CHANNELS_IN_ROW = 4;
const SECS_DELAY = 3;
const SECS_BIG_DELAY = 10;
let cornix: CornixConnection;

function writeTrades(text: string) {
  const headers =
    'Exchange,Date,Symbol,Status,"Duration (hours)",Position,Type,Channel,"Entry Progress","TP Progress",Profit,Potential,"Risk/Reward"';
  mkdirp.sync(path.dirname(OUT_FILE));
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.writeFileSync(OUT_FILE, [headers, text.replace(/\n\n/g, '\n')].join('\n'));
}

function generateCsvContent(trades: Map<string, ExchangeSignalsDataEntity[]>, isOpen: boolean) {
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
        isOpen ? 'Opened' : 'Closed',
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

async function getTrades(channelId: number, name: string) {
  console.log(`[?] Extracting channel "${name}"`);
  const closedTrades = await cornix.getClosedTrades(channelId);
  const trades: string[] = [];
  if (closedTrades) {
    trades.push(generateCsvContent(closedTrades, false));
  }
  if (Config.INCLUDE_OPEN) {
    const openTrades = await cornix.getOpenTrades(channelId);
    if (openTrades) {
      trades.push(generateCsvContent(openTrades, true));
    }
  }
  return trades.join('\n');
}

async function selectChannels(): Promise<SelectChannelsResult | undefined> {
  const response = await cornix.getChannels();
  if (response?.data) {
    const choices = Array.from(response.data.entries()).map(([value, name]) => ({ value: { id: value, name }, name }));
    const result = await inquirer.prompt<SelectChannelsResult>([
      {
        type: 'checkbox',
        name: 'groups',
        message: 'Select channels to dump',
        choices
      }
    ]);
    if (!result.groups.length) {
      console.log('[-] No groups selected, please select one or more groups');
      return selectChannels();
    }
    return result;
  }
  return undefined;
}

async function extractor() {
  cornix = new CornixConnection(Config.ACCESS_TOKEN, Config.REFRESH_TOKEN);
  const channelsId = await selectChannels();
  if (!channelsId) {
    console.log('[!] No channels found');
    process.exit(0);
  }
  const { groups } = channelsId;
  const result: string[] = [];
  for (let i = 0; i < groups.length; i++) {
    if (i !== 0) {
      const d = i % (CHANNELS_IN_ROW - 1) ? SECS_DELAY : SECS_BIG_DELAY;
      console.log(`[?] Waiting ${d}secs`);
      await wait(d);
    }
    const { name, id } = groups[+i];
    result.push(await getTrades(id, name));
  }
  writeTrades(result.join('\n'));
}

export default extractor;
