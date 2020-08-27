const CracoLessPlugin = require('craco-less');
const { createProxyMiddleware } = require('http-proxy-middleware');
const apiProxyPath = '/klage-permittering-refusjon/api';

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
    plugins: [{ plugin: CracoLessPlugin }],
};
