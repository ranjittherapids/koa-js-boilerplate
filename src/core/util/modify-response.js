const modifyResponse = async (ctx, next) => {
  const modifiedData = {
    status: null,
    statusCode: 500,
    url: `http://localhost:8080${ctx.request.url}`,
    method: ctx.request.method,
    timestamp: new Date(),
    result: null,
  };

  try {
    await next();
    if (ctx.response.body) {
      modifiedData.status = true;
      modifiedData.result = ctx.response.body;
      modifiedData.statusCode = ctx.response.status;
    }
  } catch (error) {
    modifiedData.status = false;
    modifiedData.statusCode = handleError(error).statusCode;
    modifiedData.result = handleError(error).errorMessage;
  }
  ctx.response.status = modifiedData?.statusCode;
  ctx.response.body = modifiedData;
};

const handleError = (error) => {
  let errResponse = { errorMessage: error, statusCode: 500 };

  if (error?.code === 11000) {
    const field = Object.keys(error.keyPattern)[0];
    errResponse.errorMessage = `${
      field.charAt(0).toUpperCase() + field.slice(1)
    } already exists.`;
    errResponse.statusCode = 409;
  }
  if (error?._message?.includes("validation failed")) {
    console.log(error?._message, Object.keys(error.errors), "++");

    let validatrionError = Object.keys(error.errors).map((err) =>
      error.errors[err].message.replace("Path", "").trim()
    );
    errResponse.errorMessage = validatrionError || null;
    errResponse.statusCode = 422;
  }

  //   let err = { errorMessage: error, statusCode: 500 };
  return errResponse;
};

module.exports = modifyResponse;
