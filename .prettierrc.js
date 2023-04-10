const tailwindPlugin = require('prettier-plugin-tailwindcss');
const importsPlugin = require('@ianvs/prettier-plugin-sort-imports');

/**
 * Defining the plugins this way is a workaround as the tailwind & the imports plugin wouldn't work otherwise when
 * installed together.
 *
 * General info about the issue:
 *   - https://github.com/tailwindlabs/prettier-plugin-tailwindcss/issues/31
 *   - https://github.com/tailwindlabs/prettier-plugin-tailwindcss/issues/9
 *
 * Details about the workaround:
 *   - Base: https://github.com/tailwindlabs/prettier-plugin-tailwindcss/issues/9#issuecomment-1021028722
 *   - Addition: https://github.com/tailwindlabs/prettier-plugin-tailwindcss/issues/9#issuecomment-1157359437
 *   - Reference rc file: https://github.com/Combeenation/cbn-prettier-config/pull/3/files
 */

const plugins = [
  {
    parsers: {
      typescript: {
        ...tailwindPlugin.parsers.typescript,
        preprocess: importsPlugin.parsers.typescript.preprocess,
      },
    },
    options: {
      ...tailwindPlugin.options,
      ...importsPlugin.options,
    },
  },
];

/** @type {import("prettier").Config} */
module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  importOrder: ['<THIRD_PARTY_MODULES>', '^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  plugins,
};
