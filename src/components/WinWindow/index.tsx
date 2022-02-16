import { useEffect, useState } from 'react';
import { CloseSVG, MaximizeSVG, MinimizeSVG } from '../../svg';
import './index.css';

interface WindowProps {
  x: number;
  y: number;
  w: string;
  h: string;
  hwnd: number;
  children?: JSX.Element | never[];
  title: string;
  zIndex: number;
  icon: string;
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
  }, []);

  return (
    <>
      <div
        id={'window' + String(props.hwnd)}
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
        <div
          className="titlebar"
          onMouseDown={e => {
            setLastPosition({ x: e.clientX, y: e.clientY });
            setIsMouseDown(true);
          }}
          onMouseUp={() => {
            setIsMouseDown(false);
          }}
        >
          <div className="titlebarTitle">
            <img src={props.icon} height="15px" style={{ margin: '0 5px' }} />
            <span>{props.title}</span>
          </div>
          <div className="controlBtns" style={{ color: 'white' }}>
            <button className="minbtn">
              <MinimizeSVG />
            </button>
            <button className="maxbtn">
              <MaximizeSVG />
            </button>
            <button className="closebtn">
              <CloseSVG />
            </button>
          </div>
        </div>
        <div className="content">{props.children}</div>
      </div>
    </>
  );
};
