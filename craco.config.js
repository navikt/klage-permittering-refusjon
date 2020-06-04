const CracoLessPlugin = require('craco-less');
const { createProxyMiddleware } = require('http-proxy-middleware');
const apiProxyPath = '/klage-permittering-refusjon/api';

const eslint = {
    enable: true,
    mode: 'extends',
    configure: {
        extends: 'react-app',
        rules: {
            // Det er en bug i denne sjekken som automatisk feiler på ÆØÅ
            // https://github.com/yannickcr/eslint-plugin-react/issues/1654
            'react/jsx-pascal-case': 'off',
        },
    },
};

const localProxy = {
    before: (app) => {
        app.use(
            createProxyMiddleware(apiProxyPath, {
                target: 'http://localhost:8080/klage-permittering-refusjon-api',
                changeOrigin: true,
                pathRewrite: (path, req) => path.replace(apiProxyPath, ''),
            })
        );
    },
};

module.exports = {
    plugins: [{ plugin: CracoLessPlugin }],
    devServer: localProxy,
    eslint,
};
