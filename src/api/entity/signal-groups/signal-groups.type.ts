export type GroupID = number;
export type GroupName = string;

export interface SignalGroupsData {
  data: [GroupID, GroupName][];
  headers: string[];
}

export interface SignalGroupsResponse {
  message: string;
  error_type: string;
  data: SignalGroupsData;
  code: number;
}
