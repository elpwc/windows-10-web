import { RunningWinProcess, WinFile } from "./interfaces";

export class Global{
  public static currentProcesses:RunningWinProcess[] = [];

  
  public static files: (WinFile)[] = [];
}