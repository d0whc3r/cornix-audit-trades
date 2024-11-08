import { SignalsDataDataContentConverter } from '../signalsdata-data-content.converter'
import { mockData } from './signalsdata-data-content.converter.mock3'

describe('SignalsDataDataContentConverter', () => {
  let converter: SignalsDataDataContentConverter
  beforeEach(() => {
    converter = new SignalsDataDataContentConverter()
  })
  it('deserialize', () => {
    const result = converter.deserialize(mockData)
    expect(result).toMatchSnapshot()
  })
})
