const Router = require("koa-router");

const authRouter = new Router();
authRouter.get("/", async (ctx) => {
  ctx.body = "Hello from the auth!";
});

module.exports = authRouter;
