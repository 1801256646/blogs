const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
	app.use(
		createProxyMiddleware('/api', {
			target: 'http://120.78.142.48:3004', //换成你自己的域名
			pathRewrite: {
				'^/api': '',
			},
			changeOrigin: true,
			secure: false, // 是否验证证书
		})
	)
}
