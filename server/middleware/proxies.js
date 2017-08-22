const ENV = require('../config/ENV');
const httpProxyMiddleware = require('http-proxy-middleware');

// Instanciar proxy para log de controller
const Logger = function (req, res, next) {
  console.log(`Requesting: ${req.hostname}${req.path}`);
  next();
};
// Instanciar proxy para api
// TODO NÃO ESTÁ FUNCIONANDO, VERIFICAR O PORQUE
const ApiProxy = httpProxyMiddleware('/api/**', {
  target: ENV.API_BASE_URL,
  proxyTimeout: ENV.PROXY_TIMEOUT,
  pathRewrite(path) {
    // let p = path;
    const p = path.replace('/api', '');
    console.log(`ENV.API_BASE_URL=${ENV.API_BASE_URL}`);
    console.log(`redirecting: ${path}>>${ENV.API_BASE_URL}${p}`);
    return `/service${p}`;
  },
  onProxyReq(/* proxyReq, req */) {
    console.log('ON PROXY...');
  },
});

const ApiAuth = function (req, res, next) {
  const authKey = req.header('Authorization');
  if (!authKey || authKey !== ENV.APP_SECRET) {
    res.setHeader('Content-Type', 'application/json');
    res.status(401)
      .send(JSON.stringify({ status: 401 }));
  } else {
    next();
  }
};

module.exports = { ApiProxy, ApiAuth, Logger };
