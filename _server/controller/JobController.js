const WebBeeController = require('./WebBeeController');
const { JobStore } = require('../data/nedb');

const ctrl = new WebBeeController('/api/job');

ctrl.config([
  {
    path: '',
    methods: 'GET',
    run: async (ctx) => {
      const objects = await JobStore.findAll();
      ctx.body = { data: objects };
      ctx.status = 200;
    },
  },
  {
    path: '',
    methods: 'POST,PUT,PATCH',
    run: async (ctx) => {
      const docs = ctx.request.body;
      const inserted = await JobStore.save(docs);
      ctx.body = { data: { count: inserted.length, inserted } };
      ctx.status = 200;
    },
  },
  {
    path: ':id',
    methods: 'DELETE',
    run: async (ctx) => {
      const id = ctx.params.id;
      if(!id) throw new Error('Invalid id provided');
      const removed = await JobStore.remove(id);
      ctx.body = { data: { count: removed } };
      ctx.status = 200;
    },
  },
  {
    path: ':id',
    methods: 'GET',
    run: async (ctx) => {
      const docs = await JobStore.findById(ctx.params.id);
      ctx.body = { data: docs };
      ctx.status = 200;
    },
  },
]);

module.exports = ctrl;
