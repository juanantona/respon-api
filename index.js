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

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);

require('./mongo')(app);
