import express, { Application, Request, Response, NextFunction } from "express";
import routes from "./routes";
import config from "./config";
import cors from "cors";

const app: Application = express();

app.use(cors());

routes(app);

// Start server
app.listen(config.appPort, () =>
  console.log(`Server is listening on port ${config.appPort}!`)
);
