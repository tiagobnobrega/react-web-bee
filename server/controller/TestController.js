const WebBeeController = require('./WebBeeController');

const tc = new WebBeeController('/api/test');
//CREATE NeDB Controller for mock pruposes
tc
  .use('GET', 'test1')((ctx) => {
    console.log(`ctx=${JSON.stringify(ctx)}`);
    console.log(`TestController@test1${ctx.request.url}`);
    ctx.body = { status: 'ok' };
  })
  .use('GET', 'test2')((ctx) => {
    console.log(`TestController@test2${ctx.request.url}`);
  });
module.exports = tc;
