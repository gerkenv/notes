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
