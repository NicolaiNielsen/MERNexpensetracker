const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 2022,
      sourceType: "script"
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "no-undef": "error"
    }
  }
];
