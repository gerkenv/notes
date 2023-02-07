# Webpack

## Minification
```js
    optimization: {
      // minimize: true, // by default
      minimizer: [
        new TerserPlugin({
          sourceMap: false,
          terserOptions: {
            compress: {
              dead_code: false,
              drop_console: false,
              drop_debugger: true,
              conditionals: true,
              booleans: true,
              hoist_funs: true,
              hoist_props: true,
              inline: false,
              reduce_vars: true,
            },
            // mangle: true, // by default
          },
        }),
      ],
    },
```

### How To Use in Webpack
https://webpack.js.org/plugins/terser-webpack-plugin/

Compress options
https://github.com/terser/terser#compress-options

Replace names
https://github.com/terser/terser#mangle-options

Minimify options
https://github.com/terser/terser#minify-options

## Externals
Prevent bundling of certain `import`ed packages and instead retrieve these external dependencies at runtime.
- https://webpack.js.org/configuration/externals/#externals
- https://webpack.js.org/configuration/externals/#externalstype
- example of configuring react as external https://stackoverflow.com/questions/73508372/custom-react-hook-library-webpack-externals-and-peerdependencies-doesnt-work
 
