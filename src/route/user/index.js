const Router = require("koa-router");
const User = require("../../httpApi/models/user");
const userSchemaValidator = require("../../core/validator/userSchema");
const { createUser } = require("../../controller/user");
const validateBody = require("../../core/middleware/validate-body");

const useRouter = new Router();
useRouter.get("/", async (ctx) => {
  const res = await User.find({});
  ctx.body = res.data;
});

useRouter.post("/", validateBody(userSchemaValidator), createUser);
module.exports = useRouter;
