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
