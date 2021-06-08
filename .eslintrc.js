module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  rules: {
    "no-console": 0,
    "no-unused-vars": 0,
    "no-undef": 0,
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "space-before-function-paren": 0,
  },
  parser: "vue-eslint-parser",
  extends: ["plugin:vue/essential", "eslint:recommended", "prettier"],
  parserOptions: {
    parser: "babel-eslint",
    ecmaversion: 7,
    sourceType: "module",
  },
};
