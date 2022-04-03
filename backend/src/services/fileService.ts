import config from "../config/index";
import fs from "fs";

class FileService {
  getFilesInfolder = (path: string): string[] => {
    const files = fs.readdirSync(`${config.rootFolder}/${path}`);
    return files;
  };

  readFileAsync = (path: string) => {
    return new Promise(async (resolve, reject) => {
      fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(JSON.parse(data));
      });
    });
  };

  readAllFilesAsync = async (paths: string[]) => {
    const files = (await Promise.all([
      ...paths.map((p) => this.readFileAsync(p)),
    ])) as object[];

    return files;
  };
}

export default new FileService();
