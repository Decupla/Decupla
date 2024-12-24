const path = require('path');
const scriptDir = path.resolve(__dirname, './public/script');

module.exports = {
    entry: {
        editBlock: scriptDir + '/editBlock/main.js',
        editContent: scriptDir + '/editContent/main.js',
        editMenu: scriptDir + '/editMenu/main.js',
    },
    output: {
        filename: '[name].bundle.js', // Platzhalter [name] nimmt den Entry-Point-Namen an
        path: path.resolve(scriptDir, 'dist'), // Absoluter Pfad für das Output-Verzeichnis
    },
    mode: 'development',
};
