import { SignalsDataDataContentConverter } from '../signalsdata-data-content.converter'
import { newMockData } from './signalsdata-data-content.converter.mock'

describe('SignalsDataDataContentConverter', () => {
  let converter: SignalsDataDataContentConverter
  beforeEach(() => {
    converter = new SignalsDataDataContentConverter()
  })
  it('deserialize', () => {
    const result = converter.deserialize(newMockData)
    const parsedResult = JSON.parse(JSON.stringify(Array.from(result.entries())))
    expect(parsedResult).toEqual([
      [
        'KuCoin Futures',
        [
          {
            date: '2024-06-17T08:37:06.129Z',
            group: 'AlgoBot Crypto Signals',
            info: {
              entry_progress: 1,
              profit: 50.01,
              take_profit_progress: 1,
              time_passed: '16h',
            },
            leverage: 10,
            marginType: 'cross',
            position: 'Short',
            potential: 5,
            rr: {
              reward: 0,
              risk: 0,
            },
            signalId: 58447772,
            symbol: 'ASTR/USDT',
            type: 'Regular',
          },
          {
            date: '2024-06-16T16:51:06.937Z',
            group: 'AlgoBot Crypto Signals',
            info: {
              entry_progress: 1,
              profit: -40.47,
              take_profit_progress: 1,
              time_passed: '50m',
            },
            leverage: 10,
            marginType: 'cross',
            position: 'Short',
            potential: 5.7,
            rr: {
              reward: 100,
              risk: 71,
            },
            signalId: 58447747,
            symbol: 'LQTY/USDT',
            type: 'Regular',
          },
          {
            date: '2024-06-17T07:10:38.561Z',
            group: 'AlgoBot Crypto Signals',
            info: {
              entry_progress: 1,
              profit: 24.26,
              take_profit_progress: 1,
              time_passed: '19h',
            },
            leverage: 10,
            marginType: 'cross',
            position: 'Short',
            potential: 2.43,
            rr: {
              reward: 0,
              risk: 0,
            },
            signalId: 58430835,
            symbol: 'MAGIC/USDT',
            type: 'Regular',
          },
          {
            date: '2024-06-16T06:19:24.736Z',
            group: 'AlgoBot Crypto Signals',
            info: {
              entry_progress: 1,
              profit: 5,
              take_profit_progress: 1,
              time_passed: '3h',
            },
            leverage: 10,
            marginType: 'cross',
            position: 'Short',
            potential: 5,
            rr: {
              reward: 0,
              risk: 0,
            },
            signalId: 58396780,
            symbol: 'TRU/USDT',
            type: 'Regular',
          },
          {
            date: '2024-06-16T06:54:11.722Z',
            group: 'AlgoBot Crypto Signals',
            info: {
              entry_progress: 1,
              profit: 24.2,
              take_profit_progress: 1,
              time_passed: '1D',
            },
            leverage: 10,
            marginType: 'cross',
            position: 'Short',
            potential: 2.42,
            rr: {
              reward: 0,
              risk: 0,
            },
            signalId: 58389816,
            symbol: 'XTZ/USDT',
            type: 'Regular',
          },
          {
            date: '2024-06-16T00:00:02.930Z',
            group: 'AlgoBot Crypto Signals',
            info: {
              entry_progress: 1,
              profit: 18.42,
              take_profit_progress: 0.75,
              time_passed: '1D',
            },
            leverage: 10,
            marginType: 'cross',
            position: 'Short',
            potential: 2.43,
            rr: {
              reward: 0,
              risk: 0,
            },
            signalId: 58389733,
            symbol: 'DOGE/USDT',
            type: 'Regular',
          },
        ],
      ],
    ])
  })
})
