module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
    ecmaVersion: 2021,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "@vue/typescript/recommended",
    // Prettier
    // "@vue/prettier",
    // "@vue/prettier/@typescript-eslint",
  ],
  plugins: [],
  rules: {
    // "prettier/prettier": "error",
    // override/add rules settings here, such as:
    // "vue/no-unused-vars": "error",
  },
}
