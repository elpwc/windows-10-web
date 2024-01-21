import { FolderManager } from './folderManager';
import { Global } from './global';
import { RunningWinProcess, WinFile, WindowStatus } from './interfaces';
import _ from 'lodash';

export class ProcessManager {
  public static getProcessByPID = (pid: number): RunningWinProcess | -1 => {
    for (let i = 0; i < Global.currentProcesses.length; i++) {
      if (Global.currentProcesses[i].pid === pid) {
        return Global.currentProcesses[i];
      }
    }
    return -1;
  };
  private static getProcessIndexByPID = (pid: number): number | -1 => {
    for (let i = 0; i < Global.currentProcesses.length; i++) {
      if (Global.currentProcesses[i].pid === pid) {
        return i;
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
    for (let i = 0; i < Global.currentProcesses.length; i++) {
      Global.currentProcesses[i].zIndex--;
    }
    Global.currentProcesses = [...Global.currentProcesses, _.assign({ pid: this.getNewPID(), zIndex: 0, status: WindowStatus.Default }, proc)];
  };

  public static startProcessById = (id: number) => {
    for (let i = 0; i < Global.currentProcesses.length; i++) {
      Global.currentProcesses[i].zIndex--;
    }
    const proc = FolderManager.getFileById(id);
    if (proc) {
      Global.currentProcesses = [...Global.currentProcesses, _.assign({ pid: this.getNewPID(), zIndex: 0, status: WindowStatus.Default }, proc)];
    }
  };

  public static killProcess = (pid: number) => {
    Global.currentProcesses = Global.currentProcesses.filter(proc => {
      return proc.pid !== pid;
    });
  };

  public static setWindowStatus = (pid: number, status: WindowStatus) => {
    Global.currentProcesses[this.getProcessIndexByPID(pid)].lastStatus = Global.currentProcesses[this.getProcessIndexByPID(pid)].status;
    Global.currentProcesses[this.getProcessIndexByPID(pid)].status = status;
  };
}
