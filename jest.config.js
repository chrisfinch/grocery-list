module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: [
    './test/setup.ts'
  ],
  "globals": {
    "ts-jest": {
      "tsConfig": "tsconfig.test.json"
    }
  },
  clearMocks: true,
  "snapshotSerializers": [
    "enzyme-to-json/serializer"
  ]
};