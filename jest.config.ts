// !!!! not used, because Vitest is used

export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest', // process `*.tsx` files with `ts-jest`
  },
  // for static files we need mock, that is defined in that file
  // and also support for aliases
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
    // '^@containers/(.*)$': '<rootDir>/src/containers/$1',
  },
}
