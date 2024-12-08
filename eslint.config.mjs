import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"], 
    languageOptions: {
      sourceType: "commonjs",  // Para projetos Node.js
      globals: {
        ...globals.browser,  // Variáveis do ambiente de navegador
        process: "readonly",  // Adiciona o 'process' como uma variável global de leitura
        console: "readonly",  // Adiciona o 'console' como uma variável global de leitura
      },
    },
  },
  pluginJs.configs.recommended,
];
