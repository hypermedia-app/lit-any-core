/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-var-requires */
const merge = require('webpack-merge')
const bsSettings = require('@open-wc/testing-karma-bs/bs-settings.js')
const createBaseConfig = require('./karma.conf.js')

module.exports = (config) => {
    config.set(
        merge(bsSettings(config), createBaseConfig(config), {
            browserStack: {
                project: '@lit-any/core',
            },
        }),
    )

    return config
}
