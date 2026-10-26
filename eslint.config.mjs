import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
<<<<<<< HEAD
=======
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
>>>>>>> origin/main

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
<<<<<<< HEAD
=======
  prettierConfig, // Deve ser o último para sobrescrever outras regras
  {
    plugins: {
      prettier: prettier,
    },
    rules: {
      "prettier/prettier": "error",
      // Adicione outras regras customizadas aqui se necessário
    },
  },
>>>>>>> origin/main
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
