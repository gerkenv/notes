'use strict';

const exportsMany = require('./basic/exportsMany');
console.log(new exportsMany.Rectangle(3, 5).area());
console.log(new exportsMany.Square(3).area());
exportsMany.sum(2, 9);

const exportOne = require('./basic/ExportsOne');
exportOne(4);

const processBasic = require('./basic/processbasic');
console.log(processBasic.getArgs());

var a = 1;
console.log(global.a);

// process.exit(0);