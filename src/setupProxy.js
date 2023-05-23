const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/chat',{
            target: 'https://api.pub.xhaiben.com:50007/v1/chat/completions',
            changeOrigin: true,
            logLevel: 'debug',
            pathRewrite: {
                '^/chat': ''
            }
        })
    )
    app.use(
        createProxyMiddleware('/test',{
            target: 'https://www.baidu.com',
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                '^/test': ''
            }
        })
    )
}