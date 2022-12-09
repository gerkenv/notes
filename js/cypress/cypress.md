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

### Logs
- Use `.then` to perform sequentual actions.
  - https://github.com/cypress-io/cypress/issues/5375
- Why logs are strange?
  - https://glebbahmutov.com/blog/why-cy-log-prints-nothing/


### Cookies
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

### Typescript Support
- https://docs.cypress.io/guides/tooling/typescript-support

### Troubleshooting
- https://docs.cypress.io/guides/references/troubleshooting#Support-channels

### Debugging
- https://docs.cypress.io/guides/guides/debugging

### Request Debugging
- https://docs.cypress.io/api/commands/request#Command-Log
