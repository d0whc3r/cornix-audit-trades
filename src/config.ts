import { CornixConnection } from './api/axios-cornix';
import { ExchangeSignalsData, ExchangeSignalsDataInfo } from './api/entity/signals-data/signals-data.type';

function isTrue(txt = '') {
  return [true, 1, '1', 'true'].includes(txt);
}

export class Config {
  static _ACCESS_TOKEN = process.env.ACCESS_TOKEN || '';

  static get ACCESS_TOKEN() {
    return this._ACCESS_TOKEN;
  }

  static set ACCESS_TOKEN(item) {
    this._ACCESS_TOKEN = item;
  }

  static _REFRESH_TOKEN = process.env.REFRESH_TOKEN || '';

  static get REFRESH_TOKEN() {
    return this._REFRESH_TOKEN;
  }

  static set REFRESH_TOKEN(item) {
    this._REFRESH_TOKEN = item;
  }

  static _REPLACE_DOTS = isTrue(process.env.REPLACE_DOTS);

  static get REPLACE_DOTS() {
    return this._REPLACE_DOTS;
  }

  static set REPLACE_DOTS(item) {
    this._REPLACE_DOTS = item;
  }

  static _INCLUDE_OPEN = isTrue(process.env.INCLUDE_OPEN);

  static get INCLUDE_OPEN() {
    return this._INCLUDE_OPEN;
  }

  static set INCLUDE_OPEN(item) {
    this._INCLUDE_OPEN = item;
  }

  static _PRECISE_TIME = isTrue(process.env.PRECISE_TIME);

  static get PRECISE_TIME() {
    return this._PRECISE_TIME;
  }

  static set PRECISE_TIME(item) {
    this._PRECISE_TIME = item;
  }
}

export function formatDate(date?: Date, local = true) {
  if (!date) {
    return '';
  }
  if (local) {
    const day = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map((d) => d.toString().padStart(2, '0')).join('-');
    const time = [date.getHours(), date.getMinutes(), date.getSeconds()].map((d) => d.toString().padStart(2, '0')).join(':');
    return `${day} ${time}`;
  }
  return date.toISOString().split('.')[0].replace('T', ' ');
}

export function timeToHoursByString(time: string) {
  // eslint-disable-next-line security/detect-unsafe-regex
  const regex = /(?<min>\d{1,5}min)?(?<month>\d{1,5}m)?(?<week>\d{1,5}w)?(?<day>\d{1,5}d)?(?<hour>\d{1,2}h)?/gi;
  const match = regex.exec(time);
  if (match?.length && match.groups) {
    const { month = '0', week = '0', day = '0', hour = '0', min = '0' } = match.groups;
    return Math.floor(
      +month.replace('m', '') * 24 * 30 +
        +week.replace('w', '') * 24 * 7 +
        +day.replace('d', '') * 24 +
        +hour.replace('h', '') +
        +min.replace('min', '') / 60 || 0
    );
  }
  return 0;
}

// eslint-disable-next-line max-params
async function getCloseDate(cornix: CornixConnection, openDate: Date, signalId: number, time_passed: string, loop = 0): Promise<Date | undefined> {
  if (time_passed.includes('m') && Config.PRECISE_TIME) {
    console.log('Getting trade info', time_passed, signalId);
    return (await cornix.getTradeInfo(signalId))?.data.general.closedAt;
  }
  const closeDate = new Date(openDate.toISOString());
  const hours = timeToHoursByString(time_passed);
  closeDate.setHours(closeDate.getHours() + hours);
  if (+closeDate > +new Date() && !loop) {
    return getCloseDate(cornix, openDate, signalId, time_passed.replace('m', 'min'), 1);
  }
  return closeDate;
}

export type TimeToHoursExtra = Pick<ExchangeSignalsData, 'signalId'> &
  Pick<ExchangeSignalsDataInfo, 'time_passed'> & {
    isOpen: boolean;
    cornix: CornixConnection;
  };

export async function timeToHours(openDate: Date, { signalId, isOpen, time_passed, cornix }: TimeToHoursExtra) {
  const closeDate = isOpen ? new Date() : await getCloseDate(cornix, openDate, signalId, time_passed);
  if (!closeDate) {
    return 0;
  }
  return Math.round((Math.abs(+closeDate - +openDate) / 1000 / 60 / 60) * 100) / 100;
}

export function formatDecimal(num: number | string) {
  if (!num) {
    return '0';
  }
  const n = parseFloat(num.toString());
  if (Config.REPLACE_DOTS) {
    return n.toString().replace('.', ',');
  }
  return n.toString();
}

export function wait(secs: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, secs * 1000);
  });
}
