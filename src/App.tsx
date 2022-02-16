import React, { useEffect, useState } from 'react';
import './App.css';
import WinButton from './components/WinButton';
import WinWindow from './components/WinWindow';
import { SearchSVG, WindowsLogoSVG } from './svg';

function App() {
  const [crtTime, setCrtTime]: [number, any] = useState(Date.now());

  useEffect(() => {
    setInterval(() => {
      setCrtTime(Date.now());
    }, 1000);
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
              <div className="fileIcon">
                <img src={require('./resource/icons/imageres_55.ico')} />
                <p>回收站</p>
              </div>
              <div className="fileIcon">
                <img src={require('./resource/icons/imageres_109.ico')} />
                <p>此电脑</p>
              </div>
              <div className="fileIcon">
                <img src={require('./resource/icons/imageres_15.ico')} />
                <p>helloworld.exe</p>
              </div>
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
                      {`${new Date(crtTime).getHours()}:${new Date(crtTime).getMinutes()}`}
                      <br />
                      {`${new Date(crtTime).getFullYear()}/${String(new Date(crtTime).getMonth() + 1).padStart(2, '0')}/${String(new Date(crtTime).getDate()).padStart(2, '0')}`}
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
