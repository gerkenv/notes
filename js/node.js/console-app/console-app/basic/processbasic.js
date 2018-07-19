
// get command-line arguments
// 0 - name of `node` command
// 1 - name of a main script
module.exports.getArgs = getArgs;
function getArgs() {
    return process.argv;
}