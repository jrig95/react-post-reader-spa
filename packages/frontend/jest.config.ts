module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  "moduleNameMapper": {
  "\\.(css|less)$": "<rootDir>/__mocks__/fileMock.js"
}
};

export {};
