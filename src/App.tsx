import React, { useEffect, useState } from 'react';
import './App.css';
import WinButton from './components/WinButton';
import WinWindow from './components/WinWindow';
import { RunningWinProcess, WinDrive, WinFolder, WinIcon, WinProcess, WinWindowStruct } from './interfaces';
import { SearchSVG, WindowsLogoSVG } from './svg';
import _ from 'lodash';
import WinIconBox from './components/WinIconBox';
import { getWindowJSX } from './utils';

function App() {
  const [files, setFiles]: [(WinIcon | WinDrive | WinProcess | WinFolder)[], any] = useState([]);
  const [currentProcesses, setCurrentProcesses]: [RunningWinProcess[], any] = useState([]);

  class ProcessManager {
    private static getProcessByPID = (pid: number): RunningWinProcess | -1 => {
      for (let i = 0; i < currentProcesses.length; i++) {
        if (currentProcesses[i].pid === pid) {
          return currentProcesses[i];
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
    public static startProcess = (proc: WinProcess) => {
      setCurrentProcesses([...currentProcesses, _.assign({ pid: this.getNewPID() }, proc)]);
    };
    public static killProgram = (pid: number) => {
      setCurrentProcesses(
        currentProcesses.filter(proc => {
          return proc.pid !== pid;
        })
      );
    };
  }

  class FolderManager {
    public static getChildren = ( id: number) => {
      return files.filter(file => {
        return file.parent === id;
      });
    };
  }

  useEffect(() => {
    // init values
    const t_files = [];
    t_files.push({
      id: 0,
      filename: 'System',
      icon: require('./resource/icons/imageres_36.ico'),
      parent: -1,
      driveLetter: 'C',
      totalSizeB: 10,
      usingSizeB: 10,
    } as WinDrive);

    t_files.push({
      id: 1,
      filename: 'explorer.exe',
      icon: require('./resource/icons/imageres_3.ico'),
      parent: 0,
      window: {
        x: 100,
        y: 100,
        w: '500px',
        h: '500px',
        children: (
          <>
            <div style={{backgroundColor: '#fff', position: 'absolute',width: '100%', height: 'calc( 100% - 30px )'}}>
              {FolderManager.getChildren( -1).map(child => {
                return <WinIconBox name={child.filename} color='black' noShadow icon={child.icon} />;
              })}
            </div>
          </>
        ),
        title: '资源管理器',
        icon: require('./resource/icons/imageres_3.ico'),
      } as WinWindowStruct,
    } as WinProcess);
    setFiles(t_files);
  }, []);

  return (
    <div className="App">
      <div>
        <div
          className="desktop"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        >
          <div
            className="backgroundimage"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              zIndex: 0,
            }}
          >
            <div
              className="icons"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                zIndex: 1,

                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              <WinIconBox name="回收站" icon={require('./resource/icons/imageres_55.ico')} />
              <WinIconBox
                name="此电脑"
                icon={require('./resource/icons/imageres_109.ico')}
                onDoubleClick={() => {
                  ProcessManager.startProcess(files[1] as WinProcess);
                  console.log(currentProcesses);
                }}
              />
              <WinIconBox name="helloworld.exe" icon={require('./resource/icons/imageres_15.ico')} />
            </div>

            <WinWindow x={100} y={100} w={'300px'} h={'200px'} hwnd={0} title={'helloworld.exe'} zIndex={2} icon={require('./resource/icons/imageres_15.ico')}>
              <>
                <div style={{ height: '90%', width: '90%', padding: '5px', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui', justifyContent: 'space-between' }}>
                  <span>Hello, world</span>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'right' }}>
                    <WinButton w="80px">Ok</WinButton>
                    <WinButton w="80px">Cancel</WinButton>
                  </div>
                </div>
              </>
            </WinWindow>
            {currentProcesses.map((process: RunningWinProcess) => {
              return getWindowJSX(process.window, 2, 2);
            })}

            <div
              className="taskbar"
              style={{
                position: 'fixed',
                height: '40px',
                left: 0,
                bottom: 0,
                right: 0,
                zIndex: 3,
                backgroundColor: 'rgb(0 0 0 / 80%)',
                display: 'flex',
                cursor: 'default',
                alignItems: 'center',
                gap: '1px',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ height: '100%', display: 'flex', gap: '1px', alignItems: 'center' }}>
                <div className="taskbaritem" style={{ width: '2.5em' }}>
                  <WindowsLogoSVG />
                </div>
                <div className="taskbaritem" style={{ padding: '0 10px', width: 'fit-content', color: '#2c2c2c', cursor: 'text', backgroundColor: 'rgb(240 240 240)' }}>
                  <SearchSVG />
                  <span style={{ paddingLeft: '10px', paddingRight: '50px' }}>在这里输入你要搜索的内容</span>
                </div>

                <div className="taskbaritem long">
                  <img src={require('./resource/icons/imageres_109.ico')} />
                </div>
                <div className="taskbaritem long open focus" style={{ maxWidth: '150px', width: '150px' }}>
                  <div className="taskbaritemContents">
                    <img src={require('./resource/icons/imageres_15.ico')} />
                    <span>helloworld.exe</span>
                  </div>
                  <div className="taskbaritemBorders"></div>
                </div>
                <div className="taskbaritem long open" style={{ maxWidth: '150px', width: '150px' }}>
                  <div className="taskbaritemContents">
                    <img src={require('./resource/icons/imageres_3.ico')} />
                    <span>test</span>
                  </div>
                  <div className="taskbaritemBorders"></div>
                </div>
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
