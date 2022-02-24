const CracoLessPlugin = require('craco-less');
const { ESLINT_MODES } = require('@craco/craco');
const { createProxyMiddleware } = require('http-proxy-middleware');
const apiProxyPath = '/klage-permittering-refusjon/api';
const { ChangeJsFilename, ChangeCssFilename } = require('@navikt/craco-plugins');

module.exports = function () {
    return {
        eslint: {
            mode: ESLINT_MODES.file
        },
        plugins: [{ plugin: CracoLessPlugin }, { plugin: ChangeCssFilename }, { plugin: ChangeJsFilename }]
    };
};
/*
module.exports = {
    devServer: {
        before: (app) => {
            app.use(
                createProxyMiddleware(apiProxyPath, {
                    target: 'http://localhost:8080/klage-permittering-refusjon-api',
                    changeOrigin: true,
                    pathRewrite: (path, req) => path.replace(apiProxyPath, ''),
                })
            );
        }
    },
    eslint: {
        mode: ESLINT_MODES.file
    },
    plugins: [{ plugin: CracoLessPlugin }, { plugin: ChangeCssFilename }, { plugin: ChangeJsFilename }],
};
**/
