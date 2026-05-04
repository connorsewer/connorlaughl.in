import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // This repository contains unrelated nested workspaces/archive folders.
    // Keep portfolio linting scoped to the actual Next app files.
    "TSI Marketing Machine/**",
    "backups/**",
    "career/**",
    "graph/**",
    "mcOS-deploy/**",
    "memory/**",
    "ops/**",
    "singularity-core/**",
    "singularity-infra/**",
    "skills/**",
  ]),
]);

export default eslintConfig;
