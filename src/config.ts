function isTrue(txt = '') {
  return [true, 1, '1', 'true'].includes(txt)
}

export class Config {
  private static _ACCESS_TOKEN = process.env.ACCESS_TOKEN ?? ''

  static get ACCESS_TOKEN() {
    return this._ACCESS_TOKEN
  }

  static set ACCESS_TOKEN(item) {
    this._ACCESS_TOKEN = item
  }

  private static _REFRESH_TOKEN = process.env.REFRESH_TOKEN ?? ''

  static get REFRESH_TOKEN() {
    return this._REFRESH_TOKEN
  }

  static set REFRESH_TOKEN(item) {
    this._REFRESH_TOKEN = item
  }

  private static _REPLACE_DOTS = isTrue(process.env.REPLACE_DOTS)

  static get REPLACE_DOTS() {
    return this._REPLACE_DOTS
  }

  static set REPLACE_DOTS(item) {
    this._REPLACE_DOTS = item
  }

  private static _INCLUDE_OPEN = isTrue(process.env.INCLUDE_OPEN)

  static get INCLUDE_OPEN() {
    return this._INCLUDE_OPEN
  }

  static set INCLUDE_OPEN(item) {
    this._INCLUDE_OPEN = item
  }

  private static _EXTRACT_PROFITS = isTrue(process.env.EXTRACT_PROFITS)

  static get EXTRACT_PROFITS() {
    return this._EXTRACT_PROFITS
  }

  static set EXTRACT_PROFITS(item) {
    this._EXTRACT_PROFITS = item
  }

  private static _CHANNELS_INFO = isTrue(process.env.CHANNELS_INFO)

  static get CHANNELS_INFO() {
    return this._CHANNELS_INFO
  }

  static set CHANNELS_INFO(item) {
    this._CHANNELS_INFO = item
  }
}

export function formatDate(date?: Date, local = true) {
  if (!date) {
    return ''
  }
  if (local) {
    const day = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map((d) => d.toString().padStart(2, '0')).join('-')
    const time = [date.getHours(), date.getMinutes(), date.getSeconds()].map((d) => d.toString().padStart(2, '0')).join(':')
    return `${day} ${time}`
  }
  return date.toISOString().split('.')[0].replace('T', ' ')
}

export function timeToHoursByString(time: string) {
  // eslint-disable-next-line security/detect-unsafe-regex
  const regex = /(?<month>\d{1,5}M)?(?<week>\d{1,5}W)?(?<day>\d{1,5}D)?(?<hour>\d{1,2}h)?(?<min>\d{1,5}m)?/g
  const match = regex.exec(time)
  if (match?.length && match.groups) {
    const { month = '0', week = '0', day = '0', hour = '0', min = '0' } = match.groups
    return (
      Math.floor(
        (+month.replace('M', '') * 24 * 30 +
          +week.replace('W', '') * 24 * 7 +
          +day.replace('D', '') * 24 +
          +hour.replace('h', '') +
          +min.replace('m', '') / 60 || 0) * 100,
      ) / 100
    )
  }
  return 0
}

export function formatDecimal(num: number | string) {
  if (!num) {
    return '0'
  }
  const n = parseFloat(num.toString()).toString()
  if (Config.REPLACE_DOTS) {
    return n.replace('.', ',')
  }
  return n
}

export function wait(secs: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, secs * 1000)
  })
}

export function getDay(date?: Date, local = true) {
  if (!date) {
    return ''
  }
  if (local) {
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()].map((d) => d.toString().padStart(2, '0')).join('-')
  }
  return date.toISOString().split('.')[0].split('T')[0]
}

export function getMonth(date?: Date, local = true) {
  if (!date) {
    return ''
  }
  if (local) {
    return [date.getFullYear(), date.getMonth() + 1, 1].map((d) => d.toString().padStart(2, '0')).join('-')
  }
  return date.toISOString().split('.')[0].split('T')[0].split('-').slice(0, 2).join('-')
}

export function getOpenDate(date: Date, diffHours: number, local = true) {
  if (!date) {
    return undefined
  }
  const openDate = local ? new Date(date) : new Date(date.toISOString())
  const diffMinutes = diffHours * 60
  openDate.setMinutes(openDate.getMinutes() - diffMinutes)
  return openDate
}
