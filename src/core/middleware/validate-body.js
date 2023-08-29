const validateBody = (schema) => {
  return async (ctx, next) => {
    const { error, value } = schema.validate(ctx.request.body);
    if (value) {
      ctx.request.body = value;
      await next();
    }
  };
};
module.exports = validateBody;
