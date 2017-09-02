const WebBeeController = require('./WebBeeController');

const tc = new WebBeeController('/api/test');

tc
  .use('GET', 'test1')((ctx) => {
    console.log(`ctx=${JSON.stringify(ctx)}`);
    console.log(`TestController@test1${ctx.request.url}`);
    ctx.body = { status: 'ok' };
  })
  .use('GET', 'test2')((ctx) => {
    console.log(`TestController@test2${ctx.request.url}`);
  });

// or with config
tc.config({
  path: 'test3',
  methods: 'GET',
  run: ctx => console.log(`TestController@test3${ctx.request.url}`),
});

// or config array
tc.config([
  {
    path: 'test4',
    methods: 'GET',
    run: ctx => console.log(`TestController@test4${ctx.request.url}`),
  },
  {
    path: 'test5',
    methods: 'POST,PUT,PATCH',
    run: ctx => console.log(`TestController@test5${ctx.request.url}`),
  },
]);

module.exports = tc;
