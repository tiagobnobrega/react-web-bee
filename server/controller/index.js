const Router = require('koa-router');
const WebBeeController = require('./WebBeeController');
const KoaBody = require('koa-body');
const requireAll = require('require-all');
  // {getId, list, createItem, updateItem, removeItem} = require('../controllers/indexController');

const router = new Router();

const controllers = requireAll({
  dirname: `${__dirname}`,
  filter: (filename) => {
    if (filename === 'WebBeeController.js' || filename === 'index.js') {
      return false;
    }
    return filename.replace('.js', '');
  },
  recursive: true,
});

Object.entries(controllers).forEach((pair) => {
  const name = pair[0];
  const controller = pair[1];
  if (!(controller instanceof WebBeeController)) {
    console.warn(`Module ${name} is not instance of WebBeeController, ignoring...`);
  } else {
    controller.getMethods().forEach((method) => {
      console.log(`registering controller uri: ${JSON.stringify(method)}`);
      method.httpMethods
        .forEach((httpMethod) => {
          console.log(`registering controller uri: ${httpMethod}:${method.path}`);
          router[httpMethod](method.path, KoaBody(), method.fn);
        });
      router.get(method.path, KoaBody(), method.fn);
    });
  }
  // console.log(`${pair[0]}=${JSON.stringify(pair[1])}`);
});


// console.log('controllers:',controllers);

const log = route => async (ctx, next) => {
  console.log(`hit:${route}`);
  console.log(`ctx.request:${JSON.stringify(ctx.request.body)}`);
  ctx.body = { foo: 'bar', route };
  await next();
};

router.get('/users', log('GET users'));

// Criar controllers dinamicamente, e registrar nas rotas
// router
//   .get('/health', async (ctx, next) => { ctx.body = { status: 'ok' }; await next(); })
//   .get('/users', log('GET users'))
//   .get('/users/:id', log('GET users/:id'))
//   .post('/users/', KoaBody(), log('POST users/'))
//   .put('/users/:id', KoaBody(), log('POST users/:id'))
//   .delete('/users/:id', log('DELETE users/:id'));


module.exports = {
  routes() { return router.routes(); },
  allowedMethods() { return router.allowedMethods(); },
};
