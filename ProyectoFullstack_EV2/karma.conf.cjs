// karma.conf.cjs
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],

    // Usar 'src/**/*.spec.js*' para evitar el fallo de mtime en Karma
    files: [
      { pattern: 'src/**/*.spec.js*', watched: false, type: 'module' }
    ],

    preprocessors: {
      'src/**/*.spec.js*': ['esbuild']
    },

    esbuild: {
      target: 'es2022',
      jsx: 'automatic',
      loader: { '.js': 'jsx', '.jsx': 'jsx' },
      define: {
        'process.env.NODE_ENV': JSON.stringify('development')
      }
    },

    reporters: ['progress'],

    browsers: ['Edge'], 

    singleRun: true,
    autoWatch: false,

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    concurrency: 1
  });
};