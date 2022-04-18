import { JsonConverter, JsonCustomConvert } from 'json2typescript'
import { ISignalsExtraInfoDataDataGeneral, SignalsExtraInfoDataDataGeneral } from '../entity/signal-extra-info/signals-extra-info.types'

@JsonConverter
export class SignalsExtraGeneralDataDataConverter implements JsonCustomConvert<SignalsExtraInfoDataDataGeneral> {
  public deserialize(data: ISignalsExtraInfoDataDataGeneral): SignalsExtraInfoDataDataGeneral {
    const [[, position], [, type], [, exchanges], [, group], [, open], [, openTrades], [, trades], [, volume], [, close]] = data
    return {
      position,
      type,
      exchanges: exchanges.split(',').map((x) => x.trim()),
      group,
      openedAt: new Date(open),
      openTrades,
      trades,
      volume,
      closedAt: new Date(close),
    }
  }

  public serialize(data: SignalsExtraInfoDataDataGeneral): any {
    return data
  }
}
