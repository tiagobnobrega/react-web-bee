// Basic imports
const ENV = require('./config/ENV');
const path = require('path');
const chalk = require('chalk');
// Server imports

const http = require('http');
const Koa = require('koa');
// Middlewares
const err = require('./middleware/error');
const serve = require('koa-static');
const historyFallback = require('./middleware/history-fallback');
const mgmt = require('./middleware/mgmt');
const { routes, allowedMethods } = require('./controller');

const app = new Koa();
// define public static dir
const publicDir = path.join(__dirname, ENV.PUBLIC_DIR);

// Error middleware
app.use(err);
// load routes
app.use(routes());
// define routes allowedMethods
app.use(allowedMethods());
// load mgmt routes
app.use(mgmt);
// serve static content
app.use(serve(publicDir));
// use history-api-fallback
app.use(historyFallback());

// Start server
http.createServer(app.callback()).listen(ENV.PORT, () => {
  console.log(chalk.green(`${ENV.name} listening at port ${ENV.PORT}`));
});


// servir conteúdo estático
// app.use(express.static(publicDir));

// montar endpoint de mock
// app.use('/mock', jsonServer.router(MOCK_DB));

// recuperar proxies
// const { ApiAuth, Logger } = require('./middleware/proxies');

// registrar proxy-middleware
// app.use('/api/**', [Logger, ApiAuth]);

// app.get('/health', (req, res) => {
//   res.status(200)
//     .send(JSON.stringify({ status: 'ok' }));
// });

// registrar controllers
// const controllers = require('./server/controller');

// controllers.forEach((c) => {
//   console.log(`registering: [${c.method}] [${c.path}]` /* ['+c.func+']' */);
//   app[c.method](c.path, [Logger, c.func]);
// });

// server.post('/login',function(req, res){
//     console.log('POST LOGIN!!!!');
//    let body = req.body;
//    let appKey = body.pwd;
//    if(appKey===ENV.APP_PWD){
//        res.setHeader('Content-Type', 'application/json');
//        res.send(JSON.stringify({key:ENV.APP_SECRET}));
//    }else{
//        res.setHeader('Content-Type', 'application/json');
//        res.status(401)
//            .send(JSON.stringify({ status: 401}));
//    }
//
// });

// //API SERVER PROXY
// server.post('^/api/.*$', function(req, res) {
//     request({ url: ENV.API_BASE_URL +"/"+ req.path, headers: req.headers, body: req.body },
// function(err, remoteResponse, remoteBody) {
//         if (err) { return res.status(500).end('Error'); }
//         res.writeHead(); // copy all headers from remoteResponse
//         res.end(remoteBody);
//     });
// });

// const server = app.listen(ENV.PORT, (err) => {
//   if (err) console.error(err);
//   const startMessage = `Server listening port : ${server.address().port}`;
//   console.log(chalk.green(startMessage));
// });
