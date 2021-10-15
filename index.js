const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const logger = require('koa-logger');
const DB = require('./db');

const app = new Koa();
const router = new Router();

// API prefix
router.prefix(`/${process.env.API_VERSION}`);

// API middlewares
app.use(cors());
app.use(koaBody());
app.use(logger());

// API routes
router.get('/', async ctx => {
  ctx.body = { message: 'Respon API' };
});

const errorHandler = require('./app/middlewares/errorHandler');
app.use(errorHandler);

const brother = require('./app/controllers/brother');
router.get('/brothers', brother.getBrothers);
router.get('/brothers/:id', brother.getOneBrother);
router.post('/brothers', brother.createBrother);
router.delete('/brothers/:id', brother.deleteOneBrother);
router.put('/brothers/:id', brother.updateOneBrother);

app.use(router.routes(), router.allowedMethods());

(async () => {
  await DB();
  app.listen(process.env.PORT || 3000);
})();
