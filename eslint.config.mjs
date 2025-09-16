import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import unusedImports from "eslint-plugin-unused-imports";
import importPlugin from "eslint-plugin-import";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    plugins: {
      "unused-imports": unusedImports,
      import: importPlugin,
    },
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "**/*.mjs"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
    rules: {
      // Error on unused variables and arguments
      "no-unused-vars": "off", // Turn off the base rule as it can report incorrect errors
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_", // Variables starting with underscore are ignored
          args: "after-used",
          argsIgnorePattern: "^_", // Arguments starting with underscore are ignored
          ignoreRestSiblings: true,
          caughtErrors: "all",
        },
      ],
      // Detect unused imports
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      // Type import handling
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: false,
        },
      ],
    },
  },
];

export default eslintConfig;
