'use strict';

const exportsObjects = require('./basic/exportsobjects');
console.log(new exportsObjects.Rectangle(3, 5).area());
console.log(new exportsObjects.Square(3).area());
exportsObjects.sum(2, 9);

const exportsSingleObject = require('./basic/exportssingleobject');
exportsSingleObject(4);

const processModule = require('./basic/processmodule');
console.log(processModule.getArgs());

var a = 1;
console.log(global.a);

global.a = 2;
console.log(global.a);

// process.exit(0);