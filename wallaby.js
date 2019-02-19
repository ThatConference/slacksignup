module.exports = wallaby => ({
  // eslint-disable-line
  files: ['src/**/*.js', 'src/**/*.graphql', '!src/**/__tests__/**.js'],
  tests: ['src/**/__tests__/**.js'],
  env: {
    type: 'node',
    runner: 'node'
  },
  testFramework: 'jest',
  compilers: {
    '**/*.js': wallaby.compilers.babel()
  }
});
