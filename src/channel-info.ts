import inquirer from 'inquirer';
import { CornixConnection } from './api/axios-cornix';
import { ExchangeSignalsDataEntity } from './api/entity/signals-data/exchange-signals-data.entity';
import { writeOutput } from './common';
import { Config, formatDate, formatDecimal, getDay, getMonth, getOpenDate, timeToHoursByString } from './config';

let cornix: CornixConnection;

type SelectChannelDetail = {
  id: number;
  name: string;
};

type SelectChannelsResult = {
  groups: SelectChannelDetail[];
};

export function writeTrades(text: string) {
  const headers =
    'Exchange,Date,Symbol,Status,"Duration (hours)",Position,Type,Channel,"Entry Progress","TP Progress",Profit,Potential,"Risk/Reward",Day,Month,"Open Date","Open Day","Open Month"';
  writeOutput('statistics.csv', headers, text);
}

async function generateCsvContent(trades: Map<string, ExchangeSignalsDataEntity[]>, isOpen: boolean) {
  if (!trades) {
    return '';
  }
  const body: string[] = [];
  for (const [exchange, infos] of Array.from(trades.entries())) {
    const rowBase = [exchange];
    const rows: string[] = [];
    for (const {
      date,
      // signalId,
      symbol,
      info: { time_passed, entry_progress, take_profit_progress, profit },
      position,
      type,
      group,
      potential,
      rr
    } of infos) {
      const timePassed = timeToHoursByString(time_passed);
      const openDate = getOpenDate(date, isOpen ? 0 : timePassed);
      const rowInfo = [
        formatDate(date),
        symbol,
        isOpen ? 'Open' : 'Closed',
        // formatDecimal(await timeToHours(date, { isOpen, time_passed, signalId, cornix })),
        formatDecimal(timePassed),
        position,
        type,
        group,
        formatDecimal(entry_progress),
        formatDecimal(take_profit_progress),
        formatDecimal(profit * 100),
        formatDecimal(potential),
        formatDecimal(rr.calculateRR()),
        getDay(date),
        getMonth(date),
        formatDate(openDate),
        getDay(openDate),
        getMonth(openDate)
      ];
      rows.push(`"${[...rowBase, ...rowInfo].join('","')}"`);
    }
    body.push(rows.join('\n'));
  }
  return body.join('\n');
}

export async function getTrades(channelId: number, name: string) {
  console.log(`[?] Extracting channel "${name}"`);
  const closedTrades = await cornix.getClosedTrades(channelId);
  const trades: string[] = [];
  if (closedTrades) {
    trades.push(await generateCsvContent(closedTrades, false));
  }
  if (Config.INCLUDE_OPEN) {
    const openTrades = await cornix.getOpenTrades(channelId);
    if (openTrades) {
      trades.push(await generateCsvContent(openTrades, true));
    }
  }
  return trades.join('\n');
}

export async function selectChannels(_cornix: CornixConnection): Promise<SelectChannelsResult | undefined> {
  cornix = _cornix;
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
      return selectChannels(cornix);
    }
    return result;
  }
  return undefined;
}
