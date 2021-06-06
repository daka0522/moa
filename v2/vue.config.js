const path = require('path')

module.exports = {
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "@/styles/_variables.scss";`
            }
        }
    },

    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [
                path.resolve(__dirname, './src/styles/*.scss')
            ]

        }
    }
}