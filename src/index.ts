import { Command, Option } from 'commander';
import { version } from '../package.json';
import { Config } from './config';
import extractor from './extractor';

const program = new Command();

type OptionsType = {
  token: string;
  dot?: boolean;
};

const exchangeOptions = [new Option('-t, --token <auth_token>', 'cornix dashboard auth token').env('AUTH_TOKEN')].map((o) =>
  o.makeOptionMandatory(true)
);

program.version(version).addOption(exchangeOptions[0]).addOption(new Option('-d, --dot', 'use dot as decimal separator').env('REPLACE_DOT'));

program.parse(process.argv);

const { token, dot } = program.opts<OptionsType>();

Config.AUTH_TOKEN = token;
Config.REPLACE_DOTS = !dot;

void extractor();
