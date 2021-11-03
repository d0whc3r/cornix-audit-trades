import { JsonConverter, JsonCustomConvert } from 'json2typescript';
import { ISignalGroupsDataData } from '../entity/signal-groups/signal-groups.type';

@JsonConverter
export class SignalGroupsDataDataConverter implements JsonCustomConvert<Map<number, string>> {
  public deserialize(data: any): Map<number, string> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    const info: ISignalGroupsDataData[] = data.data;
    const result = new Map<number, string>();
    info.forEach(([id, name]) => {
      result.set(id, name);
    });
    return result;
  }

  public serialize(data: Map<number, string>): any {
    return data;
  }
}
