export interface WinWindowStruct {
  x: number;
  y: number;
  w: string;
  h: string;
  children?: JSX.Element | never[];
  title: string;
  icon: string;
}

export enum FileType {
  Default,
  Folder,
  Program,
  Driver,
}

export interface WinFile {
  id: number;
  filename: string;
  icon: string;
  parent: number;
  type: FileType;
  window?: WinWindowStruct | null;
}

export enum WindowStatus {
  Default,
  Maximum,
  Minimum,
}

export interface RunningWinProcess extends WinFile {
  pid: number;
  zIndex: number;
  status: WindowStatus;
  lastStatus?: WindowStatus;
}
