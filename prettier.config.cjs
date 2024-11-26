const config = {
  importOrder: [
    "^react$",
    "^next/(.*)$",
    "<THIRD_PARTY_MODULES>",
    "store$",
    "^app/(.*)$",
    "^components/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,

  plugins: [
    require.resolve("@trivago/prettier-plugin-sort-imports"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
};

module.exports = config;
