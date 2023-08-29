const User = require("../../models/user");

const createUser = async (ctx) => {
  console.log(ctx.request.body, "ctx.request.body");
  const newUser = new User({
    username: ctx.request.body.username,
    email: ctx.request.body.email,
  });

  const res = await newUser.save();
   ctx.body = res;
};

module.exports = { createUser };
