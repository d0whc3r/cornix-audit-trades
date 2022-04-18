import { writeOutput } from './common'

export function writeProfits(text: string) {
  const headers =
    'Exchange,Date,Symbol,Status,"Duration (hours)",Position,Type,Account,Channel,"Entry Progress","TP Progress",Profit,Leverage,Potential,Day,Month,"Open Date","Open Day","Open Month"'
  writeOutput('profits.csv', headers, text)
}
