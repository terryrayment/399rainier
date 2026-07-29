import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  {
    ignores: [
      ".next/**",
      ".next-playwright/**",
      "node_modules/**",
      "out/**",
      "public/**",
    ],
  },
];

export default eslintConfig;
