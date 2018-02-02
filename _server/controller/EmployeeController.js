const WebBeeController = require('./WebBeeController');
const { EmployeeStore } = require('../data/nedb');

const ctrl = new WebBeeController('/api/employee');

ctrl.config([
  {
    path: '',
    methods: 'GET',
    run: async (ctx) => {
      const projects = await EmployeeStore.findAll();
      ctx.body = { data: projects };
      ctx.status = 200;
    },
  },
  {
    path: '',
    methods: 'POST,PUT,PATCH',
    run: async (ctx) => {
      const docs = ctx.request.body;
      const inserted = await EmployeeStore.save(docs);
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
      const removed = await EmployeeStore.remove(id);
      ctx.body = { data: { count: removed } };
      ctx.status = 200;
    },
  },
  {
    path: ':id',
    methods: 'GET',
    run: async (ctx) => {
      const docs = await EmployeeStore.findById(ctx.params.id);
      ctx.body = { data: docs };
      ctx.status = 200;
    },
  },
]);

module.exports = ctrl;
