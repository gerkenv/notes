# Bundlers

## Comparisons

### SWC
https://swc.rs/

### Esbuild + Vite

https://www.youtube.com/watch?v=9XS_RA6zyyU
Esbuild is extremely fast.
Vite is like parcel with nice default presets. Vite is using esbuild.

Recommendations for side projects:
Client SPA -> use Vite (2nd generation, 1st was bunder for vue.js)
Fullstack -> Next.js

Issue:
Esbuild is new, so some plugin might be missing
https://vitejs.dev/guide/why.html#why-not-bundle-with-esbuild

### Webpack, Rollup, Parcel
https://www.youtube.com/watch?v=nMhD9IB9YJ8

webpack - scary configuration
rollup - more readable configuration
parcel - 0 setup bundler

### Unbundled Development / Vite & Snowpack
https://www.youtube.com/watch?v=aee93s9TZVc

Vite is more pragmatic it works in new and old way

Snowpack works in a new way, it installs dependencies that you need behind the scenes and converts commonjs modules on the fly to es modules.
https://www.snowpack.dev/concepts/how-snowpack-works#using-npm-dependencies

Comparison of Vite & Snowpack
https://vitejs.dev/guide/comparisons.html

## Standalone
### Webpack
#### Configuration Options
##### Entry Point
Webpack starts processing from an entry point, if entry point matches the `exclude`, `test`, `include` conditions of a certain loader, then the loader resolves all its dependencies.

##### Conditions
`exclude` takes precedence over `include` and `test`.

#### There are default libraries that should be excluded
https://v4.webpack.js.org/loaders/babel-loader/#exclude-libraries-that-should-not-be-transpiled

#### Exclude / include explanation
https://v4.webpack.js.org/configuration/module/#condition
https://stackoverflow.com/questions/37823764/how-include-and-exclude-works-in-webpack-loader
https://stackoverflow.com/questions/34623229/webpack-loaders-and-include
### Babel
Transpilation tool required to convert ES-next code to any lower standard, typically ES5.
https://babeljs.io/docs/en/usage
https://babeljs.io/docs/en/configuration
#### Presets
##### Preset Ordering
https://babeljs.io/docs/en/presets#preset-ordering
Preset ordering is reversed (last to first).
```json
{
  "presets": ["a", "b", "c"]
}
```
Will run in the following order: `c`, `b`, then `a`.

#### Plugins
List of plugins https://github.com/babel/awesome-babel
#### What is babel-preset-env?
https://babeljs.io/docs/en/babel-preset-env
https://2ality.com/2017/02/babel-preset-env.html

#### Babel-Loader

##### Webpack Configuration Options
```ts
{
  bail: true, // treat 1st soft-error (normally skipped) as hard-error and break
  profile: true, // in theory should profile bundling, but not sure where output is
  module: {
    rules: [
      {
        test: /\.(?:tsx?|jsx?)$/,
        exclude: () => false, // babel-loader provide a default exclude always (excludes `node_modules`)
        include: includeFn, // add console.log to `include` or `exclude` to see which files are processed
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                // When no targets are specified, preset-env willt transform all ES2015-ES2020 code to be ES5 compatible
                // https://babeljs.io/docs/en/babel-preset-env#no-targets
                targets: isDevelopment ? "last 2 Chrome versions" : undefined,
                debug: true, // show configuration / plugin information
              },
            ],
            "@babel/preset-typescript",
          ],
          plugins: [ ... ]
        }
      }
    ]
  }
}
```

##### How to output debug information?
https://github.com/babel/babel-loader/issues/53
##### How to handle modules with es6
https://github.com/babel/babel-loader/issues/171

1. Manually exclude known ES-next modules like
```
exclude: /node_modules\/(?!(module1|module2))/
```
Does not work for nested modules like
```
a/node_modules/module3/some/node_modules/module2
```
So it requires more complicated `exclude` function. Better `include` function.

2. Automatically catch modules that require transpilation
https://andersdjohnson.github.io/webpack-babel-env-deps/


## TS + React Setup

### Typescript + Webpack + Babel
#### Ok, Why TS is needed?
To have the latest TS features in place.
Basically we use it to compile TS -> JS.

Can we avoid this on server and run `ts-node` instead of `node`?
If we are talking about SSR, then probably we cannot avoid this.

We cannot be 100% sure that page created on the backend with TS will match its counterpart on the frontend with plain JS in desired format, like ES5 or ES3.

#### Ok, Why Babel is needed?
JS will get more and more new versions. There will be more and more obsolete node versions and browsers. If you want to support older platforms - you need it.
Even if all project code in ES5 then some dependency might be not.

Previous years Babel used to bring also proposals, but it not the case anymore.

#### Can I drop Babel
According to this
https://iamturns.com/typescript-babel/
TS can compile down to ES5 / ES3.
If you need more precise targeting, then Babel is required.


### Webpack + Babel
`babel-preset-typescript` is not following immediately the latest TS updates, but it is good enough.
https://2ality.com/2019/10/babel-loader-typescript.html

## Bundling non-JavaScript resources
- https://web.dev/bundling-non-js-resources/
