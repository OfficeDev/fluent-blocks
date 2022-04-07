const { createProxyMiddleware } = require('http-proxy-middleware')

const expressMiddleWare = (router) => {
  router.use(
    '/sprites',
    createProxyMiddleware({
      target: 'http://cdn.jsdelivr.net/npm/fluentui-svg-icon-sprites@1.1.167/',
      changeOrigin: true,
      followRedirects: true,
    })
  )
}

module.exports = expressMiddleWare
