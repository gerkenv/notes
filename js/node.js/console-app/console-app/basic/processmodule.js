'use strict';

// http://stackabuse.com/command-line-arguments-in-node-js/

// get command-line arguments
// 0 - name of `node` command
// 1 - name of a main script
// [2, ...] - arguments
module.exports.getArgs = getArgs;
function getArgs() {
    return process.argv;
}