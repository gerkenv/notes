# Javascript
## EcmaScript
### Compatibility
https://kangax.github.io/compat-table/es6/

## Async / Await
https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/async%20%26%20performance/ch1.md

## Performance
https://nodesource.com/blog/improve-javascript-performance/

### Benchmarking
https://stackoverflow.com/questions/1003855/how-can-i-benchmark-javascript-code

### VM Code Optimizer
Every VM (including V8) has a built-in optimizer which makes a good job of removing unnecessary repeated work (that is what you're typically trying to do in microbenchmarks)
Thus measurements cannot be trusted unless you can go around the optimizer.

https://www.youtube.com/watch?v=65-RbBwZQdU

#### First search on how to disable optimizer.
https://stackoverflow.com/questions/18476402/how-to-disable-v8s-optimizing-compiler

### Measure Time

#### Node
https://nodejs.org/api/process.html#process_process_hrtime_bigint
```js
const start = process.hrtime.bigint(); // ns = 10^-9 s
// whatever
const end = process.hrtime.bigint(); // ns = 10^-9 s
const executionTimeNs = Number(end - start);
console.log(executionTimeNs.toPrecision(4));
```

#### JS
```js
const start = performance.now(); // ms = 10^-3 s
// whatever
const end = performance.now(); // ms = 10^-3 s
const executionTimeMs = start - end;
console.log(executionTimeMs.toPrecision(4));
```

### Optimization Suggestions
#### ????
https://www.infoq.com/articles/node-micro-optimizations-javascript/

#### 10 Methods To Clone An Array
10 methods in https://www.freecodecamp.org/news/how-to-clone-an-array-in-javascript-1d3183468f6a/

#### ES6 vs ES5 Performance
https://javascript.plainenglish.io/es5-vs-es6-performance-comparisons-c3606a241633


## Function Names
Anonymous function expressions are nameless.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name#anonymous_function_expression

## Automatically Generate Sequence Diagrams From Source Code
Is there an automated way to generate a sequence diagram from an applications Javascript code?
https://stackoverflow.com/questions/19788391/is-there-an-automated-way-to-generate-a-sequence-diagram-from-an-applications-ja

https://stackoverflow.com/questions/16714718/how-can-i-reverse-engineer-my-javascript-files-with-js-uml

Class Diagram
https://www.npmjs.com/package/wavi

Call Graph
https://github.com/scottrogowski/code2flow

## Request Idle Callback
To make non-important things when user is not interacting with a page.
Code is executed in way that ensures that main thread is not blocked for too lang and user interactions can be processed in priority order.
https://developers.google.com/web/updates/2015/08/using-requestidlecallback

## Promises
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
https://github.com/gerkenv/notes/blob/master/js/syntax.md#promises

### Bluebird vs native promises
https://softwareengineering.stackexchange.com/questions/278778/why-are-native-es6-promises-slower-and-more-memory-intensive-than-bluebird/279003#279003

### Bluebird Promise Anti-Patterns
http://bluebirdjs.com/docs/anti-patterns.html

TL;DR.
Bluebird is faster in most of the cases.

### allSettled

__Note__: in TS from `target: es2020`.

```js
Promise.allSettled([
  Promise.resolve('a'),
  Promise.reject('b')
])
  .then(console.log);
```
```
[
  {
    "status": "fulfilled",
    "value": "a"
  },
  {
    "status": "rejected",
    "reason": "b"
  }
]
```

#### how to mock allSettled
https://stackoverflow.com/questions/31424561/wait-until-all-promises-complete-even-if-some-rejected

```js
const settle = async function (promise: Promise<any>) {
  try {
    const payload = await promise;
    return { payload, status: "fulfilled" };
  } catch(error) {
    return { reason: error, status: "rejected" };
  }
}

const promiseAllSettled = async (promise: Promise<any>[]) => {
  return Promise.all(promises.map(promise => settle(promise)));
}

const promises = [Promise.resolve(5), Promise.reject('not 5')];

Promise.all(promises).then(data => console.log('data 0', data)).catch(err => console.log("err 0", err));
// > "err 0",  "not 5"

Promise.allSettled(promises).then(data => console.log('data 1', data)).catch(err => console.log("err 1", err));
// > "data 1", [{
// >   "status": "fulfilled",
// >   "value": 5
// > }, {
// >   "status": "rejected",
// >   "reason": "not 5"
// > }]

promiseAllSettled(promises).then(data => console.log('data 2', data)).catch(err => console.log("err 2", err));
// > "data 2",  [{
// >   "payload": 5,
// >   "status": "fulfilled"
// > }, {
// >   "reason": "not 5",
// >   "status": "rejected"
// > }]
```

## Ramda

### Partitials And Promises
https://medium.com/@RICEaaron/cleaning-up-promise-chains-with-partial-and-curried-functions-13c8e3caadf0
