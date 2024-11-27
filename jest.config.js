config = {
  preset: '@vue/cli-plugin-unit-jest/presets/no-babel',
  testMatch: ["**/_test/**/*.js"],
  verbose: true,
  moduleFileExtensions: [
    "js",
    "vue"
  ],
  transform: {
    ".*\\.(vue)$": "vue-jest"
  }
};

module.exports = config;
