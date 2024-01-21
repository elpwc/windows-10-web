import React, { useEffect, useState } from 'react';
import './App.css';
import { FileType, RunningWinProcess, WinFile, WindowStatus } from './interfaces';
import { SearchSVG, WindowsLogoSVG } from './svg';
import WinIconBox from './components/WinIconBox';
import { getWindowJSX } from './utils';
import { Global } from './global';
import { FolderManager } from './folderManager';
import { ProcessManager } from './processManager';
import TaskbarItem from './components/TaskbarItem';
import { initFolders } from './initial';

function App() {
  const [update, setUpdate]: [number, any] = useState(Math.random());
  const [time, setTime]: [number, any] = useState(Date.now());

  const useUpdate = () => {
    console.log(update);
    setUpdate(Math.random());
    console.log(update);
  };

  useEffect(() => {
    // init values
    Global.files = initFolders(() => {
      setTimeout(() => {
        useUpdate();
        console.log(123);
      }, 200);
    });

    setInterval(() => {
      setTime(Date.now());
    }, 1000);

    useUpdate();
  }, []);

  return (
    <div className="App">
      <div>
        <div className="desktop">
          <div className="backgroundimage">
            <div className="icons">
              {/* Windows */}
              {Global.currentProcesses.map((process: RunningWinProcess, j: number) => {
                return getWindowJSX(
                  process.window,
                  process.id,
                  process.pid,
                  process.zIndex,
                  process.status,
                  () => {
                    for (let i = 0; i < Global.currentProcesses.length; i++) {
                      Global.currentProcesses[i].zIndex--;
                    }
                    Global.currentProcesses[j].zIndex = 0;

                    useUpdate();
                  },
                  () => {
                    useUpdate();
                  }
                );
              })}

              {/* Desktop Icons */}
              <div style={{ zIndex: -1145141919810 }}>
                {FolderManager.getChildren(0).map((child: WinFile) => {
                  console.log(FolderManager.getChildren(0));
                  return (
                    <WinIconBox
                      key={child.id}
                      name={child.filename}
                      color="white"
                      noShadow={false}
                      shadowColor="black"
                      icon={child.icon}
                      onDoubleClick={() => {
                        if (child.type === FileType.Driver || child.type === FileType.Folder) {
                          console.log(child);
                          ProcessManager.startProcess(
                            Global.files.filter(file => {
                              return file.filename === 'explorer.exe';
                            })[0] as WinFile
                          );
                          useUpdate();
                        } else if (child.type === FileType.Program) {
                          ProcessManager.startProcessById(child.id);

                          useUpdate();
                        }
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="taskbar">
              <div style={{ height: '100%', display: 'flex', gap: '1px', alignItems: 'center' }}>
                <div className="taskbaritem" style={{ width: '2.5em' }}>
                  <WindowsLogoSVG />
                </div>
                <div className="taskbaritem" style={{ padding: '0 10px', width: 'fit-content', color: '#2c2c2c', cursor: 'text', backgroundColor: 'rgb(240 240 240)' }}>
                  <SearchSVG />
                  <span style={{ paddingLeft: '10px', paddingRight: '50px' }}>在这里输入你要搜索的内容</span>
                </div>

                {/* Taskbar Icons */}
                {Global.currentProcesses.map(currentProcess => {
                  return (
                    <TaskbarItem
                      process={currentProcess}
                      focus={currentProcess.zIndex === 0}
                      key={currentProcess.pid}
                      onClick={() => {
                        const crtProcess = ProcessManager.getProcessByPID(currentProcess.pid);
                        if (crtProcess !== -1) {
                          const crtProcessStatus = crtProcess.status;
                          if (crtProcessStatus === WindowStatus.Default || crtProcessStatus === WindowStatus.Maximum) {
                            ProcessManager.setWindowStatus(currentProcess.pid, WindowStatus.Minimum);
                          } else if (crtProcessStatus === WindowStatus.Minimum) {
                            ProcessManager.setWindowStatus(currentProcess.pid, currentProcess.lastStatus ?? WindowStatus.Default);
                          }
                        }

                        useUpdate();
                      }}
                    />
                  );
                })}
              </div>

              <div style={{ height: '100%', display: 'flex', gap: '1px', alignItems: 'center' }}>
                <div className="taskbaritem" style={{}}>
                  <div className="taskbaritemContents">
                    <img src={require('./resource/icons/imageres_6200.ico')} style={{ maxWidth: '15px', width: '15px' }} />
                  </div>
                </div>
                <div className="taskbaritem" style={{ textAlign: 'center' }}>
                  <div className="taskbaritemContents">
                    <span>
                      {new Date(time).getHours().toString().padStart(2, '0') +
                        ':' +
                        new Date(time).getMinutes().toString().padStart(2, '0') +
                        ':' +
                        new Date(time).getSeconds().toString().padStart(2, '0')}
                      <br />
                      {new Date(time).getFullYear() + '/' + (new Date(time).getMonth() + 1).toString().padStart(2, '0') + '/' + new Date(time).getDate().toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
