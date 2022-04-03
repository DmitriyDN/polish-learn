import { Application } from "express";
import wordsApi from "./words.api";

const routes = (app: Application) => {
  wordsApi("/api/words", app);
};

export default routes;
