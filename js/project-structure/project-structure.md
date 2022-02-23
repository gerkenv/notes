# Project Structures

## SPA + AMP + WebWorker + React + Typescript
TODO build me

## Node.js + Typescript via TS-Node
```shell
yarn add --dev typescript ts-node @types/node tslib
```
### ts-node
- Installation https://github.com/TypeStrong/ts-node#installation
- Default Configuration https://github.com/TypeStrong/ts-node#understanding-configuration

### ts-node-dev
Tweaked version of [node-dev](https://github.com/fgnass/node-dev) that uses [ts-node](https://github.com/TypeStrong/ts-node) under the hood.

- https://github.com/wclr/ts-node-dev

Add to `package.json`
```json
"dev2": "ts-node-dev --respawn --transpile-only src/server.ts",
"dev2:debug": "ts-node-dev --respawn --transpile-only --inspect -- src/server.ts",
```

`--transpile-only` - is to skip the type checking during development (from [ts-node](https://github.com/TypeStrong/ts-node#transpilers)).
`--respawn` - to watch files even if script process exits (from [node-dev](https://github.com/fgnass/node-dev#command-line-options)).
`--inspect` - is actualy `--inspect=9229` which opens a debugger on port 9229. Open `chrome://inspect/#devices` for debugging.

#### known issues
Unknown flags (`node cli` flags are considered to be so) are treated like string value flags by default. The right solution to avoid ambiguity is to separate script name from option flags with `--`, for example:
```
ts-node-dev --inspect -- my-script.ts
```

## React + JS
https://create-react-app.dev/docs/getting-started/
