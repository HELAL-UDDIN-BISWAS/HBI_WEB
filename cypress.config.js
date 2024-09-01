const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        baseUrl: process.env.NEXT_PUBLIC_URL,
    },
    component: {
        devServer: {
            framework: 'next',
            bundler: 'webpack',
        },
    },
})
