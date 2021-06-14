const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const logger = require('koa-logger');
const Mongo = require('./mongo');

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(koaBody());
app.use(logger());

router.get('/', async ctx => {
  ctx.body = { message: 'Respon API' };
});

// List all brothers
const getBrothersController = async ctx => {
  const brothers = await Mongo.Brothers.getBrothers();
  ctx.body = brothers;
};
router.get('/brothers', getBrothersController);

// Create new brother
router.post('/brothers', async ctx => {
  await ctx.app.brothers.insert(ctx.request.body);
  ctx.body = await ctx.app.brothers.find().toArray();
});

const ObjectID = require('mongodb').ObjectID;
// Get one
router.get('/brothers/:id', async ctx => {
  ctx.body = await ctx.app.brothers.findOne({ _id: ObjectID(ctx.params.id) });
});

// Update one
router.put('/brothers/:id', async ctx => {
  let documentQuery = { _id: ObjectID(ctx.params.id) };
  let valuesToUpdate = { $set: ctx.request.body };
  await ctx.app.brothers.updateOne(documentQuery, valuesToUpdate);
  ctx.body = await ctx.app.brothers.find().toArray();
});

// Delete one
router.delete('/brothers/:id', async ctx => {
  let documentQuery = { _id: ObjectID(ctx.params.id) };
  await ctx.app.brothers.deleteOne(documentQuery);
  ctx.body = await ctx.app.brothers.find().toArray();
});

app.use(router.routes(), router.allowedMethods());

const serverUp = async () => {
  await Mongo.init();
  app.listen(process.env.PORT || 3000);
};

serverUp();
