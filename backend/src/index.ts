import express, { Application } from "express";
import routes from "./routes";
import config from "./config";
import cors from "cors";
import compression from "compression";

const app: Application = express();

app.use(cors());

app.use(compression());

routes(app);

// Start server
app.listen(config.appPort, () =>
  console.log(`Server is listening on port ${config.appPort}!`)
);
