module.exports = function(config) {
    config.set({
        basePath: "",
        frameworks: ["mocha"],
        files: [
            "node_modules/expect.js/index.js",
            "node_modules/sinon-chrome/bundle/sinon-chrome-webextensions.min.js",
            "extension/*.js",
            "tests/*.js"
        ],
        exlude: [],
        client: {
            captureConsole: false,
            mocha: {
                reporter: "html"
            }
        },
        preprocessors: {
            '**/extension/*.js': 'coverage'
        },
        reporters: ["mocha", "coverage"],
        coverageReporter: {
            type : 'html',
            dir : 'coverage/'
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ["Firefox"],
        singleRun: true,
        concurrency: 2,
        failOnEmptyTestSuite: true
    });
};