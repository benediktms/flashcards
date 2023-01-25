/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  importOrder: ['<THIRD_PARTY_MODULES>', '^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
};
