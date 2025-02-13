export default {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@pages': '<rootDir>/src/pages',
    '^@components': '<rootDir>/src/components',
    '^@ui': '<rootDir>/src/components/ui',
    '^@ui-pages': '<rootDir>/src/components/ui/pages',
    '^@utils-types': '<rootDir>/src/utils/types',
    '^@api': '<rootDir>/src/utils/burger-api.ts'
  },
  globals: {
    fetch: global.fetch
  }
};
