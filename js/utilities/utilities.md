# Utility Functions

## Validation
### Number
```js
Number.isFinite(NaN)
// > false
Number.isFinite(Infinity)
// > false
Number.isFinite(-Infinity)
// > false
```

## Parsing And Casting
### Any To Integer Number
```ts
export const tryCastToInteger = (
  value: number | string,
  fallback?: number
): number | undefined => {
  if (isNumber(value) && isFinite(value)) {
    return Math.floor(value);
  } else if (isString(value) && value.length) {
    const parsedValue = parseInt(value, 10);
    if (isFinite(parsedValue)) {
      return parsedValue;
    }
  }
  return fallback;
};
```

## Abort Controller Example
- API https://developer.mozilla.org/en-US/docs/Web/API/AbortController
- Based on event listener.
- Typical way to cancel promise chain execution.
  - https://stackoverflow.com/questions/30233302/promise-is-it-possible-to-force-cancel-a-promise
- Supported by fetch API.
- Node.js supports better from Node 16.

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
