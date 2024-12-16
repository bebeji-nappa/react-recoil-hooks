import typescriptEslint from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { fixupPluginRules } from "@eslint/compat";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [{
  ignores: [
    "**/dist/",
    "**/.yarn/",
    "**/node_modules/",
    "src/test/",
    "**/example/"
  ],
}, ...compat.extends(
  "plugin:react/recommended",
  "plugin:@typescript-eslint/eslint-recommended",
  "plugin:@typescript-eslint/recommended",
  "prettier",
), {
  plugins: {
    "@typescript-eslint": typescriptEslint,
    react,
    "react-hooks": fixupPluginRules(reactHooks),
  },
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.jest,
    },
    parser: tsParser,
    ecmaVersion: 2021,
    sourceType: "module",

    parserOptions: {
      project: "./tsconfig.eslint.json",

      ecmaFeatures: {
        jsx: true,
        modules: true,
      },

      tsconfigRootDir: "./",
    },
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
      },
    },
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
  },
}, {
  files: ["**/*.tsx"],
  rules: {
    "react/prop-types": "off",
  },
}];
