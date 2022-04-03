import { Application } from "express";
import wordService from "../services/wordService";

const wordsApi = (prefix: string, app: Application) => {
  app.use(`${prefix}/files`, (_, response) => {
    const files = wordService.getAllWordFilesList();
    response.send({ files });
  });

  app.use(`${prefix}/all-words`, async (_, response) => {
    const content = await wordService.getAllWordFilesContent();
    response.send(content);
  });
};

export default wordsApi;
