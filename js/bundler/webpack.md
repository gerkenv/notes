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
