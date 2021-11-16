# Node.js

## Releases, LTS
https://nodejs.org/en/about/releases/

## Updates

### Node 16
https://www.redhat.com/en/blog/nodejs-16-here-updated-platform-support-v8-version-9-and-more

## Profiling And Flame Graph

### Clinic Flame
Uses `0x` under the hood.
#### CLI
https://clinicjs.org/documentation/flame/01-setup/
More CLI commands
https://clinicjs.org/documentation/cli/04-reference/

#### Programmatically
https://github.com/clinicjs/node-clinic-flame#example

### Built-in CPU Profiler From CLI
Not flexible. Start process from CLI in profile mode.
https://nodejs.org/en/docs/guides/simple-profiling/
https://v8.dev/docs/profile

### Using `perf` or `0x`
Not flexible. Start process from CLI in profile mode.
https://nodejs.org/en/docs/guides/diagnostics-flamegraph/

### Linux perf
- https://www.brendangregg.com/FlameGraphs/cpuflamegraphs.html#Node.js
- 2014.09.17 https://www.brendangregg.com/blog/2014-09-17/node-flame-graphs-on-linux.html

### 0x
Default Usage.
https://github.com/davidmarkclements/0x#usage
Production Usage.
https://github.com/davidmarkclements/0x/blob/master/docs/production-servers.md

Debugging.
https://github.com/davidmarkclements/0x#debugging

### Built-in CPU Profiler Programmatically
https://nodejs.org/dist/latest-v14.x/docs/api/inspector.html#inspector_cpu_profiler

### How to display a flamegraph from a CPU profile
https://stackoverflow.com/questions/35801345/how-to-view-flamegraph-cpuprofile-files

#### Tool 1. Speedscope
http://jamie-wong.com/post/speedscope/

Works with latest CPU profile.
Choose `left-heavy` graph type to combine stack times.

#### Tool 2
Suggest to use this tool http://thlorenz.com/flamegraph/web/
But it does not work with latest cpu profile.

There are few comments in stackoverflow post, that cpuprofile format has changed and tool was not updated yet to support it.
https://github.com/thlorenz/flamegraph/issues/21
It also mentions that `0x` has the same issues.
https://github.com/davidmarkclements/0x/issues/215
Last comment on `0x` issue points to
http://jamie-wong.com/post/speedscope/

Tool promotes another packages which can create another type of profile programmatically.
https://github.com/node-inspector/v8-profiler

#### Alternative
https://github.com/jantimon/cpuprofile-to-flamegraph

### Further Research
https://stackify.com/node-js-profilers/
https://shuheikagawa.com/blog/2018/09/16/node-js-under-a-microscope/


## Execute Shell Commands
Introduction:
https://stackabuse.com/executing-shell-commands-with-node-js/
https://zaiste.net/posts/nodejs-child-process-spawn-exec-fork-async-await/

Different ways to execute shell scripts
https://stackoverflow.com/a/59116849

Node reference including callback and promisified API
https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback


### Async Execution
#### `exec` Get buffered output when execution is over
https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback

```js
exec("ls -ah", (error, stdout, stderr) => {
  if (error) {
    console.error(`[1] error:\n ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`[1] stderr:\n ${stderr}`);
    return;
  }
  console.log(`[1] stdout:\n ${stdout}`);
});
```

#### `spawn` Get event based output during the execution
https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options

```js
// const newProcess = spawn("bash", [
//   "path-to-script/from-the-directory/where-initial-script-is-executed/script.sh",
// ]);
const newProcess = spawn("path-to-script/from-the-directory/where-initial-script-is-executed/script.sh", [
  "",
]);

newProcess.stdout.on("data", (data) => {
  console.log(`[2] stdout: ${data}`);
});

newProcess.stderr.on("data", (data) => {
  console.error(`[2] stderr: ${data}`);
});

newProcess.on("error", (error) => {
  console.error(`[2] error: ${error.message}`);
});

newProcess.on("close", (code) => {
  console.log(`[2] child process exited with code ${code}`);
});
```

### Typical Errors
#### File not found
`Node.js calling bash script via spawn(): ENOENT`
https://stackoverflow.com/questions/52729240/node-js-calling-bash-script-via-spawn-enoent

If you are not sure what is the execution directory of a current file run `console.log(execSync("pwd").toString());`.

#### Data from standard output is printed as array of numbers
```js
newProcess.stdout.on("data", (data) => {
  console.log(data);
});
```
Will print out raw string arrays as
```
<Buffer 4b 69 6c 6c 69 6e 67 20 74 75 6e 6e 65 6c 0a>
```
To avoid this convert `data` to string with explicit conversion `String(data)` or by using inside of a string literal `${data}`.

### Sync Execution
#### Get buffered output when execution is over
```js
console.log(execSync("pwd").toString());
```
### Cannot live without promises
#### Default Promisify
https://nodejs.org/api/util.html#util_util_promisify_original
```js
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function lsExample() {
  const { stdout, stderr } = await exec('ls');
  console.log('stdout:', stdout);
  console.error('stderr:', stderr);
}
lsExample();
```

#### Custom Promise
https://ali-dev.medium.com/how-to-use-promise-with-exec-in-node-js-a39c4d7bbf77


### Stream
#### Reading Stream Output
https://stackoverflow.com/questions/40238063/why-use-buffer-concatbody-tostring-instead-of-uint8array-buffer-tostring
We need to get all stream chunk and convert them to strings only afterwards, because depending on data encoding, some data unit might be split between 2 chunks.
https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/#request-body
```js
let body = [];
request.on('data', (chunk) => {
  body.push(chunk);
}).on('end', () => {
  body = Buffer.concat(body).toString();
  // at this point, `body` has the entire request body stored in it as a string
});
```
https://nodejs.org/api/buffer.html#buffer_static_method_buffer_concat_list_totallength
https://nodejs.org/api/buffer.html#buffer_buf_tostring_encoding_start_end

## How To Improve Performance
https://raygun.com/blog/improve-node-performance/

https://www.smashingmagazine.com/2018/06/nodejs-tools-techniques-performance-servers/

https://www.section.io/engineering-education/performance-optimization-techniques-for-node-js/

[memory](#memory-limitations)


### Use Clustering
https://medium.com/skyshidigital/6-tricks-to-speed-up-and-improve-your-node-js-performance-fadc06d15cbe


## Memory Limitations
https://medium.com/@ashleydavis75/node-js-memory-limitations-30d3fe2664c0
https://developpaper.com/node-memory-limitation-and-solution/
TL;DR
```
Why is there a memory limit?
The main reason of memory limitation is the garbage collection system of V8. It takes 50ms to recycle 1.5GB memory in a small way, and more than 1s to recycle it in a non incremental way, which will cause JS thread to pause. So limit memory.
```

## HTTP Requests
Either use a 3rd-party lib as `axios` or `node-fetch` (less code)
https://openbase.com/categories/js/best-nodejs-http-request-libraries

Or use native API (more code)
https://nodejs.dev/learn/making-http-requests-with-nodejs

## Typescript
### TS-Node
Installation
https://github.com/TypeStrong/ts-node#installation
Default Configuration
https://github.com/TypeStrong/ts-node#understanding-configuration

## ESX
Announcement
https://www.nearform.com/blog/speeding-up-react-ssr-announcing-esx/

But according to [current status](https://github.com/esxjs/esx#status) __It has been thoroughly verified against your current implementation__.

### CLI Usage
```
node -r esx/optimize my-app.js
```

### Programmatic Usage
We can replace react `renderToString` with `esx.renderToString`. (Not clear if we get immediate performance benefits).
https://github.com/esxjs/esx#server-side-rendering-esxrendertostringmarkup--string


### How To Validate The Output
Since esx CLI usage is changing our code everywhere and project has to constantly follow react internal updates, then we need a way to validate esx rendering against default react rendering.

## Event Loop lag

### Event Loop Execution Sequence
https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/

### Lightweight library To Measure

Returns last value in `ms` whenever called.
Custom sampling interval.
https://www.npmjs.com/package/event-loop-lag
