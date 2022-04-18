import { Command, Option } from 'commander'
import { version } from '../package.json'
import { Config } from './config'
import extractor from './extractor'

const program = new Command()

type OptionsType = {
  auth: string
  refresh: string
  dot?: boolean
  open?: boolean
  profit?: boolean
  channels?: boolean
}

const exchangeOptions = [
  new Option('-a, --access <access_token>', 'cornix dashboard auth token').env('ACCESS_TOKEN'),
  new Option('-r, --refresh <refresh_token>', 'cornix dashboard refresh token').env('REFRESH_TOKEN'),
].map((o) => o.makeOptionMandatory(true))

program
  .version(version)
  .addOption(exchangeOptions[0])
  .addOption(exchangeOptions[1])
  .addOption(new Option('-d, --dot', 'use dot as decimal separator').env('REPLACE_DOT'))
  .addOption(new Option('-o, --open', 'include open trades').env('INCLUDE_OPEN'))
  .addOption(new Option('-c, --channels', 'extract channels info').env('CHANNELS_INFO'))
  .addOption(new Option('-p, --profit', 'extract profits').env('EXTRACT_PROFITS'))

program.parse(process.argv)

const { auth, refresh, dot, open, profit, channels } = program.opts<OptionsType>()

Config.ACCESS_TOKEN = auth
Config.REFRESH_TOKEN = refresh
Config.REPLACE_DOTS = !dot
Config.INCLUDE_OPEN = !!open
Config.EXTRACT_PROFITS = !!profit
Config.CHANNELS_INFO = !!channels

if (!Config.EXTRACT_PROFITS && !Config.CHANNELS_INFO) {
  console.log('You must specify at least one of the following options: --profit (-p), --channels (-c)')
  process.exit(1)
}

void extractor()
