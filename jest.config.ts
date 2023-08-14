module.exports = {
  // ... other jest configurations ...
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  },
  "moduleNameMapper": {
  "\\.(css|less)$": "<rootDir>/__mocks__/fileMock.js"
}
};
