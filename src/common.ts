import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';

export function writeOutput(file: string, headers: string, text: string) {
  const outputFile = path.join('./out', file);
  mkdirp.sync(path.dirname(outputFile));
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.writeFileSync(outputFile, [headers, text.replace(/\n\n/g, '\n')].join('\n'));
}
