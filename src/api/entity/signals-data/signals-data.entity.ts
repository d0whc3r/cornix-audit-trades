import { JsonObject, JsonProperty } from 'json2typescript';
import { SignalsDataDataContentConverter } from '../../converter/signalsdata-data-content.converter';
import { ExchangeSignalsDataEntity } from './exchange-signals-data.entity';
import { SignalsDataData, SignalsDataResponse } from './signals-data.type';

@JsonObject('SignalsDataDataEntity')
export class SignalsDataDataEntity implements SignalsDataData {
  @JsonProperty('data', SignalsDataDataContentConverter)
  data = new Map<string, ExchangeSignalsDataEntity[]>();
  @JsonProperty('headers', [String])
  headers: string[] = [];
  @JsonProperty('info_link', String)
  info_link = '';
}

@JsonObject('SignalsDataResponseEntity')
export class SignalsDataResponseEntity implements SignalsDataResponse {
  @JsonProperty('message', String)
  message = '';
  @JsonProperty('error_type', String)
  error_type = '';
  @JsonProperty('data', SignalsDataDataEntity)
  data = new SignalsDataDataEntity();
  @JsonProperty('code', Number)
  code = 0;
}
