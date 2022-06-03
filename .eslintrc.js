/*
 * @Author: your name
 * @Date: 2021-05-15 14:28:04
 * @LastEditTime: 2022-05-26 13:47:58
 * @LastEditors: LSC
 * @Description: In User Settings Edit
 * @FilePath: \Bohe\bohe\.eslintrc.js
 */
module.exports = {
  extends: ['react-app', 'react-app/jest', 'prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-irregular-whitespace': 'off',
    'space-before-function-paren': 0,
    'no-unused-vars': 0, // 未使用变量不提示
    'eslint-disable-next-line': 'off',
    '@typescript-eslint/no-unused-vars': ['off'],
  },
}
