const spawn = require('cross-spawn');

/**
 * @param command - CLI command
 */
exports.execCommand = (command) => {
    return new Promise((resolve, reject) => {
        console.log(`${command}`);
        const commandArr = command.split(' ');
        // spawn.sync format is like.., `spawn.sync('npm', ['list', -g', '--depth', '0'])`
        const result = spawn.sync(commandArr.shift(), commandArr, { stdio: 'inherit' });
        if (result.error) reject(error);
        resolve(result.stdout);
    });
}