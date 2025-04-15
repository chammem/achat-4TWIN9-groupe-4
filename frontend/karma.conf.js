module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // Options de configuration pour Jasmine
      },
      clearContext: false // Laisser les résultats du test visibles dans le navigateur
    },
    jasmineHtmlReporter: {
      suppressAll: true // Supprimer les traces dupliquées
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/achat-frontend'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'lcovonly' }
      ]
    },

    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    customLaunchers: {
      ChromeWSL: {
        base: 'Chrome',
        flags: [
          '--no-sandbox',
          '--remote-debugging-port=9222',
          '--disable-gpu',
          '--headless'
        ],
        executablePath: '/mnt/c/Program Files/Google/Chrome/Application/chrome.exe' // Remplace par ton chemin de Chrome sur Windows
      }
    },
    browsers: ['ChromeWSL'], // Utilisation du custom launcher ChromeWSL
    singleRun: false,
    restartOnFileChange: true
  });
};
