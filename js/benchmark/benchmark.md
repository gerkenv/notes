# Benchmark

## JS
https://stackoverflow.com/questions/37695890/how-to-profile-javascript-now-that-jsperf-is-down

https://github.com/bestiejs/benchmark.js/
https://benchmarkjs.com/

```js
var suite = new Benchmark.Suite;

// add tests
suite.add('RegExp#test', function() {
  /o/.test('Hello World!');
})
.add('String#indexOf', function() {
  'Hello World!'.indexOf('o') > -1;
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });
```
