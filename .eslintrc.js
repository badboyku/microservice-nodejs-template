module.exports = {
  extends: ['badboyku'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['controllers', './src/controllers/'],
          ['errors', './src/errors/'],
          ['middlewares', './src/middlewares/'],
          ['routes', './src/routes/'],
          ['services', './src/services/'],
          ['types', './src/@types/global.d.ts'],
          ['utils', './src/utils/'],
        ],
        extensions: ['.js', '.ts'],
      },
      node: {
        extensions: ['.js', '.ts', '.d.ts'],
        moduleDirectory: ['./node_modules', './src'],
      },
    },
    react: { version: '999.999.999' },
  },
  rules: {},
};
