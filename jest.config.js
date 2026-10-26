/** @type {import('jest').Config} */
export default {
  testEnvironment: '<rootDir>/jest.environment.cjs',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/shared/test/setup.ts'],
  transform: {
    '^.+\\.(m?js|tsx?)$': '<rootDir>/jest.transform.cjs',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(react-router|@remix-run|cookie-es)/)',
  ],
  moduleNameMapper: {
    '\\.module\\.scss$': 'identity-obj-proxy',
    '\\.(css|scss)$': '<rootDir>/src/shared/test/styleMock.ts',
    '\\.(svg|png|jpe?g|webp)$': '<rootDir>/src/shared/test/fileMock.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  clearMocks: true,
};
