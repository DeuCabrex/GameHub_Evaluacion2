// karma.conf.cjs
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],

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

    // Cambiado a Chrome
    browsers: ['Chrome'], 

    singleRun: true,
    autoWatch: false,

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    concurrency: 1
  });
};