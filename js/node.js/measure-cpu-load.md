# Node.js / CPU

## Measure Average CPU in Last 10 Seconds in Nodejs. Available Options

_side note for measurement in docker container_
    - https://stackoverflow.com/questions/55638839/does-the-cpu-usage-retrieved-from-node-js-os-cpus-in-a-docker-container-instan

### Option 1. `process.cpuUsage`
- https://nodejs.org/api/process.html#processcpuusagepreviousvalue
    - quite simple API

### Option 2. nodejs `os` built-in package
- https://nodejs.org/api/os.html#oscpus
- gives total https://stackoverflow.com/a/36823972
- last 1 second https://stackoverflow.com/a/24044209

### Option 3. npm package `node-os-utils`
- https://stackoverflow.com/a/54387179
    - https://www.npmjs.com/package/node-os-utils

### Option 4. npm package `node-usage`
- measures total usage https://github.com/arunoda/node-usage
    - internals https://github.com/arunoda/node-usage/blob/master/lib/providers/linux.js#L148
        - reads from `/proc/[pid]/stat` (option 6)
        - a bit more details here on the same approach
             - https://stackoverflow.com/a/7774034

### Option 5. npm package `pidusage`
- https://github.com/soyuka/pidusage
    - suggests to use `process.cpuUsage`

### Option 6. On *nix systems can get process stats by reading the `/proc/[pid]/stat` virtual file.
- https://stackoverflow.com/a/7774034
    - similar to option 4, but we don't need a package
- https://stackoverflow.com/questions/16726779/how-do-i-get-the-total-cpu-usage-of-an-application-from-proc-pid-stat

### Option 7. npm package `prom-client` / Prometheus NodeJS Client
- https://github.com/siimon/prom-client
    - internals https://github.com/siimon/prom-client/blob/master/lib/metrics/processCpuTotal.js
        - using `process.cpuUsage` (option 1)

### Option 8. npm package `@adobe/cgroup-metrics` to read in docker container
- https://stackoverflow.com/questions/71992852/dockerized-nodejs-container-app-monitoring-its-own-allocated-cpu-usage
    - https://www.npmjs.com/package/@adobe/cgroup-metrics
        -  CPU reads from path `/sys/fs/cgroup/`
        - internals https://github.com/adobe/node-cgroup-metrics/blob/master/lib/utils.js
        - a bit more context in blog
            - https://itecnote.com/tecnote/node-js-getting-cpu-and-memory-usage-of-a-docker-container-from-within-the-dockerized-application/
                - alternatively suggest to read from `/proc/[pid]/stat` (option 6)
                    - https://stackoverflow.com/questions/16726779/how-do-i-get-the-total-cpu-usage-of-an-application-from-proc-pid-stat

### Option 9. `os.loadavg()`
- calculate 1 / 5 / 15 minute averages https://stackoverflow.com/a/72604617


## Measure Average CPU Load Using `process.cpuUsage`
```ts
export type Seconds = number;
export type NanoSeconds = number;
export type MilliSeconds = number;

// to milliseconds
export function hrTimeToMs([seconds, nanoseconds]: [
  Seconds,
  NanoSeconds
]): MilliSeconds {
  return seconds * 1e3 + nanoseconds / 1e6;
}

// to microseconds
export function hrTimeToUs([seconds, nanoseconds]: [
  Seconds,
  NanoSeconds
]): MilliSeconds {
  return seconds * 1e6 + nanoseconds / 1e3;
}

export function getMillisecondsSince(
  startTime?: [Seconds, NanoSeconds]
): MilliSeconds {
  // NOTE: seems incorrect?
  // process.hrtime() returns the current high-resolution real time in a [seconds, nanoseconds] tuple Array,
  // where nanoseconds is the remaining part of the real time that can't be represented in second precision
  // The "time" param is a previous result of process.hrtime to compare
  const diff = process.hrtime(startTime);
  return diff && hrTimeToMs(diff);
}

// in milliseconds
const getTotalCpuUsageInMs = (cpuUsage: NodeJS.CpuUsage) => {
  return cpuUsage.user / 1000.0 + cpuUsage.system / 1000.0;
};

export const CPU_USAGE_RATIO_SAMPLING_INTERVAL = 200;

// [oldest, old, recent, mostRecent]
let hrTimes: MilliSeconds[] = [];
let cpuTimes: MilliSeconds[] = [];

const measure = () => {
  // const cpuUsageRatio = getCpuUsageRatio(lastHrTime, lastCpuUsage);

  const storeCurrentTimeAndCpuTime = (
    hrTimes: MilliSeconds[],
    cpuTimes: MilliSeconds[]
  ) => {
    const currentHrTime = process.hrtime();
    const currentHrTimeInMs = hrTimeToMs(currentHrTime);
    const currentCpuUsage = process.cpuUsage();
    const currentCpuUsageImMs = getTotalCpuUsageInMs(currentCpuUsage);

    hrTimes.push(currentHrTimeInMs);
    cpuTimes.push(currentCpuUsageImMs);
  };
  storeCurrentTimeAndCpuTime(hrTimes, cpuTimes);

  const getAverageCpuUsageAndRateLimit = (
    hrTimes: MilliSeconds[],
    cpuTimes: MilliSeconds[]
  ) => {
    if (hrTimes.length < 2) {
      return {
        rateLimit: false,
        averageCpuUsageRatio: 0,
      };
    }
    const mostRecentHrTime = hrTimes[hrTimes.length - 1];

    // [200, 400, 600, 800, 1000, 1200, 1400, 1600]
    //  0    1    2    3    4     5     6     7
    while (hrTimes.length >= 2) {
      if (
        mostRecentHrTime - hrTimes[0] <
        1000 + CPU_USAGE_RATIO_SAMPLING_INTERVAL
      ) {
        break;
      }
      hrTimes.shift();
      cpuTimes.shift();
    }
    const oneSecondDeltaTime = mostRecentHrTime - hrTimes[0];
    const oneSecondDeltaCpuTime = cpuTimes[cpuTimes.length - 1] - cpuTimes[0];
    console.log("oneSecondDeltaTime:    ", oneSecondDeltaTime);
    console.log("oneSecondDeltaCpuTime: ", oneSecondDeltaCpuTime);
    const rateLimit = oneSecondDeltaCpuTime >= oneSecondDeltaTime;
    const averageCpuUsageRatio =
      (oneSecondDeltaCpuTime / oneSecondDeltaTime) * 100;

    return {
      rateLimit,
      averageCpuUsageRatio,
    };
  };

  const { rateLimit, averageCpuUsageRatio } = getAverageCpuUsageAndRateLimit(
    hrTimes,
    cpuTimes
  );

  console.log("hrTimes.length:        ", hrTimes.length);
  console.log("ratelimit:             ", rateLimit);
  console.log("averageCpuUsageRatio:  ", averageCpuUsageRatio.toFixed(1), "\n");

  const now = Date.now();
  // fake lag
  const eventLoopLag = Math.random() * 50;
  // schedule next
  setTimeout(() => measure(), CPU_USAGE_RATIO_SAMPLING_INTERVAL + eventLoopLag);
  // fake load up to 150% cpu - limited to 100% in this script
  let randomLoadTime =
    Math.random() * (CPU_USAGE_RATIO_SAMPLING_INTERVAL + eventLoopLag) * 1.5;
  console.log("fakeRandomCpuTime:     ", randomLoadTime.toFixed(1));
  while (Date.now() - now < randomLoadTime);
};

measure();
```
