# Javascript

## Talks by Gary Bernhardt
https://www.destroyallsoftware.com/talks
### Wat
https://www.destroyallsoftware.com/talks/wat
### The Birth & Death of JavaScript
https://www.destroyallsoftware.com/talks/the-birth-and-death-of-javascript

## EcmaScript
### Contrarguments: ES Modules are terrible, actually
https://gist.github.com/joepie91/bca2fda868c1e8b2c2caf76af7dfcad3


### Compatibility
- https://kangax.github.io/compat-table/es6/

## Async Await
- https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/async%20%26%20performance/ch1.md

## Async Await In Loops
- https://zellwk.com/blog/async-await-in-loops/

## Runtime Complexity Of Array Methods
- https://stackoverflow.com/questions/22614237/javascript-runtime-complexity-of-array-functions

### Benchmarking
- https://stackoverflow.com/questions/1003855/how-can-i-benchmark-javascript-code

### VM Code Optimizer
_microbenchmark benchmark_
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
- https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
- https://github.com/gerkenv/notes/blob/master/js/syntax.md#promises

### Handle Multiple Promises
- https://blog.logrocket.com/javascript-promises-race-all-allsettled-then/

- `.all` -> if one fails returns an error else array of resolved.
- `.allSettled` -> returns all failed and resolved with the wrapper containg state.
- `.race` -> returns fastest failed or resolved.

### Bluebird vs native promises
- https://softwareengineering.stackexchange.com/questions/278778/why-are-native-es6-promises-slower-and-more-memory-intensive-than-bluebird/279003#279003

### Bluebird Promise Anti-Patterns
- http://bluebirdjs.com/docs/anti-patterns.html

TL;DR.
Bluebird is faster in most of the cases.

### `allSettled`

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

### How To Cancel Promise / Run Promise With A Timeout
- Typical way to cancel promise chain execution.
    - https://stackoverflow.com/questions/30233302/promise-is-it-possible-to-force-cancel-a-promise
- If you're fine with eventual tiemout resolution look into `Promise.race`
    - https://advancedweb.hu/how-to-add-timeout-to-a-promise-in-javascript/
### AbortController / AbortSignal
- API https://developer.mozilla.org/en-US/docs/Web/API/AbortController
- Based on event listener.
- Supported by fetch API.
- Node.js supports better from Node 16. 
    - Before node 16 https://github.com/southpolesteve/node-abort-controller#node-abort-controller

#### AWS verions
- https://aws.amazon.com/blogs/developer/abortcontroller-in-modular-aws-sdk-for-javascript/
- https://github.com/trivikr/aws-sdk-js-v3/blob/main/packages/abort-controller/src/AbortSignal.ts


#### AbortController Example
```ts
// ----------------------------------------
// AbortSignal and AbortController

const somethingIWantToCancel = async ({ signal }: { signal: AbortSignal}) => 
    new Promise(async (resolve, reject) => {
        // either pass it directly to APIs that support it
        // (fetch and most Node APIs do)
        //   const response = await fetch('.../', { signal });
        // return response.json;

        // or if the API does not already support it -
        // manually adapt your code to support signals:
        let onAbort: typeof signal.onabort | undefined;
        
        onAbort = (_event) => {
            // run any code relating to aborting here
            if (onAbort) signal.removeEventListener('abort', onAbort);
            reject(new SchemaError(`timeout`));

        };
        signal.addEventListener('abort', onAbort, { once: true });
        // and be sure to clean it up when the action you are performing
        // is finished to avoid a leak
        // ... sometime later ...

        while (!signal.aborted) {
        // while(true) {
            // if (signal.aborted) {
            //     reject(new Error(`timeout`));
            //     return;
            // }
            await resolveAfterOneCycle(1000, 101, 'important function');
        }

        

        // signal.removeEventListener('abort', onAbort);
        // resolve('resolve whatever');
    });

(async () => {
    let timeoutId;
    try {
        const controller = new AbortController();
        var signal = controller.signal;

        timeoutId = setTimeout(() => { controller.abort('timeout 2'); }, 1500);
        const result = await somethingIWantToCancel({signal});
        log('result-1', result);
    } catch (error) {
        if (error instanceof SchemaError) {
            log('catch-schema-error', error);
        } else {
            log('catch-1', error);
        }
    } finally {
        clearTimeout(timeoutId);
    }
})();
```

### Async Iteration In A While Loop
```ts
const whileWrapper = async (mark: string, resolutionTime: number) => {
    let index = 0;
    let errorCount = 0;
    const maxAllowedErrors = 2;
    // try {
        while(true) {
            log(`${mark}${index}`, `before promise`);
            try {
                const result = await resolveAfterOneCycle(resolutionTime, index, mark);
                log(`${mark}${index}`, {result});
            } catch (err) {
                log(`${mark}${index}`, err);
                if (++errorCount >= maxAllowedErrors) {
                    break;
                } 
            }
            log(`${mark}${index}`, `after promise`);
            index++;
            if (index > 5) break;
        }
    // } catch (err) {
    //     log(`while err`, err);
    // }
    return;
}

whileWrapper('a', 1000);
```

## Promise Control Flow
```ts
// utilities

console.clear();
const log = (...args: any) => console.log(new Date().toISOString(), args);

const delay = (time:number) => new Promise(resolve => setTimeout(resolve,time));

const carriedPromiseWithDelay = (time:number, index: number, fulfill: boolean) => 
    (arg: unknown) => 
        new Promise<number>((resolve, reject) => {
            log(`index ${index}.start(${arg})`); 
            delay(time).then(() => {
                log(`index ${index}.end`); 
                if (fulfill) {
                    resolve(index);
                } else {
                    reject(`err-${index}`);
                }
            });
});

log('start');

type Task = (value: unknown) => Promise<unknown>;
type Callback = (err: Error | null, value?: unknown) => void;
type TaskRunner = (tasks: Task[], callback: Callback) => Promise<void>;

const example = (taskRunner: TaskRunner) => {
    taskRunner([
        carriedPromiseWithDelay(1000, 1, true),
        carriedPromiseWithDelay(2000, 2, false),
        carriedPromiseWithDelay(3000, 3, true),
        carriedPromiseWithDelay(1000, 4, true),
    ],
    (err, value) => {
        log('callback', err, value);
    })
}

// control flows

const parallel1 = async (tasks: Task[], callback: Callback) => {
    try {
        let results: unknown[] = [];
        const checkIfAllTasksDone = () => { 
             if (results.length === tasks.length) {
                callback(null, results);
             }
        };

        // 1. parallel execution
        tasks.forEach(async (task) => {
            try {
                const scheduledTask = task('parallel-1');
                // task kicked off here
                // but `forEach` doesn't understand the `await` so it goes to next task without awaiting
                const resolvedValue = await scheduledTask;
                results.push(resolvedValue);
                checkIfAllTasksDone();
            } catch (error: unknown) {
                callback(error as Error);
                results.push(error);
                checkIfAllTasksDone();
            }
        });
    } catch (error: unknown) {
        callback(error as Error);
    }
}

// example(parallel1);


const parallel2 = async (tasks: Task[], callback: Callback) => {
    const allScheduledTasks = tasks.map(async (task) => {
        try {
            const scheduledTask = task('parallel-2');
            // task kicked off here
            // but `map` doesn't understand the `await` so it goes to next task without awaiting
            const resolvedValue = await scheduledTask;
            // results.push(resolvedValue);
            return resolvedValue;
        } catch (error: unknown) {
            callback(error as Error);
            // results.push(error);
            return error;
        }
    });
    // we don't really need 2nd `await` here - all promises are already being executed
    // we use `await Promise.all` only to get gather all results when all promisses are settled (independently if they fail or not)
    const allResolvedValues = await Promise.all(allScheduledTasks);
    callback(null, allResolvedValues);
}

// example(parallel2);


const sequential1 = async (tasks: Task[], callback: Callback) => {

    let results: unknown[] = [];

    // 2. sequential execution
    for (let i=0; i<tasks.length; i++) {
        try {
            const scheduledTask = tasks[i]('sequential-1');
            // task kicked off here
            // but `for` understands the `await` so it does await before going further
            const resolvedValue = await scheduledTask;
            results.push(resolvedValue);
            // checkIfAllTasksDone();
        } catch (error: unknown) {
            callback(error as Error);
            results.push(error);
            return;
            // checkIfAllTasksDone();
        }
    }

    callback(null, results);
}

// example(sequential1);

const sequential2 = async (tasks: Task[], callback: Callback) => {

    let results: unknown[] = [];

    // Sequential execution
    for (const task of tasks) {
        try {
            const scheduledTask = task('sequential-2');
            // task kicked off here
            // but `for of` understands the `await` so it does await before going further
            const resolvedValue = await scheduledTask;
            results.push(resolvedValue);
        } catch (error: unknown) {
            callback(error as Error);
            results.push(error);
            return;
        }
    }

    callback(null, results);
}

// example(sequential2);


// call 1st task, get result and pass it as an argument to the mext task
// if any task breaks - exit with callback
const waterfall = async (tasks: Task[], callback: Callback) => {
    let lastResult: unknown = 0;
    for (const task of tasks) {
        try {
            const scheduledTask = task(lastResult);
            // task kicked off here
            // but `for of` understands the `await` so it does await before going further
            const result = await scheduledTask;
            lastResult = result;
        } catch (error: unknown) {
            callback(error as Error);
            lastResult = error;
            return;
        }
    }
}

// example(waterfall);


// very strange beast, please avoid
// more details here https://zellwk.com/blog/async-await-in-loops/
const waitOnlyForFirstTaskFromArray = async (tasks: Task[], callback: Callback) => {
    const results = tasks.reduce(async (acc, task) => {
        try {
            const scheduledTask = task();
            // kicks off all tasks only if we await for task and we await for the `acc` as well
            // wierd voodoo magic, please avoid
            const resolvedValue = await scheduledTask;
            const resolvedAcc = await acc;
            resolvedAcc.push(resolvedValue);
            return resolvedAcc;
        } catch (error: unknown) {
            callback(error as Error);
            const resolvedAcc = await acc;
            resolvedAcc.push(error);
            return resolvedAcc;
        }
    }, []);
    callback(null, results);
}

```

## Equality Table
https://dorey.github.io/JavaScript-Equality-Table/

## Ramda

### Partitials And Promises
https://medium.com/@RICEaaron/cleaning-up-promise-chains-with-partial-and-curried-functions-13c8e3caadf0

## jQuery
https://youmightnotneedjquery.com/

## Electron
https://youmightnotneedelectron.com/

## Destructuring JavaScript objects with default value
https://dev.to/varundey/destructuring-javascript-objects-with-default-value-2765#:~:text=Please%20note%20that%20destructuring%20with,assign%20default%20value%20to%20them.

Please note that destructuring with default value only works when there is no property to unpack in the object i.e. the property is undefined. This means that JavaScript treats null, false, 0 or other falsy values as a valid property and will not assign default value to them.
```js
const obj = {a: null, b: false, c: 0};

const {
    a = 1,
    b = 2,
    c = 3,
    d = 4
} = obj;

console.log(a, b, c, d); // null false 0 4
```

## Dynamic Import
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports

## In depth: Microtasks and the JavaScript runtime environment
- https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth#tasks_vs_microtasks

## `(0, function)`
- https://stackoverflow.com/questions/40967162/what-is-the-meaning-of-this-code-0-function-in-javascript

## Generators
- https://www.reddit.com/r/javascript/comments/xglffa/comment/iostiu1/
