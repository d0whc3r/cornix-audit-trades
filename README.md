# Audit trades

Audit cornix auto-trade channels (using cornix info)

> You need PRO subscription to use this script

## Working steps

To execute this script you will need `access_token` and `refresh_token` these tokens must be obtained from [https://dashboard.cornix.io/](https://dashboard.cornix.io/) once you are logged in

1. Login to [https://dashboard.cornix.io/](https://dashboard.cornix.io/)
2. Open devtools (Ctrl+F12) and go to "Console"
   1. To get access_token type: `window.localStorage.getItem('access_token')`
   2. To get access_token type: `window.localStorage.getItem('refresh_token')`
3. Then use _access_token_ and _refresh_token_ as script parameters

## Usage

Help message:

```bash
Usage: audit-trades [options]

Options:
  -V, --version                  output the version number
  -a, --access <access_token>    cornix dashboard auth token (env: ACCESS_TOKEN)
  -r, --refresh <refresh_token>  cornix dashboard refresh token (env: REFRESH_TOKEN)
  -d, --dot                      use dot as decimal separator (env: REPLACE_DOT)
  -o, --open                     include open trades (env: INCLUDE_OPEN)
  -c, --channels                 extract channels info (env: CHANNELS_INFO)
  -p, --profit                   extract profits (env: EXTRACT_PROFITS)
  -h, --help                     display help for command
```

Example:

```bash
audit-trades-win.exe -a eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2... -r eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eX... --dot
```

Script will create a folder called `out` and inside this folder there will be a file `statistics.csv`
