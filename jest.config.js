module.exports = {
  transform: {
    "^.+\\.m?js$": "babel-jest",
  },
  testEnvironment: "node",
  moduleFileExtensions: ["js", "mjs"],
  testMatch: ["**/src/test/**/*.test.mjs"],
  verbose: true,
};
