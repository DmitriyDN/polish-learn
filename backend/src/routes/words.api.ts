import { Application } from "express";
import wordService from "../services/wordService";

const wordsApi = (prefix: string, app: Application) => {
  app.use(`${prefix}/files`, (_, response) => {
    const files = wordService.getAllWordFilesList();
    response.send(files);
  });

  app.use(`${prefix}/words-from-file/:file`, async (_, response) => {
    const words = await wordService.getWordsFilesContent(_.params.file);
    response.send(words);
  });

  app.use(`${prefix}/all-words`, async (_, response) => {
    const content = await wordService.getWordsFilesContent();
    response.send(content);
  });
};

export default wordsApi;
