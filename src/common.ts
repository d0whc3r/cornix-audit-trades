import { sync } from 'mkdirp'
import * as fs from 'node:fs'
import * as path from 'node:path'

export function writeOutput(file: string, headers: string, text: string) {
  const outputFile = path.join('./out', file)
  sync(path.dirname(outputFile))
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.writeFileSync(outputFile, [headers, text.replace(/\n\n/g, '\n')].join('\n'))
}
