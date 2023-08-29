const Router = require("koa-router");
const authRouter = require("./auth");
const useRouter = require("./user");

const allRouter = new Router();
allRouter.use("/auth", authRouter.routes());
allRouter.use("/user", useRouter.routes());

allRouter.get("/check", async (ctx) => {
  ctx.body = "backend working fine";
});
module.exports = allRouter;
