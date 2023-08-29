const Router = require("koa-router");

const validateBody = require("../../../../src/core/middleware/validate-body");
const userSchemaValidator = require("../../../../src/core/validator/userSchema");
const { createUser } = require("../../controller/user");
const User = require("../../models/user");

const useRouter = new Router();
useRouter.get("/", async (ctx) => {
  const res = await User.find({});
  ctx.body = res.data;
});

useRouter.post("/", validateBody(userSchemaValidator), createUser);
module.exports = useRouter;
