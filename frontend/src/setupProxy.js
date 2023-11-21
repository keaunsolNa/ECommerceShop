const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/login', {
      target: 'http://192.168.56.1:8080', // login 프록시
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware('/empBase', {
      target: 'http://192.168.56.1:8080', // employee 프록시
      changeOrigin: true
    })
  );
};
