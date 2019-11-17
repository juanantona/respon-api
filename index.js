const Koa = require('koa');
const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

// Use the bodyparser middlware
app.use(BodyParser());

const logger = require('koa-logger');
app.use(logger());

router.get('/', async function(ctx) {
  ctx.body = { message: 'Hello World!' };
});

// List all brothers
router.get('/brothers', async ctx => {
  ctx.body = await ctx.app.brothers.find().toArray();
});

// Create new brother
router.post('/brothers', async ctx => {
  ctx.body = await ctx.app.brothers.insert(ctx.request.body);
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
  ctx.body = await ctx.app.brothers.updateOne(documentQuery, valuesToUpdate);
});

// Delete one
router.delete('/brothers/:id', async ctx => {
  let documentQuery = { _id: ObjectID(ctx.params.id) };
  ctx.body = await ctx.app.brothers.deleteOne(documentQuery);
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);

require('./mongo')(app);
