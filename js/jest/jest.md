# Jest

## Pitfalls
### Do not place multiple file with the same name into one folder
It should be obvious, but
```
file.tets.ts
file.test.tsx
```
in the same folder will kill jest.
```
 FAIL  src/utils/__tests__/file.test.ts
  ● Test suite failed to run

    TypeError: src/utils/__tests__/number.test.tsx: Emit skipped for language service

      at compileFn (../../node_modules/ts-jest/dist/compiler/language-service.js:269:23)
      at Object.compile (../../node_modules/ts-jest/dist/compiler/instance.js:39:21)
      at TsJestTransformer.process (../../node_modules/ts-jest/dist/ts-jest-transformer.js:85:41)
      at ScriptTransformer.transformSource (../../node_modules/@jest/transform/build/ScriptTransformer.js:464:35)
      at ScriptTransformer._transformAndBuildScript (../../node_modules/@jest/transform/build/ScriptTransformer.js:569:40)
      at ScriptTransformer.transform (../../node_modules/@jest/transform/build/ScriptTransformer.js:607:25)
```

## How To Setup TS-Jest
### Initial Configration
```
module.exports = {
  preset: "ts-jest",
  setupFiles: ["<rootDir>/__tests__/jest.setup.ts"],
  testEnvironment: "node",
  bail: 5,
  clearMocks: true,
  restoreMocks: true,
  testMatch: ["**/__tests__/**/*.[jt]sx?"],
  moduleFileExtensions: ["js", "json", "ts", ],
  testPathIgnorePatterns: ["<rootDir>/node_modules"],
  roots: ["<rootDir>/src"],
};
```

## Mock

### Mock A Single Function Of A Module
#### Using Spy And Dynamic Import
```js
// ...
  it('should ...', async () => {
  
    const spyOnFunctionName = jest.spyOn(
      await import("../some/module"),
      "functionName"
    ).mockImplementation(() => 'functionNameResult');
    // ...
    // in the end of the test
    spyOnFunctionName.mockRestore(); // restore original implementation
  });
```

#### Using Spy And Static Import 
```js
import * as someModule from "../some/module";
// ...
  it('should ...', () => {
  
    const spyOnFunctionName = jest.spyOn(
      someModule,
      "functionName"
    ).mockImplementation(() => 'functionNameResult');
    // ...
    // in the end of the test
    spyOnFunctionName.mockRestore(); // restore original implementation
  });
```

## Promises
- https://jestjs.io/docs/tutorial-async#resolves
- https://jestjs.io/docs/tutorial-async#rejects

## Timers
- https://jestjs.io/docs/timer-mocks#run-all-timers

## React State Changes
- https://reactjs.org/docs/test-utils.html#act
- https://stackoverflow.com/a/64048764

## Repeated test with different inputs / results
https://elfi-y.medium.com/reduce-boilerplate-test-code-with-jest-it-each-30a0eec9776d
It is possible to use `%p` for any variable type.
```
test.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])('.add(%i, %i)', (a, b, expected) => {
  expect(a + b).toBe(expected);
});
```

## Mark Tests As Skipped Or Todo
https://stackoverflow.com/questions/32183883/how-to-make-my-tests-pending-in-jest

```js
it.todo(...)
test.todo(...)
```
> Tests:       1 todo, 23 passed, 24 total

```js
it.skip(...)
test.skip(...)
```
Tests:       1 skipped, 23 passed, 24 total

## Snapshots
```js
expect(obj).toMatchSnapshot(); // creates a snapshot file
expect(obj).toMatchSnapshotInline(); // add a snapshot in this file
```
