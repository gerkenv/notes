# Utility Functions

## Validation
### Number
- [Difference between `Number.isFinite()` and global `isFinite()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite#difference_between_number.isfinite_and_global_isfinite)
```ts
Number.isFinite(NaN)
// > false
Number.isFinite(Infinity)
// > false
Number.isFinite(-Infinity)
// > false
```

## Type Guards
```ts
const isString = (value: unknown): value is String => typeof(value) === "string";
const isNumber = (value: unknown): value is Number => typeof(value) === "number";
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

## Delay / Wait / Sleep
```ts
const log = (mark: string, ...args: unknown[]) => 
    console.log(new Date().toISOString(), mark, ...args);

const resolveAfterOneCycle = (timeout: number, returnValue: unknown, mark: string) => 
    new Promise((resolve, reject) => {
        setTimeout(() => {
            log(`${mark}${returnValue}`, `finished resolveAfterOneCycle(${timeout}, ${returnValue})`);
            // reject(new Error(`${returnValue} error`));
            resolve(returnValue);
        }, timeout, returnValue);
    });
```

## Simple Comparator For Incomplete Semver
```ts
const parseIncompleteSemverNumber = (incompleteSemver: string): { major: number, minor: number, patch: number } => {
    const match = incompleteSemver.match(/(\d+)\.?(\d+)?\.?(\d+)?/);

    let major = 0;
    let minor = 0;
    let patch = 0;
    if (match) {
        const [firstMatch, majorString, minorString, patchString] = match;
        if (firstMatch) {
            if (majorString) {
                major = tryCastToInteger(majorString, 0);
            } 
            if (minorString) {
                minor = tryCastToInteger(minorString, 0);
            } 
            if (patchString) {
                patch = tryCastToInteger(patchString, 0);
            }
        }
    }
    
    // console.log([incompleteSemver, major, minor, patch]);
    return { major, minor, patch };
}

const incompleteSemverComparator = (a: string, b: string) => {
  const semverA = parseIncompleteSemverNumber(a);
  const semverB = parseIncompleteSemverNumber(b);
  
  if (semverA.major > semverB.major ) return 1;
  else if (semverA.major === semverB.major && semverA.minor > semverB.minor ) return 1;
  else if (semverA.major === semverB.major && semverA.minor === semverB.minor && semverA.patch > semverB.patch ) return 1;
  else return -1;
};


const result = [ "1.1", "1.1.2", "1", "1.2.20", "2", "1.2.3"].sort(incompleteSemverComparator)

console.log(result);
// ['1', '1.1', '1.1.2', '1.2.3', '1.2.20', '2']
```
