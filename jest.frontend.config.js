module.exports = {
    roots: ['<rootDir>/public/script'],
    transform: {
      '^.+\\.js$': 'babel-jest',  // Babel verwenden, um ES6+ zu kompilieren
    },
    testEnvironment: 'jsdom',  // Testumgebung für Frontend-Tests
    testMatch: [
      '**/public/script/**/__tests__/**/*.[jt]s?(x)',  // Testdateien im __tests__-Ordner
      '**/?(*.)+(spec|test).[jt]s?(x)',  // Alternative: *.test.js oder *.spec.js
    ],
    moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  };  