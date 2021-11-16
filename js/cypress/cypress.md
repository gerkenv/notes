# Cypress

## Manage Versions of Installed Binaries
https://docs.cypress.io/guides/guides/command-line#cypress-cache-command
- `cypress cache list`
- `cypress cache clear`

## Cypress Examples From Creators
- https://glebbahmutov.com/cypress-examples/8.3.1/commands/network-requests.html#cy-request

## `cy.request`

- https://docs.cypress.io/api/commands/request#Alias-the-request-using-as
```js
cy.request('https://jsonplaceholder.cypress.io/comments').as('comments')

cy.get('@comments').should((response) => {
  expect(response.body).to.have.length(500)
  expect(response).to.have.property('headers')
  expect(response).to.have.property('duration')
})
```

- https://docs.cypress.io/api/commands/request#Method-URL-and-Body
```js
cy.request('POST', 'http://localhost:8888/users/admin', { name: 'Jane' }).then(
  (response) => {
    // response.body is automatically serialized into JSON
    expect(response.body).to.have.property('name', 'Jane') // true
  }
)
```

### Request Debugging
- https://docs.cypress.io/api/commands/request#Command-Log

## Request Events
- https://docs.cypress.io/api/commands/intercept#Request-events

## `cy.visit`
- https://docs.cypress.io/api/commands/visit#Yields
```js
cy.visit('/') // yields the window object
  .its('navigator.language') // yields window.navigator.language
  .should('equal', 'en-US') // asserts the expected value
```

- https://docs.cypress.io/api/commands/visit#Prevent-requests-before-a-remote-page-initially-loads
```js
cy.intercept('/users/**', {...})
cy.visit('http://localhost:8000/#/app')
```

## `cy.intercept`
- How to differentiate original requests from altered ones
  - https://docs.cypress.io/guides/guides/network-requests#Command-Log
- Stub the response
  ```js
  cy.intercept('/billing', (req) => {
    // functions on 'req' can be used to
    // dynamically respond to a request here

    // send the request to the destination server
    // and intercept the response
    req.continue((res) => {
      // 'res' represents the real destination's response
      // See "Intercepting a response" for more details and examples
    })
  })
  ```

### Intercept Response
- https://docs.cypress.io/api/commands/intercept#Intercepted-responses

### Interception Lifecycle
- https://docs.cypress.io/api/commands/intercept#Interception-lifecycle

### How to intercept cy.request? Is it possible? #18706
Most probably - no. `cy.intercept` intercepts `cy.visit`.
- https://github.com/cypress-io/cypress/discussions/18706

## `cy.writeFile`
- https://docs.cypress.io/api/commands/writefile#Usage
  - file should exist before writing
  - file will be overwritten by each new test

```ts
cy.writeFile(
  "anObjectYouNeed.json",
  JSON.stringify(anObjectYouNeed),
  {
    encoding: "utf8",
    log: true,
  }
);
```

## Cypress. How To Intercepts All Page Requests To A Certain API
Let's say we need to intercept all calls to `api/v2/foo`.
First intention is to try `cy.wait`

### How `cy.wait` in combination with `cy.intercept`?
- https://docs.cypress.io/api/commands/wait#Usage
- https://docs.cypress.io/guides/guides/network-requests#Waiting
- https://glebbahmutov.com/cypress-examples/9.7.0/commands/waiting.html#waiting-for-network

```ts
cy.intercept("/api/v2/foo").as("api2");

// attempt 1. use only alias argument
cy.wait("@api2");
// yields 1 request/response pair

// attempt 2. use alias + timeout
cy.wait("@api2", { requestTimeout: 20000 });
// yields 1 request/response pair independently from a `requestTimeout` (wait is dropped when the 1st response arrives)

// attempt 3. use array argument
cy.wait(["@api2"]); yields 1 request/response pair

// attempt 4. duplicate the same alias + timeouts
cy.wait(["@api2", "@api2"], { requestTimeout: 20000, timeout: 20000 });
// yields 2 request/response pairs independently from a timeout parameters (wait is dropped when 2 responses arrive)

// attempt 5. if you know how many requests there are
const aliases: string[] = Array(5).fill("@api2");
cy.wait(aliases);
// yields 5 request/response pairs
// it is quite problematic with variable number of requests
// if you have 4 requests - assertions fails
// if you have 6 - you're missing one
```

### Depricated `cy.route`
https://stackoverflow.com/a/64662386/8309959
__note__: seems like was depricated in or after cypress 6. in cypress 9 does not work.

- https://docs.cypress.io/api/commands/route#Syntax
- https://github.com/cypress-io/cypress/issues/95#issuecomment-713400273

if we add
```ts
`"experimentalNetworkStubbing": true`
```
in `cypress.json` configuration or any other configuration then we could use
```ts
// attempt 6
// call to `cy.visit`
cy.server();
cy.route('POST', "/api/v2/foo").as('api3');
cy.wait("@api3");
// results in an error `timeout waiting for a 1st request`
```

```ts
// attempt 7
cy.server();
cy.route('POST', "/api/v2/foo").as('api3');
// call to `cy.visit`
cy.wait("@api3");
// results in an error with `timeout waiting for a 1st request`
// if both all 3 apis are placed after `cy.visit`

// but also yields 0 requests if `cy.server()` and `cy.route` are placed before `cy.visit` and `cy.wait` is placed after `cy.visit`
```

### official `cypress-network-idle` plugin
https://stackoverflow.com/q/64661879/8309959

There is a plugin from cypress creator to wait for all calls to a certain API.
https://github.com/bahmutov/cypress-network-idle

And tutorial explaining how to use it correctly.
https://www.youtube.com/watch?v=E6P_rBt6caU

```ts
// attempt 8
cy.waitForNetworkIdlePrepare({
  method: "POST",
  pattern: "api/v2/foo",
  alias: "api4"
})
// call to `cy.visit`
cy.waitForNetworkIdle("@api4", 5000).its('callCount').should('be.greaterThan', 5 );
// works as expected
```

## Cypress. Basic Data Snapshots
- https://www.useanvil.com/blog/engineering/cypress-snapshot-testing/

### 1. pluging does not fit for a plain JS objects
- Cypress DOM Snapshots From DevTools Console
    - https://www.youtube.com/watch?v=pKi6nUMw6Tc&list=PLP9o9QNnQuAYYRpJzDNWpeuOVTwxmIxcI&index=293

### 2. partially fitting
- Cypress DOM Snapshot To Static HTML File
    - https://www.youtube.com/watch?v=qDn-segvIhw&list=PLP9o9QNnQuAYYRpJzDNWpeuOVTwxmIxcI&index=271
        - you can always fallback to use `cy.writeFle` manually

### 3. one obsolete pluging
- https://github.com/cypress-io/snapshot

#### setup
1. in `../support/commands.js`
    ```ts
    require('@cypress/snapshot').register()
    ```
2. type declaration should be added
    https://github.com/cypress-io/snapshot/issues/9
    for example was added to `support/index.d.ts`
    ```ts
    declare namespace Cypress {
      interface Chainable<Subject> {
        snapshot: typeof snapshot
      }
    }
    ```
3. use like
```ts
cy.wrap(42).snapshot(); // fails with `snapshot is not a function`
```

##### issues:
- Maybe try other options to extend chainable interface
- Cypress 10-12 support somehow is missing https://github.com/cypress-io/snapshot/issues/163

### 4. best fitting (might become obsolete after cypress 10)
- `cypress-plugin-snapshots`

add to package.json
```
"cypress-plugin-snapshots": "^1.4.4",
```

### further setup
https://github.com/meinaart/cypress-plugin-snapshots#configure-cypressio

#### caveats
- https://github.com/meinaart/cypress-plugin-snapshots#caveats-warning
  - when runnning all tests - snapshots are failing

##### fix
- for JS only https://github.com/meinaart/cypress-plugin-snapshots/issues/10#issuecomment-514459554
- for TS
   - this https://github.com/meinaart/cypress-plugin-snapshots/issues/10#issuecomment-728090988
   - and this https://github.com/meinaart/cypress-plugin-snapshots/issues/10#issuecomment-899062001

### other links
- https://docs.cypress.io/faq/questions/using-cypress-faq#Can-I-use-Jest-snapshots
- https://www.cypress.io/blog/2018/01/16/end-to-end-snapshot-testing/

### 5. next to try
- https://www.npmjs.com/package/cypress-data-snapshot
  - has an API to check and update the snapshot (useful for cypress terminal `run` mode)
  - it uses `jest-snapshot` library
    - https://medium.com/blogfoster-engineering/how-to-use-the-power-of-jests-snapshot-testing-without-using-jest-eff3239154e5 

## Cypress. Using Mutable Variable

### Use `this` And An Alias
```ts
describe("some set of tests", () => {
  beforeEach(() => {
    // https://docs.cypress.io/guides/core-concepts/variables-and-aliases#Sharing-Context
    // https://docs.cypress.io/guides/core-concepts/variables-and-aliases#Avoiding-the-use-of-this

    cy.wrap("one").as("mutableVariable");
  });

  it("should be written old school `function () {}`", function () {
      expect(this.mutableVariable).to.equal("one");
      this.mutableVariable = "two";
      expect(this.mutableVariable).to.equal("two");

      //
      cy.intercept("/api/v2/foo", (req) => {
        expect(this.mutableVariable).to.equal("two");
      });
  })
});
```

### Use Global Varibale On `describe` Scope
```ts
describe("some set of tests", () => {
  let some = { number: 0 };
  beforeEach(() => {
    some = { number: 0 };
  });

  it("should be written old school `function () {}`", function () {
    expect(some.number).to.equal(0);
    some.number = 1;
    expect(some.number).to.equal(1);

    cy.intercept("/api/v2/foo", (req) => {
      expect(some.number).to.equal(1);
    });
  });
});
```


## Cypress. How To Scroll
- https://docs.cypress.io/api/commands/scrollintoview#Syntax
  - https://www.youtube.com/watch?v=TZmmvwwo7HI&t=0s
- https://docs.cypress.io/api/commands/scrollto#Syntax

## Chromium / Chrome. Set Browser Window Size.
- https://stackoverflow.com/questions/35848470/how-to-set-chromiums-window-size-via-terminal

## Chromium. Default Build does not support MP4
- https://groups.google.com/a/chromium.org/g/chromium-discuss/c/O97IBWCJ0kw
- possible solution for ubuntu 
  - https://stackoverflow.com/questions/26524325/chrome-does-not-play-mp4
- possible solution for macos 
  - https://stackoverflow.com/questions/65296905/latest-version-of-chromium-installed-with-homebrew-does-not-play-video-how-to
    - install from here https://chromium.woolyss.com/ 

## Cypress Enforce Browser Size
- https://www.cypress.io/blog/2021/03/01/generate-high-resolution-videos-and-screenshots/

## Cypress. Set viewport
- https://docs.cypress.io/api/commands/viewport

## Generic Question
- Subject Management
  - https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Subject-Management

- Using Aliases to Refer to Previous Subjects
  - https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Using-Aliases-to-Refer-to-Previous-Subjects/

- Commands Are Asynchronous
  - https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Commands-Are-Asynchronous

- Variables and Aliases
  - https://docs.cypress.io/guides/core-concepts/variables-and-aliases

- Add type to an alias
  - https://stackoverflow.com/questions/70825942/how-to-attach-data-type-to-cypress-as-alias-function
  ```ts
  cy.get<number>("@alias")
  ```
- Cypress tips and tricks
  - https://glebbahmutov.com/blog/cypress-tips-and-tricks/

- Cypress API examples
  - https://github.com/cypress-io/cypress-example-recipes/tree/master

## Logs
- Use `.then` to perform sequentual actions.
  - https://github.com/cypress-io/cypress/issues/5375
- Why logs are strange?
  - https://glebbahmutov.com/blog/why-cy-log-prints-nothing/


## Cookies
- basic examples https://glebbahmutov.com/cypress-examples/9.5.0/commands/cookies.html#cy-getcookie

- Cypress request and cookies.
  How to use cy.request, window.fetch, and cy.task commands to make HTTP requests to the server with and without cookies
  - https://glebbahmutov.com/blog/cypress-request-and-cookies/

- (not verified) suggestion how to set cookie for `cy.visit`
  - https://stackoverflow.com/a/70160063
  - https://stackoverflow.com/questions/69436354/cypress-cy-visit-does-not-send-cookies-with-request

- Debug cookie handling
  - https://docs.cypress.io/api/cypress-api/cookies#Debug

- Keep cookies for a next test
  - https://docs.cypress.io/api/cypress-api/cookies#Preserve-Once
  - https://filiphric.com/cypress-basics-where-did-my-cookies-disappear

- Set global cookies for all tests
  - https://docs.cypress.io/api/cypress-api/cookies#Defaults

- Move to `cy.session` in cypress 9.7.0
  - https://docs.cypress.io/api/cypress-api/cookies

- Please use `baseUrl`. Cypress starts at baseUrl and by default sets cookie there. Whenever `cy.request` or `cy.visit` is called, cookies stored at the same url as request url will be added to the request cookie header.
  - https://github.com/cypress-io/cypress/issues/1074

### `baseUrl`
- https://docs.cypress.io/guides/references/best-practices#Setting-a-global-baseUrl
- https://github.com/cypress-io/cypress/issues/1074

## Typescript Support
- https://docs.cypress.io/guides/tooling/typescript-support

## Troubleshooting
- https://docs.cypress.io/guides/references/troubleshooting#Support-channels

## Debugging
- https://docs.cypress.io/guides/guides/debugging

## Logging Failed Test In Console `run` Mode
- https://stackoverflow.com/a/68781628/8309959
  - use https://github.com/bahmutov/cypress-failed-log 

## Request Debugging
- https://docs.cypress.io/api/commands/request#Command-Log

## Cypress Links (To Get More Data Than In Their Docs)
- https://cypress.tips/
    - blogs https://glebbahmutov.com/blog/tags/cypress/
    - videos https://www.youtube.com/playlist?list=PLP9o9QNnQuAYYRpJzDNWpeuOVTwxmIxcI

## Generating Test Report
_mocha_ _test_ _report_
Since cypress is using mocha under the hood then this package can be used to get `html` file containing test report.
- https://www.npmjs.com/package/mochawesome-report-generator
