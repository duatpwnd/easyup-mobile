module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "prettier/prettier": 0,
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-prototype-builtins": "off",
    "no-undef": "off",
    "no-redeclare": "off",
    "no-useless-escape": "off",
    "no-unsafe-negation": "off",
    "no-irregular-whitespace": "off",
    "no-unused-vars": "off",
    "no-debugger": "off",
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
