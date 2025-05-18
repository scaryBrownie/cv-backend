import express from "express";
import router from "./route/routes.mjs";
import { systemLogger } from "./util/winston-logger.mjs";
import { errorHandler } from "./middleware/error-handler.mjs";
import { appSecurity } from "./middleware/security.mjs";
import { apiKeyValidate } from "./middleware/api-key-validate.mjs";
import { ddosLimiter } from "./middleware/ddos-protection.mjs";
import dotenv from "dotenv";
import { connectDB } from "./database/connect-database.mjs";
import requestLogger from "./middleware/request-logger.mjs";
import { swagger, swaggerUi } from "./util/swagger.mjs";

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

app.set("trust proxy", 1);
appSecurity(app);
app.use(ddosLimiter);
app.use(requestLogger);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));

app.use(apiKeyValidate);
app.use(router);
connectDB();

app.get("/health", (req, res) => {
  systemLogger.info("health checked.");
  res.status(200).json({ success: true });
});

app.listen(process.env.PORT, () => {
  //   systemLogger.info(`app running on ${process.env.PORT}`);
  console.log(`app running on ${process.env.PORT}`);
});

app.use(errorHandler);
