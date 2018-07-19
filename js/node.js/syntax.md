# Node.js basic syntax

## Window vs. Global
If we type in a console of a browser `var a = 1;` then we access variable `a` 
through `window.a`. `window` object that respresents global scope in browser.
In _node_ this object is not availabke, but `global.a` can be used for the 
same purpose and in _node_ `global` represents global scope.

## Document vs. Process
In _node_ we do not have a `document`, but we have the `process` that reflects
running application.

## Modules
If you want import functions or variables from one module to another, you can
use `require`.

### Export Several Objects
```js
// module1
let someVariable = 2;
module.exports.someProperty = someVariable;
function printHello(name) {
	console.log(`Hello ${name}!`);
}
module.exports.someFunction = printHello;

// main module
let module1 = require('./module1');
console.log(module1.someProperty);
console.log(module1.someFunction('Kane'));
```
Also you can use short form `exports` instead os `modulw.exports`.

