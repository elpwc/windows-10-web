import { Global } from './global';
import { WinFile } from './interfaces';

export class FolderManager {
  public static getChildren = (id: number) => {
    console.log(Global.files);
    return Global.files.filter(file => {
      return file.parent === id;
    });
  };

  public static addFile = (file: WinFile) => {};
}
