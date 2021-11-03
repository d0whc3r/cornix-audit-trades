import { JsonObject, JsonProperty } from 'json2typescript';
import { SignalGroupsDataDataConverter } from '../../converter/signal-groups-data-data.converter';
import { SignalGroupsData, SignalGroupsResponse } from './signal-groups.type';

@JsonObject('SignalGroupsDataEntity')
export class SignalGroupsDataEntity implements SignalGroupsData {
  @JsonProperty('data', SignalGroupsDataDataConverter)
  data = new Map<number, string>();
  // @JsonProperty('headers', [String])
  // headers: string[] = [];
}

@JsonObject('SignalGroupsResponseEntity')
export class SignalGroupsResponseEntity implements SignalGroupsResponse {
  @JsonProperty('message', String)
  message = '';
  @JsonProperty('error_type', String)
  error_type = '';
  @JsonProperty('data', SignalGroupsDataEntity)
  data = new SignalGroupsDataEntity();
  @JsonProperty('code', Number)
  code = 0;
}
