# Browser

## Updates
### Chrome Dev Summit 2021
https://web.dev/cds2021-updates/

## Core Web Vitals

### Browser Plugin
https://github.com/GoogleChrome/web-vitals-extension

## Chrome Predefined Pages
chrome://chrome-urls/

## What Blocks Browser Requests
_possible performance improvement_

https://blog.bluetriangle.com/blocking-web-performance-villain

Basically article states, that each browser has a certain limit of connections per single host. And overall limit of connections.

TODO
- check if it was only for certain HTTP version?
- check how to avoid, probably HTTP/2 prioritization.

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
- []

### Back / Forward Cache
https://web.dev/bfcache/

## Preconnect
_possible performance improvement_
https://web.dev/uses-rel-preconnect/

## EV / DV Certificates
_possible performance improvement_
https://www.aaronpeters.nl/blog/ev-certificates-make-the-web-slow-and-unreliable/

## Prioritization in Chrome 96
https://twitter.com/patmeenan/status/1443219921522073601

Prio table?
https://docs.google.com/document/d/1bCDuq9H1ih9iNjgzyAL0gpwNFiEP4TZS-YLRp_RuMlc/edit