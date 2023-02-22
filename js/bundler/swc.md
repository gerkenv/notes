# Speedy Web Compiler - SWC
https://swc.rs/

## Compilation Options
https://swc.rs/docs/configuration/compilation

## Experimental Plugins
https://swc.rs/docs/configuration/compilation#jscexperimentalplugins

## Webpack Compatibility
use `swc-loader` package

```ts
{
  test: /\.(?:tsx?|jsx?)$/,
  exclude: customExcludeFunction,
  include: customIncludeFunction,
  loader: "swc-loader",
  options: {
    jsc: {
      parser: {
        syntax: "typescript",
      },
      externalHelpers: true,
      // add plugin configuration here if required
      experimental: {
        plugins: [
          [
            // add `styled-components` for example
            "@swc/plugin-styled-components",
            {
              displayName: true,
              ssr: true,
            },
          ],
        ],
      },
    },
    env: {
      loose: true,
      targets: targetBrowsers,
    },
  },
},
```

## SWC. Styled Components With Server Side Rendering
- port to rust plugin https://github.com/vercel/next.js/issues/30802

### Styled Components API
following docs
https://styled-components.com/docs/advanced#server-side-rendering

example in their tests
https://github.com/styled-components/styled-components/blob/457192969a1086547d80390a2445f5a23dba3765/packages/styled-components/src/test/ssr.test.tsx#L187

expected result
https://github.com/styled-components/styled-components/blob/457192969a1086547d80390a2445f5a23dba3765/packages/styled-components/src/test/__snapshots__/ssr.test.tsx.snap#L55

generally expected output is
```html
<style>styles-from-styled-components-here</style><div>html-from-renderer</div>
```

1. Don't call `sheet.getStyleTags()` twice
```
err: {
  "type": "Error",
  "message": "Can't collect styles once you've consumed a `ServerStyleSheet`'s styles! `ServerStyleSheet` is a one off instance for each server-side render cycle.\n\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?",
  "stack":
      Error: Can't collect styles once you've consumed a `ServerStyleSheet`'s styles! `ServerStyleSheet` is a one off instance for each server-side render cycle.

      - Are you trying to reuse it across renders?
      - Are you accidentally calling collectStyles twice?
}
```

#### Option 1 `sheet.interleaveWithNodeStream` is recommended for `ReactDOMServer.renderToNodeStream`
```ts
  const sheet = new ServerStyleSheet();
  const elementWithCollectedStyles = sheet.collectStyles(element);
  const { renderToNodeStream } = ReactDOMServer;
  const stream = sheet.interleaveWithNodeStream(
    renderToNodeStream(elementWithCollectedStyles)
  );
  // `sheet.getStyleTags()` is called inside of `interleaveWithNodeStream`
  // second call to `sheet.getStyleTags()` will create an error
```

#### Option 2 `sheet.getStyleTags()` is recommended for `ReactDOMServer.renderToString`
```ts
  const sheet = new ServerStyleSheet();
  const elementWithCollectedStyles = sheet.collectStyles(element);
  const stream = ReactDOMServer.renderToNodeStream(elementWithCollectedStyles);
```

__Note__
- It is not enough to add the code only, so some build configuration tooling is necessary to integrate.

### Style Component Tooling
- https://styled-components.com/docs/advanced#tooling-setup

### 1.1 @swc/plugin-styled-components

### 1.2 add typescript transformer
- it can be added with `awesome-typescript-loader` or `ts-loader` or `ttypescript` compiler https://github.com/Igorbek/typescript-plugin-styled-components#documentation
