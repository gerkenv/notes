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
