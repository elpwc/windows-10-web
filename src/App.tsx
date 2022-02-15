import React from 'react';
import './App.css';
import { SearchSVG, WindowsLogoSVG } from './svg';

function App() {
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
            </div>
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
              }}
            >
              <div className="taskbaritem" style={{ width: '2.5em' }}>
                <WindowsLogoSVG />
              </div>
              <div className="taskbaritem" style={{ padding: '0 10px', width: 'fit-content', color: '#2c2c2c', cursor: 'text', backgroundColor: 'rgb(240 240 240)' }}>
                <SearchSVG />
                <span style={{ paddingLeft: '10px', paddingRight: '50px' }}>在这里输入你要搜索的内容</span>
              </div>

              <div className="taskbaritem long open">
                <div className="taskbaritemContents">
                  <img src="https://cn.bing.com/sa/simg/favicon-2x.ico" />
                  <span>11451419198101145141919810</span>
                </div>
                <div className="taskbaritemBorders"></div>
              </div>
              <div className="taskbaritem long">
                <img src="https://cn.bing.com/sa/simg/favicon-2x.ico" />
                <span>11451419198101145141919810</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
