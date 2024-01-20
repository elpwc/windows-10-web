import { Global } from './global';
import { RunningWinProcess, WinFile } from './interfaces';
import _ from 'lodash';

export class ProcessManager {
  private static getProcessByPID = (pid: number): RunningWinProcess | -1 => {
    for (let i = 0; i < Global.currentProcesses.length; i++) {
      if (Global.currentProcesses[i].pid === pid) {
        return Global.currentProcesses[i];
      }
    }
    return -1;
  };
  private static getNewPID = () => {
    for (let i = 0; i < Infinity; i++) {
      if (this.getProcessByPID(i) === -1) {
        return i;
      }
    }
    return -1;
  };
  public static startProcess = (proc: WinFile) => {
    Global.currentProcesses = [...Global.currentProcesses, _.assign({ pid: this.getNewPID() }, proc)];
  };
  public static killProcess = (pid: number) => {
    Global.currentProcesses = Global.currentProcesses.filter(proc => {
      return proc.pid !== pid;
    });
  };
}
