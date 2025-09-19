import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import unusedImports from "eslint-plugin-unused-imports";
import importPlugin from "eslint-plugin-import";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set up compatibility layer for importing configs from the legacy format
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {
    extends: ["eslint:recommended"],
  },
});

// Optimized config for Next.js + TypeScript project
const eslintConfig = [
  // Global settings
  {
    ignores: [
      "**/node_modules/**",
      ".next/**",
      "next-env.d.ts",
      "out/**",
      "dist/**",
      "**/.git/**",
      "**/.github/**",
      "**/.vscode/**",
      "**/*.min.js",
      "**/build/**",
      "eslintCheck.js", // Ignoring this utility file
    ],
  },

  // Plugin setup
  {
    plugins: {
      "unused-imports": unusedImports,
      import: importPlugin,
    },
  },

  // Extend Next.js configs
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Base JavaScript files
  {
    files: ["**/*.js", "**/*.jsx", "**/*.mjs"],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: "readonly",
        JSX: "readonly",
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
  },

  // TypeScript/React files
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
      },
      globals: {
        React: "readonly",
        JSX: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },

    // Common rules for all JavaScript and TypeScript files
    rules: {
      // Base rules
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      "prefer-const": "error",
      "no-unused-vars": "off", // Turn off the base rule

      // Import/export rules
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
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
          pathGroups: [
            { pattern: "react", group: "external", position: "before" },
            { pattern: "next/**", group: "external", position: "before" },
            { pattern: "@/**", group: "internal" },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "never",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      // React specific rules
      "react/react-in-jsx-scope": "off", // Next.js doesn't need React imported
      "react/prop-types": "off", // Use TypeScript for prop validation
      "react/display-name": "off", // forwardRef components don't always need display names

      // Next.js specific rules
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          components: ["Link"],
          specialLink: ["hrefLeft", "hrefRight"],
          aspects: ["invalidHref", "preferButton"],
        },
      ],
    },
  },

  // TypeScript-specific rules
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // TypeScript specific rules
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
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off", // Next.js doesn't require this
      "@typescript-eslint/no-non-null-assertion": "warn",

      // Type imports handling
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
