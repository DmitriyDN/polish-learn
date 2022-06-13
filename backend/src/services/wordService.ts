import { IWord } from "../../interfaces/IWord";
import config from "../config";
import fileService from "./fileService";

class WordService {
  getAllWordFilesList = () => {
    const files = fileService.getFilesInfolder("assets/words");
    return files;
  };

  getWordsFilesContent = async (path?: string) => {
    const prefix = "assets/words";
    const files = path ? [path] : fileService.getFilesInfolder(prefix);
    const content = (await fileService.readAllFilesAsync([
      ...files.map((fp) => `${config.rootFolder}/${prefix}/${fp}`),
    ])) as Array<IWord[]>;
    const allWords: IWord[] = [];
    const allWordsMap: Map<string, boolean> = new Map();
    content.forEach((wordsList) => {
      for (const wordKey of Object.keys(wordsList)) {
        if (!allWordsMap.get(wordKey)) {
          allWords.push(wordsList[wordKey as any]);
          allWordsMap.set(wordKey, true);
        }
      }
    });
    return allWords;
  };
}

export default new WordService();
