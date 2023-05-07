module.exports = {
  extends: ['badboyku'],
  settings: {
    react: { version: '999.999.999' },
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@controllers', './src/controllers'],
          ['@errors', './src/errors'],
          ['@routes', './src/routes'],
          ['@services', './src/services'],
          ['@types', './src/@types/global.d.ts'],
          ['@utils', './src/utils'],
        ],
        extensions: ['.js', '.ts'],
      },
    },
  },
  rules: {},
};
