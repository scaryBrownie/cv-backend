export default {
  transform: {
    "^.+\\.m?js$": ["babel-jest", { configFile: "./babel.config.js" }],
  },
  testEnvironment: "node",
  moduleFileExtensions: ["js", "mjs"],
  testMatch: ["**/src/test/**/*.test.mjs"],
  verbose: true,
  extensionsToTreatAsEsm: [".mjs"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.mjs$": "$1",
  },
};
