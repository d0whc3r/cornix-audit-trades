import axios, { AxiosInstance } from 'axios';
import { JsonConvert } from 'json2typescript';
import { SignalGroupsDataEntity } from './entity/signal-groups/signal-groups.entity';
import { SignalGroupsResponse } from './entity/signal-groups/signal-groups.type';
import { ExchangeSignalsDataEntity, SignalsDataResponseEntity } from './entity/signals-data/signals-data.entity';
import { SignalsDataResponse } from './entity/signals-data/signals-data.type';

export class CornixConnection {
  private api: AxiosInstance | undefined;
  private readonly jsonConvert = new JsonConvert();
  private retryCounter = 0;

  constructor(authToken: string, private refreshToken?: string) {
    this.setApi(authToken);
  }

  setApi(authToken: string) {
    this.api = axios.create({
      baseURL: 'https://app.cornix.io',
      headers: {
        'content-type': 'application/json',
        Authorization: `token ${authToken}`,
        origin: 'https://dashboard.cornix.io',
        referer: 'https://dashboard.cornix.io/',
        'sec-ch-ua': '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': 'Linux',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'sec-gpc': '1',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36'
      }
    });
  }

  getChannels(): Promise<SignalGroupsDataEntity | undefined> | undefined {
    return this.api
      ?.post<SignalGroupsResponse>('/get_signals_sub_groups/', {})
      .then(({ data }) => this.jsonConvert.deserializeObject(data, SignalGroupsDataEntity))
      .catch((e) => {
        console.error('[!] ERROR, Cornix get channels', e);
        return this.reTry<SignalGroupsDataEntity | undefined>(async () => {
          const refreshed = await this.doRefreshToken();
          if (refreshed) {
            return this.getChannels();
          }
          return undefined;
        });
      });
  }

  getClosedTrades(channelId: number): Promise<Map<string, ExchangeSignalsDataEntity[]> | undefined> | undefined {
    return this.api
      ?.post<SignalsDataResponse>('/get_signals_data/', { for_admin: false, is_open: false, sub_group_id: channelId })
      .then(({ data }) => this.returnTrades(data))
      .catch((e) => {
        console.error('[!] ERROR, Cornix get closed trades', e);
        return this.reTry<Map<string, ExchangeSignalsDataEntity[]> | undefined>(async () => {
          const refreshed = await this.doRefreshToken();
          if (refreshed) {
            return this.getClosedTrades(channelId);
          }
          return undefined;
        });
      });
  }

  getOpenTrades(channelId: number): Promise<Map<string, ExchangeSignalsDataEntity[]> | undefined> | undefined {
    return this.api
      ?.post<SignalsDataResponse>('/get_signals_data/', { for_admin: false, is_open: true, sub_group_id: channelId })
      .then(({ data }) => this.returnTrades(data))
      .catch((e) => {
        console.error('[!] ERROR, Cornix get open trades', e);
        return this.reTry<Map<string, ExchangeSignalsDataEntity[]> | undefined>(async () => {
          const refreshed = await this.doRefreshToken();
          if (refreshed) {
            return this.getOpenTrades(channelId);
          }
          return undefined;
        });
      });
  }

  private reTry<T>(fn: () => Promise<T>) {
    if (this.retryCounter === 0) {
      console.log('[?] Retry the connection...');
      this.retryCounter++;
      return fn().finally(() => {
        this.retryCounter = 0;
      });
    }
    return undefined;
  }

  private doRefreshToken() {
    console.log('[?] Using the refresh token...');
    return this.api
      ?.post<{ token: string }>('/refresh_token/', { refresh_token: this.refreshToken })
      .then(({ data }) => {
        this.setApi(data.token);
        return true;
      })
      .catch((e) => {
        console.error('[!] ERROR, Cornix get new token', e);
        return false;
      });
  }

  private returnTrades(data: SignalsDataResponse) {
    const {
      data: { data: trades }
    } = this.jsonConvert.deserializeObject(data, SignalsDataResponseEntity);
    return trades;
  }
}
