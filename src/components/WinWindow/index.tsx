import { useEffect, useState } from 'react';
import { CloseSVG, MaximizeSVG, MinimizeSVG, RestoreMaximizeSVG } from '../../svg';
import './index.css';
import { ProcessManager } from '../../processManager';
import { WindowStatus } from '../../interfaces';

interface WindowProps {
  x: number;
  y: number;
  w: string;
  h: string;
  id: number;
  pid: number;
  hwnd: string;
  children?: JSX.Element | never[];
  title: string;
  zIndex: number;
  icon: string;
  titleBar?: JSX.Element | never[];
  setUpdate: () => void;
  onFocus: () => void;
}

interface Point {
  x: number;
  y: number;
}

export default (props: WindowProps) => {
  const [lastPosition, setLastPosition]: [Point, any] = useState({ x: 0, y: 0 });
  const [crtPosition, setCrtPosition]: [Point, any] = useState({ x: 0, y: 0 });

  const [crtWinPosition, setCrtWinPosition]: [Point, any] = useState({ x: 0, y: 0 });

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isDrag, setIsDrag] = useState(false);

  useEffect(() => {
    setCrtWinPosition({
      x: props.x,
      y: props.y,
    });
  }, [props.x, props.y]);

  let crtProcessStatus = WindowStatus.Default;
  const crtProcess = ProcessManager.getProcessByPID(props.pid);
  if (crtProcess !== -1) {
    crtProcessStatus = crtProcess.status;
  }
  return (
    <>
      <div
        id={'window' + String(props.pid)}
        style={{
          position: 'fixed',
          top: crtWinPosition.y,
          left: crtWinPosition.x,
          width: props.w,
          height: props.h,
          border: 'solid 1px rgb(69, 87, 87)',
          boxShadow: '0px 0px 4px 0 rgb(100 100 100)',
          zIndex: props.zIndex,
        }}
        onMouseDown={() => {
          props.onFocus();
        }}
      >
        <div
          className="dragArea"
          style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: isMouseDown ? 'inherit' : 'none',
          }}
          onMouseUp={() => {
            setIsMouseDown(false);
          }}
          onMouseMove={e => {
            if (isMouseDown) {
              setCrtPosition({ x: e.clientX - lastPosition.x, y: e.clientY - lastPosition.y });
              setCrtWinPosition({ x: crtWinPosition.x + crtPosition.x, y: crtWinPosition.y + crtPosition.y });
              setLastPosition({ x: e.clientX, y: e.clientY });
            }
          }}
        ></div>
        <div className="titlebar" style={{ backgroundColor: props.zIndex === 0 ? 'rgb(69, 87, 87)' : '#7b9393' }}>
          <div
            className="titlebarTitle"
            onMouseDown={e => {
              setLastPosition({ x: e.clientX, y: e.clientY });
              setIsMouseDown(true);
            }}
            onMouseUp={() => {
              setIsMouseDown(false);
            }}
          >
            <img src={props.icon} height="15px" style={{ margin: '0 5px' }} />
            <span style={{ width: 'inherit' }}>{props.title}</span>
          </div>
          <div className="controlBtns" style={{ color: 'white' }}>
            <button
              className="minbtn"
              onClick={() => {
                ProcessManager.setWindowStatus(props.pid, WindowStatus.Minimum);

                props.setUpdate();
              }}
            >
              <MinimizeSVG />
            </button>
            <button
              className="maxbtn"
              onClick={() => {
                if (crtProcessStatus === WindowStatus.Default) {
                  ProcessManager.setWindowStatus(props.pid, WindowStatus.Maximum);
                } else if (crtProcessStatus === WindowStatus.Maximum) {
                  ProcessManager.setWindowStatus(props.pid, WindowStatus.Default);
                }

                props.setUpdate();
              }}
            >
              {crtProcessStatus === WindowStatus.Maximum ? <RestoreMaximizeSVG /> : <MaximizeSVG />}
            </button>
            <button
              className="closebtn"
              onClick={() => {
                ProcessManager.killProcess(props.pid);

                props.setUpdate();
              }}
            >
              <CloseSVG />
            </button>
          </div>
        </div>
        <div className="content">{props.children}</div>
      </div>
    </>
  );
};
