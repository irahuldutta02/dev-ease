import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tailwind from "eslint-plugin-tailwindcss";
import neostandard from "neostandard";
import ts from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...neostandard(),
  js.configs.recommended,
  ...ts.configs.recommended,
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  ...tailwind.configs["flat/recommended"],
  {
    rules: {
      "@stylistic/quotes": "off",
      "@stylistic/semi": "off",
      "@stylistic/space-before-function-paren": "off",
      "@stylistic/jsx-quotes": "off",
      "tailwindcss/no-custom-classname": "off",
      camelcase: "off",
      "no-undef": "error",
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // Built-in types are first
            "external", // External libraries
            "internal", // Internal modules
            ["parent", "sibling"], // Parent and sibling types can be mingled together
            "index", // Then the index file
            "object", // Object imports
          ],
          "newlines-between": "always",
          pathGroups: [
            {
              pattern: "@app/**",
              group: "external",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    ignores: ["components/ui/**", "node_modules/**"],
  },
];

export default eslintConfig;
