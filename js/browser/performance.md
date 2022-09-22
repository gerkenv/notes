# Performance

## Does It Really Matter? Why?
- 2022 https://web.dev/milliseconds-make-millions/
- 2021 https://web.dev/vitals-business-impact/

## Stories
- 2019 https://tech.ebayinc.com/engineering/speed-by-a-thousand-cuts/
- 2018 https://medium.com/dev-channel/a-netflix-web-performance-case-study-c0bcde26a9d9

## Cummulative Layout Shift (CLS)
- can some input events affect CLS
  - https://github.com/WICG/layout-instability#recent-input-exclusion
- how to debug layout shifts 
  - https://web.dev/debug-layout-shifts/

## Total Blocking Time (TBT)
- https://www.debugbear.com/docs/performance/minimize-main-thread-work

### Progressive Images And CLS
- https://github.com/w3c/largest-contentful-paint/issues/71
- https://github.com/GoogleChrome/lighthouse/issues/3860

## How To Optimize Guides
- https://nodesource.com/blog/improve-javascript-performance/
- https://jakearchibald.com/2021/io-site-perf/
- https://www.usecue.com/blog/how-to-get-a-100-google-lighthouse-score/
- https://www.deleteagency.com/blog/how-to-get-a-100-percents-lighthouse-performance-score

## Test Tools
- https://web.dev/speed-tools/

### DevTools Performance Tab

### Lighthouse

### WebPageTest
- https://www.webpagetest.org/

### WebPageTest Opportunities & Experiments
- https://blog.webpagetest.org/posts/introducing-opportunities-and-experiments/

### Performance insights panel | DevTools Tips
https://www.youtube.com/watch?v=5PFmGeCZDvw

### Measure React App Performance
https://www.debugbear.com/blog/measuring-react-app-performance

## Post-Load Performance
- [Hands On with the new Responsiveness Metrics](https://calendar.perfplanet.com/2021/hands-on-with-the-new-responsiveness-metrics/)
- [Towards a better responsiveness metric](https://web.dev/better-responsiveness-metric/#group-events-into-interactions)

## Interaction to Next Paint (INP)
- 2022 https://web.dev/better-responsiveness-metric/
- 2022 https://web.dev/inp-in-frameworks/

## Web Vitals Browser Extension
https://github.com/GoogleChrome/web-vitals-extension

## Possible Improvement Topics

### Lazy-Loading
- https://web.dev/lcp-lazy-loading/

### What Blocks Browser Requests

https://blog.bluetriangle.com/blocking-web-performance-villain

Basically article states, that each browser has a certain limit of connections per single host. And overall limit of connections.

TODO
- check if it was only for certain HTTP version?
- check how to avoid, probably HTTP/2 prioritization.

### Preconnect
https://web.dev/uses-rel-preconnect/

### EV / DV Certificates
https://www.aaronpeters.nl/blog/ev-certificates-make-the-web-slow-and-unreliable/

### Prioritization in Chrome 96
https://twitter.com/patmeenan/status/1443219921522073601

### HTTP 103 Early Hints
- https://developer.chrome.com/blog/new-in-chrome-103/#http103
- https://twitter.com/colinbendell/status/1539322190541295616

### Load CSS Asynchronously
- https://www.filamentgroup.com/lab/load-css-simpler/

## Measure Page Navigation Delay
- https://web.dev/navigation-and-resource-timing/
- https://www.w3.org/TR/navigation-timing/#process
- https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming

## Memory Profiling
- https://github.com/facebookincubator/memlab
- https://facebookincubator.github.io/memlab/
