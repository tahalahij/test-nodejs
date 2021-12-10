import express from "express";
import config from "./config";
import cors from "cors";
import bodyParser from "body-parser";
import { errorHandler } from './middlewares';
import routes from "./routes";
import Logger from "./utils/logger";

const { port, corsOrigins } = config
const app = express();
app.use(cors({ origin: corsOrigins }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1', routes);
app.use(errorHandler);

app.listen(port, () =>
    Logger.info(Logger.labels.START_APP, `✅  Ready on port http://localhost:${port}`)
);
