const path = require('path');
const scriptDir = path.resolve(__dirname, './public/script');

module.exports = {
    entry: {
        editBlock: scriptDir + '/editBlock/main.js',
        editContent: scriptDir + '/editContent/main.js',
        editMenu: scriptDir + '/editMenu/main.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(scriptDir, 'dist'),
    },
    mode: 'development',
};
