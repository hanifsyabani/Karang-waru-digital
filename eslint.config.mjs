import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript"
  ),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    plugins: {
      "unused-imports": require("eslint-plugin-unused-imports"),
    },
    rules: {
      // 🔥 IMPORT / VARIABLE TIDAK DIPAKAI
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // 🔐 TYPESCRIPT LEBIH KETAT
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "off", // digantikan unused-imports
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
        },
      ],

      // 🚫 BAD PRACTICE
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-var": "error",
      "prefer-const": "error",
    },
  },
];

export default eslintConfig;
