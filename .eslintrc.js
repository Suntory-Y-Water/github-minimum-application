// .eslintrcファイルは扱いやすくするために拡張子を.jsにして以下のように変更します。
/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'next/core-web-vitals',
    'prettier',
    'plugin:@typescript-eslint/recommended',
  ],
};
