import { JsonObject, JsonProperty } from 'json2typescript'
import { SignalsExtraGeneralDataDataConverter } from '../../converter/signals-extra-general-data-data.converter'
import {
  GraphData,
  Precision,
  SignalsExtraInfo,
  SignalsExtraInfoData,
  SignalsExtraInfoDataData,
  SignalsExtraInfoDataDataGeneral,
} from './signals-extra-info.types'

@JsonObject('GraphDataEntity')
export class GraphDataEntity implements GraphData {
  @JsonProperty('time_passed', String)
  time_passed = ''
  @JsonProperty('entry_progress', Number)
  entry_progress = 0
  @JsonProperty('take_profit_progress', Number)
  take_profit_progress = 0
  @JsonProperty('profit', Number)
  profit = 0
}

@JsonObject('SignalsExtraInfoDataDataEntity')
export class SignalsExtraInfoDataDataEntity implements SignalsExtraInfoDataData {
  @JsonProperty('general', SignalsExtraGeneralDataDataConverter)
  general: SignalsExtraInfoDataDataGeneral = {
    position: '',
    type: '',
    exchanges: [],
    group: '',
    openedAt: new Date(),
    openTrades: 0,
    trades: 0,
    volume: 0,
    closedAt: new Date(),
  }
  @JsonProperty('general', GraphDataEntity)
  graph_data = new GraphDataEntity()
}

@JsonObject('PrecisionEntity')
export class PrecisionEntity implements Precision {
  @JsonProperty('default', Number)
  default = 0
  @JsonProperty('price', Number)
  price = 0
}

@JsonObject('SignalsExtraInfoDataEntity')
export class SignalsExtraInfoDataEntity implements SignalsExtraInfoData {
  @JsonProperty('data', SignalsExtraInfoDataDataEntity)
  data = new SignalsExtraInfoDataDataEntity()
  @JsonProperty('precision', PrecisionEntity)
  precision = new PrecisionEntity()
}

@JsonObject('SignalsExtraInfoEntity')
export class SignalsExtraInfoEntity implements SignalsExtraInfo {
  @JsonProperty('message', String)
  message = ''
  @JsonProperty('error_type', String)
  error_type = ''
  @JsonProperty('data', SignalsExtraInfoDataEntity)
  data = new SignalsExtraInfoDataEntity()
  @JsonProperty('code', Number)
  code = 0
}
