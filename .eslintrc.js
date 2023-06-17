module.exports = {
  extends: ['badboyku'],
  settings: {
    react: { version: '999.999.999' },
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.d.ts'],
        moduleDirectory: ['./node_modules', './src'],
      },
      alias: {
        map: [
          ['@', './src'],
          ['@controllers', './src/controllers'],
          ['@errors', './src/errors'],
          ['@middlewares', './src/middlewares'],
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
