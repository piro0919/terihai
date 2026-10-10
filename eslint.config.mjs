import { fixupPluginRules } from "@eslint/compat";
import js from "@eslint/js";
import magicNumbers from "@piro0919/eslint-config";
import tsParser from "@typescript-eslint/parser";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import css from "eslint-plugin-css";
import cssModules from "eslint-plugin-css-modules";
import ext from "eslint-plugin-ext";
import filenamesPlugin from "eslint-plugin-filenames";
import noUnsanitized from "eslint-plugin-no-unsanitized";
import perfectionist from "eslint-plugin-perfectionist";
import promise from "eslint-plugin-promise";
import security from "eslint-plugin-security";
import unusedImports from "eslint-plugin-unused-imports";
import writeGoodComments from "eslint-plugin-write-good-comments";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  {
    files: ["**/*.{js,jsx,ts,tsx,mjs}"],
  },
  js.configs.recommended,
  css.configs["flat/recommended"],
  noUnsanitized.configs.recommended,
  promise.configs["flat/recommended"],
  security.configs.recommended,
  ...nextVitals,
  ...nextTs,
  ...magicNumbers(),
  prettier,
  {
    languageOptions: {
      ecmaVersion: 2024,
      parser: tsParser,
      parserOptions: {
        project: ["./tsconfig.json"],
        warnOnUnsupportedTypeScriptVersion: false,
      },
      sourceType: "module",
    },
    plugins: {
      css,
      "css-modules": cssModules,
      ext,
      filenames: fixupPluginRules(filenamesPlugin),
      perfectionist,
      promise,
      "unused-imports": unusedImports,
      "write-good-comments": writeGoodComments,
    },
    rules: {
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-img-element": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          fixStyle: "inline-type-imports",
          prefer: "type-imports",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/promise-function-async": "error",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "css-modules/no-unused-class": [2, { camelCase: true }],
      "css-modules/no-undef-class": [2, { camelCase: true }],
      "ext/lines-between-object-properties": ["error", "never"],
      "filenames/match-exported": ["error", ["camel", "kebab", "pascal"]],
      "filenames/match-regex": "error",
      "filenames/no-index": "off",
      "import/newline-after-import": ["error", { count: 1 }],
      "import/order": "off",
      "import/prefer-default-export": "error",
      "no-duplicate-imports": "error",
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          next: [
            "block",
            "block-like",
            "break",
            "class",
            "const",
            "do",
            "export",
            "function",
            "let",
            "return",
            "switch",
            "try",
            "while",
          ],
          prev: "*",
        },
        {
          blankLine: "always",
          next: "*",
          prev: [
            "block",
            "block-like",
            "break",
            "class",
            "const",
            "do",
            "export",
            "function",
            "let",
            "return",
            "switch",
            "try",
            "while",
          ],
        },
        {
          blankLine: "never",
          next: "import",
          prev: "*",
        },
        {
          blankLine: "never",
          next: ["case", "default"],
          prev: "case",
        },
        {
          blankLine: "never",
          next: "const",
          prev: "const",
        },
        {
          blankLine: "never",
          next: "let",
          prev: "let",
        },
      ],
      "perfectionist/sort-exports": [
        "error",
        {
          order: "asc",
          partitionByNewLine: true,
          type: "natural",
        },
      ],
      "perfectionist/sort-imports": [
        "error",
        {
          groups: [
            ["builtin", "external"],
            "internal",
            ["parent", "sibling"],
            "index",
            "ts-equals-import",
            "type",
            "unknown",
          ],
          newlinesBetween: 0,
          order: "asc",
          type: "natural",
        },
      ],
      "perfectionist/sort-interfaces": [
        "error",
        {
          order: "asc",
          type: "natural",
        },
      ],
      "perfectionist/sort-jsx-props": [
        "error",
        {
          groups: ["multiline-prop", "shorthand-prop", "unknown"],
          order: "asc",
          type: "natural",
        },
      ],
      "perfectionist/sort-named-imports": [
        "error",
        {
          order: "asc",
          type: "natural",
        },
      ],
      "perfectionist/sort-object-types": [
        "error",
        {
          type: "natural",
          order: "asc",
        },
      ],
      "perfectionist/sort-objects": [
        "error",
        {
          order: "asc",
          type: "natural",
        },
      ],
      "perfectionist/sort-union-types": [
        "error",
        {
          order: "asc",
          type: "natural",
        },
      ],
      quotes: ["error", "double"],
      "react-hooks/exhaustive-deps": [
        "error",
        {
          enableDangerousAutofixThisMayCauseInfiniteLoops: true,
        },
      ],
      "react/jsx-boolean-value": ["error", "always"],
      "react/jsx-newline": [
        "error",
        {
          prevent: true,
        },
      ],
      semi: ["error", "always"],
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          vars: "all",
          varsIgnorePattern: "^_",
        },
      ],
      "write-good-comments/write-good-comments": "error",
    },
  },
  // 名前が決まっているファイル（Next の設定と型の宣言）は、ファイル名の決まりから外す
  {
    files: ["next.config.ts", "**/*.d.ts"],
    rules: {
      "filenames/match-exported": "off",
      "filenames/match-regex": "off",
    },
  },
  // ツールの設定ファイルは tsconfig に入っておらず、型を使う検査で読めない。前の next lint も見ていなかった
  globalIgnores([
    ".prettierrc.js",
    "commitlint.config.js",
    "eslint.config.mjs",
  ]),
]);

export default eslintConfig;
