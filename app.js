const Koa = require("koa");
require("dotenv").config();
const bodyParser = require("koa-bodyparser");

const Logger = require("./src/core/logger");
const allRouter = require("./src/httpApi/route/index");
const connectDatabase = require("./src/core/db");
const modifyResponse = require("./src/core/util/modify-response");

const app = new Koa();
connectDatabase();

app.use(Logger);
app.use(bodyParser());
app.use(modifyResponse);

app.use(allRouter.routes());

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});

app.on("error", (err) => {
  console.error("Server error:", err);
});
