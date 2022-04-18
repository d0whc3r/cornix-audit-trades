import { CornixConnection } from './api/axios-cornix'
import { ExchangeAccounts } from './api/entity/closed-signals/closed-signals.type'
import { getTrades, selectChannels, writeTrades } from './channel-info'
import { Config, formatDate, formatDecimal, getDay, getMonth, getOpenDate, timeToHoursByString, wait } from './config'
import { writeProfits } from './profits'

const CHANNELS_IN_ROW = 4
const SECS_DELAY = 3
const SECS_BIG_DELAY = 10
let cornix: CornixConnection

async function getChannelsInfo() {
  const channelsId = await selectChannels(cornix)
  if (!channelsId) {
    console.log('[!] No channels found')
    process.exit(0)
  }
  const { groups } = channelsId
  const result: string[] = []
  for (let i = 0; i < groups.length; i++) {
    if (i !== 0) {
      const d = i % (CHANNELS_IN_ROW - 1) ? SECS_DELAY : SECS_BIG_DELAY
      console.log(`[?] Waiting ${d}secs`)
      await wait(d)
    }
    const { name, id } = groups[+i]
    result.push(await getTrades(id, name))
  }
  writeTrades(result.join('\n'))
}

type ProfitExtractResult = {
  exchange: string
  date: string
  symbol: string
  status: string
  duration: string
  position: string
  type: string
  account: string
  channel: string
  entry_progress: string
  take_profit_progress: string
  profit: string
  leverage: string
  potential: string
  day: string
  month: string
  openDate: string
  openDay: string
  openMonth: string
}

async function getProfits() {
  const ownClosedTrades = await cornix.getOwnClosedTrades()
  const result: string[] = []
  if (ownClosedTrades) {
    Object.entries(ownClosedTrades).forEach(([key, value]) => {
      if (key !== 'total') {
        Object.values(value as ExchangeAccounts).forEach(({ trade_cards }) => {
          trade_cards.forEach((trade_card) => {
            const [, symbol, , , , , , , , , , info, exchange, account, channel, leverage, potential_profit, , , date, position, type, status] =
              trade_card
            const { profit, time_passed, take_profit_progress, entry_progress } = info
            const valueDate = new Date(date * 1000)
            const duration = timeToHoursByString(time_passed)
            const openDate = getOpenDate(valueDate, duration)
            const content: ProfitExtractResult = {
              exchange,
              date: formatDate(valueDate),
              symbol,
              status,
              duration: formatDecimal(duration),
              position,
              type,
              account,
              channel,
              entry_progress: formatDecimal(entry_progress),
              take_profit_progress: formatDecimal(take_profit_progress),
              profit: formatDecimal(profit),
              leverage: leverage ?? '1',
              potential: formatDecimal(potential_profit),
              day: getDay(valueDate),
              month: getMonth(valueDate),
              openDate: formatDate(openDate),
              openDay: getDay(openDate),
              openMonth: getMonth(openDate),
            }
            result.push(`"${Object.values(content).join('","')}"`)
          })
        })
      }
    })
  }
  writeProfits(result.join('\n'))
}

async function extractor() {
  cornix = new CornixConnection(Config.ACCESS_TOKEN, Config.REFRESH_TOKEN)
  if (Config.CHANNELS_INFO) {
    await getChannelsInfo()
  }
  if (Config.EXTRACT_PROFITS) {
    await getProfits()
  }
}

export default extractor
