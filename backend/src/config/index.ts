import dotenv from "dotenv";
import path from "path";

dotenv.config();

export default {
  appPort: process.env.APP_PORT || 3000,
  rootFolder: path.resolve(`${__dirname}/../`),
};
