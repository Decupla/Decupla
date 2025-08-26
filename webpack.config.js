const path = require('path');
const scriptDir = path.resolve(__dirname, './app/public/script');

module.exports = {
    entry: {
        editBlock: scriptDir + '/editBlock/main.js',
        editContent: scriptDir + '/editContent/main.js',
        editMenu: scriptDir + '/editMenu/main.js',
        editCollection: scriptDir + '/editCollection/main.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(scriptDir, 'dist'),
    },
    mode: 'development',
};
