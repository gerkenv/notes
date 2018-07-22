# Node.js basic syntax

## Version
Run `node --version`;

## Updating `node` and `npm`
* https://stackoverflow.com/questions/18412129/how-can-i-update-npm-on-windows/27464115

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

### Extending `exports`
```js
// module1
let someVariable = 2;
module.exports.someProperty = someVariable;
function printHello(name) {
	console.log(`Hello ${name}!`);
}
module.exports.someFunction = printHello;
module.exports.sum = (a, b) => console.log(`Sum is ${a + b}`);

// main module (has to be located in the same folder)
let module1 = require('./module1');
console.log(module1.someProperty);
module1.someFunction('Kane');
module1.sum(2,9);
```
Also you can use short form `exports` instead os `module.exports`.

### Overrwritting `exports`
```js
module.exports = function (number) {
    console.log('Number is ' + number);
}
// main
const module2 = require('./basic/module2');
module2(4);
```

### Node Package Manager (NPM)
* `npm --version`/ `npm -v` - get version.
* `npm install underscore` - loads the `underscore` module from network and installs it locally in `./node_modules/underscore`.
* `npm install underscore -g ` - loads the `underscore` module from network and installs it globaly in `/usr/local` or wherever node is installed. Use `npm config list` to figure out the location.

Then you can import this module in your file with:
```js
var _ = require('underscore');  // You do not need a path in this case.
                                // Module name is enough.
```

* `npm init` - creates the `package.json` - project description with version, author, dependecies and etc.
* 'npm install' - checks if the `package.json` is available in current folder and installs all described dependencies.
* `npm install backbone -s` - loads the `backbone` module from network, installs it locally in `./node_modules/underscore` and saves this dependency in your `package.json`.

## Built-in `http` Module
```js
var http + require('http');

http.createServer(function(){

});
```