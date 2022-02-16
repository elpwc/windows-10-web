export interface WinWindowStruct {
  x: number;
  y: number;
  w: string;
  h: string;
  children?: JSX.Element | never[];
  title: string;
  icon: string;
}

export interface WinIcon {
  id: number;
  filename: string;
  icon: string;
  parent: number;
}

export interface WinDrive extends WinIcon {
  totalSizeB: number;
  usingSizeB: number;
  driveLetter: string;
}

export interface WinFolder extends WinIcon {}

export interface WinProcess extends WinIcon {
  window: WinWindowStruct | null;
}

export interface RunningWinProcess extends WinProcess {
  pid: number;
}
