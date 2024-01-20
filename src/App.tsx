import React, { useEffect, useState } from 'react';
import './App.css';
import WinButton from './components/WinButton';
import WinWindow from './components/WinWindow';
import { FileType, RunningWinProcess, WinFile, WinWindowStruct } from './interfaces';
import { SearchSVG, WindowsLogoSVG } from './svg';
import _ from 'lodash';
import WinIconBox from './components/WinIconBox';
import { getWindowJSX } from './utils';
import { Global } from './global';
import { FolderManager } from './folderManager';
import { ProcessManager } from './processManager';
import Explorer from './programs/Explorer';
import TaskbarItem from './components/TaskbarItem';
import Helloworld from './programs/helloworld';
import { initFolders } from './initial';

function App() {
  const [update, setUpdate]: [boolean, any] = useState(true);
  const [focus, setFocus]: [number, any] = useState(-1);

  useEffect(() => {
    // init values
    Global.files = initFolders(setUpdate(!update));

    setUpdate(!update);
  }, []);

  return (
    <div className="App">
      <div>
        <div className="desktop">
          <div className="backgroundimage">
            <div className="icons">
              {Global.currentProcesses.map((process: RunningWinProcess) => {
                return getWindowJSX(process.window, process.id, process.pid, -1, () => {
                  setUpdate(!update);
                });
              })}

              {FolderManager.getChildren(0).map((child: WinFile) => {
                console.log(FolderManager.getChildren(0));
                return (
                  <WinIconBox
                    key={child.id}
                    name={child.filename}
                    color="black"
                    noShadow
                    icon={child.icon}
                    onDoubleClick={() => {
                      if (child.type === FileType.Driver || child.type === FileType.Folder) {
                        console.log(child);
                        ProcessManager.startProcess(
                          Global.files.filter(file => {
                            return file.filename === 'explorer.exe';
                          })[0] as WinFile
                        );
                        setUpdate(!update);
                      } else if (child.type === FileType.Program) {
                        ProcessManager.startProcessById(child.id);

                        setUpdate(!update);
                      }
                    }}
                  />
                );
              })}
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

                {Global.currentProcesses.map(currentProcess => {
                  return <TaskbarItem process={currentProcess} focus={false} key={currentProcess.pid} />;
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
                      11:45
                      <br />
                      2022/02/15
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
