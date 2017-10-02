const WebBeeController = require('./WebBeeController');
const { ProjectStore } = require('../data/nedb');

const ctrl = new WebBeeController('/api/project');

ctrl.config([
  {
    path: 'all',
    methods: 'GET',
    run: async (ctx) => {
      const projects = await ProjectStore.findAll();
      ctx.body = { data: projects };
      ctx.status = 200;
    },
  },
  {
    path: 'save',
    methods: 'POST,PUT,PATCH',
    run: async (ctx) => {
      const docs = ctx.request.body;
      const inserted = await ProjectStore.save(docs);
      ctx.body = { data: { count: inserted.length, inserted } };
      ctx.status = 200;
    },
  },
  {
    path: 'remove',
    methods: 'POST,PUT,PATCH',
    run: async (ctx) => {
      const ids = ctx.request.body;
      const removed = await ProjectStore.remove(ids);
      ctx.body = { data: { count: removed } };
      ctx.status = 200;
    },
  },
  {
    path: 'findByCode/:code',
    methods: 'GET',
    run: async (ctx) => {
      const docs = await ProjectStore.findByCode(ctx.params.code);
      ctx.body = { data: docs };
      ctx.status = 200;
    },
  },
]);

module.exports = ctrl;
