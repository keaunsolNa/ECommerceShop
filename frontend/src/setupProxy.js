const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/login', {
      target: 'http://localhost:8080', // login 프록시
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:8080', // employee 프록시
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware('/empBase', {
      target: 'http://localhost:8080', // employee 프록시
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware('/productBase', {
      target: 'http://localhost:8080', // employee 프록시
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware('/memberBase', {
      target: 'http://localhost:8080', // employee 프록시
      changeOrigin: true
    })
  );
};
