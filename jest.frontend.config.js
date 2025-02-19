module.exports = {
    roots: ['<rootDir>/public/script'],
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    testEnvironment: 'jsdom',
    testMatch: [
      '**/public/script/**/__tests__/**/*.[jt]s?(x)',
      '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
    moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  };  