import { Global } from './global';
import { WinFile } from './interfaces';

export class FolderManager {
  public static getChildren = (id: number) => {
    console.log(Global.files);
    return Global.files.filter(file => {
      return file.parent === id;
    });
  };

  public static getFileById = (id: number): WinFile | null => {
    const res = Global.files.filter(file => {
      return file.id === id;
    });
    if (res.length > 0) {
      return res[0];
    }
    return null;
  };

  public static getParentFolder = (id: number): WinFile | null => {
    const res = Global.files.filter(file => {
      return file.id === id;
    });
    if (res.length > 0) {
      if (res[0].parent !== -1) {
        return this.getFileById(res[0].parent);
      } else {
        return res[0];
      }
    }
    return null;
  };

  public static getParentFolderId = (id: number): number | null => {
    if (id === -1) {
      return -1;
    }
    const res = Global.files.filter(file => {
      return file.id === id;
    });
    if (res.length > 0) {
      return res[0].parent;
    }
    return null;
  };

  public static addFile = (file: WinFile) => {};

  public static getRoute = (id: number, withLastIdName: boolean, useJapaneseMode: boolean = false) => {
    let res = '',
      split = useJapaneseMode ? '￥' : '/';
    let currentFile = this.getFileById(id);
    if (currentFile === null) {
      return '';
    }
    if (withLastIdName) {
      res = currentFile.filename + split + res;
    }
    while (currentFile!.parent !== -1) {
      currentFile = this.getFileById(currentFile!.parent);
      res = currentFile!.filename + split + res;
    }
    return res;
  };
}
