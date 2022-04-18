export type GroupID = number
export type GroupName = string

export interface SignalGroupsData {
  data: Map<number, string>
  // headers: string[];
}

export type ISignalGroupsDataData = [GroupID, GroupName, string, [[string, string], [string, number], [string, number]]]

export interface SignalGroupsResponse {
  message: string
  error_type: string
  data: SignalGroupsData
  code: number
}
