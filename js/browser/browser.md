# Browser

## Updates
### Chrome Dev Summit 2021
https://web.dev/cds2021-updates/

## Web State

### 2020
https://almanac.httparchive.org/en/2020/table-of-contents

## The Extensible Web Manifesto #extendthewebforward
- https://extensiblewebmanifesto.org/

## Chrome Predefined Pages
chrome://chrome-urls/

## `sendBeacon` API 
- https://nicj.net/beaconing-in-practice

### `sendBeacon` Payload Limits
- https://nicj.net/beaconing-in-practice/#beaconing-payload-limits

### `sendBeacon` Pitfalls
- https://xgwang.me/posts/you-may-not-know-beacon

### `sendBeacon` Success Rate
- https://volument.com/blog/sendbeacon-is-broken

### `sendBeacon` Open Bugs:
- service worker cannot intercept beacon https://bugs.chromium.org/p/chromium/issues/detail?id=475174

## Service Worker vs Worker
- https://bitsofco.de/web-workers-vs-service-workers-vs-worklets/#:~:text=Service%20workers%20are%20a%20proxy,work%20from%20the%20main%20thread.
- https://stackoverflow.com/a/52256049
  - https://www.youtube.com/watch?v=OgLemdR65pE 

## Service Worker
- https://developers.google.com/web/fundamentals/primers/service-workers
- https://developers.google.com/web/tools/workbox/guides/get-started
- https://developers.google.com/web/fundamentals/primers/service-workers/high-performance-loading

## App Shell Model
- https://developers.google.com/web/fundamentals/architecture/app-shell

## Worker
- https://web.dev/off-main-thread/
- https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers

### Executing Code On The Worker
- `comlink` wrapper to execute code in a worker without messages https://web.dev/off-main-thread/#comlink:-making-web-workers-less-work

### Load 3rd-Party-Script In Worker
- `partytown` https://github.com/BuilderIO/partytown
  - https://dev.to/adamdbradley/introducing-partytown-run-third-party-scripts-from-a-web-worker-2cnp
  - https://dev.to/adamdbradley/how-partytown-s-sync-communication-works-4244

## Adaptive Page Loading

### Chrome Dev Summit 2019
- entire explanation video https://www.youtube.com/watch?v=puUPpVrIRkc
- google part summary https://web.dev/adaptive-loading-cds-2019/
- facebook part https://www.youtube.com/watch?v=puUPpVrIRkc&t=1380s includes:
    - how to get segments
      - define KPI which could help to determine buckets
      - integrate KPI into logging
      - define buckets analyze the KPI and page performance data
      - integrate buckets into logging
      - validate buckets by analyzing KPI, buckets and performance data
      - create a fitting experience for each bucket
          - heavy page for high end
          - light page for low end
          - check examples for page optimization in the summary https://web.dev/adaptive-loading-cds-2019/
          - chunk loading strategy is different for high end and low end
          - enforce lower framerate on low-end
          - load images, video depending on 'data saver` option
          - no prefetching on low-end
          - no animation on low end
    - facebook defined KPI like:
        - mobile:
            - user agent provides exact device name, so you can get
                - their cpu benchmark from open data sources
                - and a year when device was considered top (since performance degrades over the years). ('year class' framework on native)
        - desktop:
            - `navigator.hardwareConcurrency`
            - `navigator.deviceMemory`

### Proxx For Feature Phone
- Summary https://web.dev/proxx-announce/ + linked boring video inside
- Fun story of iterative performance improvements + some webpack public shaming
  - https://www.youtube.com/watch?v=TsTt7Tja30Q

## PWA
- https://web.dev/learn/pwa/
- https://web.dev/reliable
- https://web.dev/progressive-web-apps

### Use Worker API Directly
- https://www.npmjs.com/package/comlink (thorugh `postMessage` interface)

## Network Information API
https://wicg.github.io/netinfo/

Current coverage ~73%
- `downlink`
    - [approximate download speed in Mbit/s](https://wicg.github.io/netinfo/#downlink-attribute)
    - [73%](https://caniuse.com/mdn-api_networkinformation_downlink)
- `effectiveType`
    - [connection type](https://wicg.github.io/netinfo/#effective-connection-types)
    - [73%](https://caniuse.com/mdn-api_networkinformation_effectivetype)

### Polyfill
https://github.com/daniellmb/downlinkMax relies on the current and previously implemented specs.
But for older browsers polyfill does not even try to calculate actual speed, but rather rely on connection type.

## Performance API
https://developers.google.com/web/fundamentals/performance/navigation-and-resource-timing
https://blog.openreplay.com/how-to-evaluate-site-speed-with-the-performance-api

```js
performance.getEntriesByType('resource')
performance.getEntriesByType('navigation')
```

### Experiment. Use Performance API To Calculate Network Speed
Few experiments to calculate network speed while fetching page assets.

#### Experiment 1. PerformanceResourceTiming
https://www.w3.org/TR/resource-timing-2/#attribute-descriptions

75% https://caniuse.com/mdn-api_performanceresourcetiming_transfersize
95% https://caniuse.com/mdn-api_performanceresourcetiming_responsestart
95% https://caniuse.com/mdn-api_performanceresourcetiming_responseend

```js
var transferSpeeds = performance.getEntriesByType('resource').reduce((acc, resource) => {
  if (resource.transferSize === 0) { // byte
    return acc;
  }
  const transferTime = resource.responseEnd - resource.responseStart; // ms
  if (transferTime > 40) { // ms
    // byte * 8 * 1000 / ms / 1024 => kbit / s
    acc.push(Math.floor(resource.transferSize * 8 * 1000 / transferTime / 1024));
  }
  return acc;
}, []);
console.log(transferSpeeds);
transferSpeeds.reduce((acc, speed) => acc + speed, 0) / transferSpeeds.length;
```

Resulted in 35 kbit/s on 256 kbit/s throttling.
```js
navigator.connection.downlink
0.25 // mbit/s
```

#### Experiment 2. PerformanceResourceTiming
```js
var transferSummary = performance.getEntriesByType('resource').reduce((acc, resource) => {
  if (resource.transferSize === 0) { // byte
    return acc;
  }

  acc.transferSize = resource.transferSize + acc.transferSize;

  if (!acc.responseStart || resource.responseStart < acc.responseStart)
  acc.responseStart = resource.responseStart;

  if (!acc.responseEnd || resource.responseEnd > acc.responseStart)
  acc.responseEnd = resource.responseEnd;

  return acc;
}, { transferSize: 0 });

var transferTime = transferSummary.responseEnd - transferSummary.responseStart;

// byte * 8 * 1000 / ms / 1024 => kbit / s
Math.floor(transferSummary.transferSize * 8 * 1000 / transferTime / 1024);
```
| throttling kbit/s | downlink mbit/s | experiment kbit/s |
|-------------------|-----------------|-------------------|
| 64                | 0.5             | 15, 33, 32        |
| 256               | 0.25            | 228, 188, 116     |
| 512               | 0.55            | 257, 300          |
| 1024              | 1.05            | 723, 486, 586     |
| 2048              | 2.1             | 2038, 920, 1094   |

__ `downlink` results cannot be trusted __
When you switch `throttling` in chrome devtools - `downlink` is updated wihtout downloading anything, so it is mocked.

#### Experiment 3. PerformanceNavigationTiming
https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming#browser_compatibility
https://w3c.github.io/navigation-timing/#processing-model

```js
var navigationTiming = performance.getEntriesByType("navigation")[0];

Math.floor(navigationTiming.transferSize * 8 * 1000 / (navigationTiming.responseEnd - navigationTiming.responseStart) / 1024);
```
Provides a value >=4 times lower than `navigator.connection.downlink`


Since something straightforward didn't worked out, then it is simpler to go with default `navigator.connection.downlink` .

## Browser Cache Capabilities
- [nice intro](https://medium.com/@codebyamir/a-web-developers-guide-to-browser-caching-cc41f3b73e7c)
- [http caching](https://developers.google.com/web/fundamentals/performance/get-started/httpcaching-6)
- [Caching best practices & max-age gotchas](https://jakearchibald.com/2016/caching-best-practices/)
- [304 Not Modified](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/304) - typical response, when resource is cached and there is no need to transfer it.
- [http cache partitioning](https://developers.google.com/web/updates/2020/10/http-cache-partitioning)

### Back / Forward Cache
https://web.dev/bfcache/

### Clean Cache
- chrome --> more tools --> clear browsing data
- firefox --> history --> clear recent history
- safari --> history --> clear

## Web Socket API
- https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
- https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications
- https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers

# HTTP

## 2022 Specification
- https://www.rfc-editor.org/rfc/rfc9110

## Status Codes
- https://httpstatusdogs.com/

- 200 - ok
- 201 - content is created
- 302 - re-direct
- 401 - unauthorized
- 429 - rate-limiting
- 431 
  - thrown by default by node if any header is more than 8kB 
    - https://cri.dev/posts/2020-05-18-Fixing-431-Request-Header-Fields-Too-Large-in-Nodejs/
- 503 - service is unavailable

### 204 No Content
- https://www.rfc-editor.org/rfc/rfc9110#status.204
    - Means that response does not contain content, so even if you send some content, then some clients might refuse to read the content (body) or some servers might refuse to send the content.

### 429 vs 503
- 429 is used when a particular client is sending to many requests. So server has capacity, but it will limit the greedy user to allow others to access resources.
    - Typically used to indicate rate limiting.
- 503 is used when a partucular server is completely out of capacity for all clients.
    - Typically used to indicate load shedding.

- 429 https://datatracker.ietf.org/doc/html/rfc6585#section-4
- https://webmasters.stackexchange.com/questions/65674/should-i-return-a-429-or-503-status-code-to-a-bot
- skipper rate limit discussion https://github.com/zalando/skipper/issues/1728

#### Rate Limiting Headers
Useful to indicate that server is overloaded.
- https://stackoverflow.com/questions/16022624/examples-of-http-api-rate-limiting-http-response-headers
- https://medium.com/@guillaume.viguierjust/rate-limiting-your-restful-api-3148f8e77248

## User Agent Holly War

### Client Side
If you want to detect that you're on mobile on the client-side - then everything below is okay.

- MDN against `user-agent` https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
- one summary https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device
- Check `warning` chapter here http://hgoebl.github.io/mobile-detect.js/
- https://mediaqueri.es/

### Server-side
If you want to detect that you're on mobile on the server-side - then everything above doesn't help.
- Migrate to User-Agent Client Hints https://web.dev/migrate-to-ua-ch
  - Server-side static header https://web.dev/migrate-to-ua-ch/#strategy:-static-server-side-header
    - May cause the same issue as old `user-agent`

## Browser Compatibility Lists
It is possible to use `browserlist` to identify browsers not supporting `ES6` and not `dead`.
- https://browsersl.ist/?q=defaults%2Cnot+supports+es6-module%2Cnot+dead
```
"browserslist": [
    "defaults",
    "not supports es6-module", 
    "not dead"
]
```

It also maintains a list of browsers which makes sense to support, set is called `defaults`.

### `browserslist` NPM Package
- https://webpack.js.org/configuration/target/#browserslist
It can be used in webpack configuration to set list of browsers, for which bundle has to be released.
```
target: "browserslist",
```
It is possible to specify `.browserslistrc` configuration.

## Check Feature Browser Compatibility
- https://caniuse.com/es6

## IE11. Missing JS API (Not Implemented)
- [Response API - returned by Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Response)
    - Also `safe-fetch` library   
- [Array.from()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
- [Array.flatMap()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)
