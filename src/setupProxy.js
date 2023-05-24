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
        createProxyMiddleware('/audio',{
            target: 'https://tts.vip.sankuai.com/api/v1/tts',
            changeOrigin: true,
            logLevel: 'debug',
            pathRewrite: {
                '^/audio': ''
            }
        })
    )
}