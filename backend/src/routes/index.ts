import { Application } from "express";
import wordsApi from "./words.api";

const routes = (app: Application) => {
  wordsApi("/words", app);
};

export default routes;
