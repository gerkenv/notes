# NPM Packages

## Symlink An NPM Package Folder During Development
- https://medium.com/@the1mills/how-to-test-your-npm-module-without-publishing-it-every-5-minutes-1c4cb4b369be
- https://medium.com/@alexishevia/the-magic-behind-npm-link-d94dcb3a81af
- yarn link https://classic.yarnpkg.com/en/docs/cli/link
- npm link https://docs.npmjs.com/cli/v8/commands/npm-link/

## Formatter
- https://www.npmjs.com/package/prettier
  - includes auto-fix
  - if you're happy with es-lint formatting options - ignore prettier

## Linter
- https://www.npmjs.com/package/eslint
  - includes auto-fix

## Logger
- https://github.com/pinojs/pino

## User Agent Parser
- https://www.npmjs.com/package/ua-parser-js

## Feature Detection
- https://modernizr.com/

## Server Healthcheck And Graceful Shutdown
- https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html
- https://github.com/godaddy/terminus

## HTTP Client
- https://www.npmjs.com/package/perron
  - with retries and circuit breakers

## Rate-Limiter / Semaphore
- https://www.npmjs.com/package/async-sema

## Measure Event Loop Lag
- https://www.npmjs.com/package/event-loop-lag

## Metrics Collector
- https://github.com/siimon/prom-client

## E2E Tests
- https://www.npmjs.com/package/cypress
  - https://github.com/gerkenv/notes/blob/master/js/cypress/cypress.md

## Unit Test
- https://www.npmjs.com/package/jest
  - https://github.com/gerkenv/notes/blob/master/js/jest/jest.md

## Node.js Server Framework
- https://www.npmjs.com/package/express
  - https://github.com/gerkenv/notes/tree/master/js/express.js

## PostgreSQL
- https://www.npmjs.com/package/pg

## Local JSON Database
- https://www.npmjs.com/package/node-json-db

## SemVer
- https://www.npmjs.com/package/semver

## Compare Incomplete Semver Versions
- `1` > `1.2` -> `semver` will say that version is invalid.
- so use https://github.com/omichelsen/compare-versions


## Frontend Blacklist
- [moment](https://bundlephobia.com/package/moment)
- [mement-timezone](https://bundlephobia.com/package/moment-timezone)

## Vulnerabilities

### 2021.10 ua-parses-js
https://therecord.media/malware-found-in-npm-package-with-millions-of-weekly-downloads/?__cf_chl_jschl_tk__=pmd_WENmrTf_r8sJc16nH3E4fXDtPYFJFAMFNpK1DjoSYwk-1635173060-0-gqNtZGzNApCjcnBszQil

https://github.com/faisalman/ua-parser-js/issues/536

https://www.npmjs.com/package/ua-parser-js
