import WinWindow from './components/WinWindow';
import { WinFile, WinWindowStruct, WindowStatus } from './interfaces';

export const getWindowJSX = (window: WinWindowStruct | null | undefined, id: number, pid: number, zIndex: number, status: WindowStatus, onFocus: () => void, setUpdate: () => void) => {
  if (window) {
    let hwnd = id + '_' + pid;
    let x = window.x,
      y = window.y,
      w = window.w,
      h = window.h;
    if (status === WindowStatus.Maximum) {
      x = 0;
      y = 0;
      w = '100%';
      h = '100%';
    }
    if (status !== WindowStatus.Minimum) {
      return (
        <WinWindow key={hwnd} x={x} y={y} w={w} h={h} title={window.title} icon={window.icon} id={id} pid={pid} hwnd={hwnd} zIndex={zIndex} setUpdate={setUpdate} onFocus={onFocus}>
          {window.children}
        </WinWindow>
      );
    } else {
      return <></>;
    }
  }
  return <></>;
};
