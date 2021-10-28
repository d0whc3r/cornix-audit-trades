import { JsonObject, JsonProperty } from 'json2typescript';
import { GroupID, GroupName, SignalGroupsResponse, SignalGroupsData } from './signal-groups.type';

@JsonObject('SignalGroupsDataEntity')
export class SignalGroupsDataEntity implements SignalGroupsData {
  @JsonProperty('data', [Number, String])
  data: [GroupID, GroupName][] = [];
  @JsonProperty('headers', [String])
  headers: string[] = [];
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
