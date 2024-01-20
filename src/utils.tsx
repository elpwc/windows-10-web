import WinWindow from './components/WinWindow';
import { WinFile, WinWindowStruct } from './interfaces';

export const getWindowJSX = (window: WinWindowStruct | null | undefined, id: number, pid: number, zIndex: number, setUpdate: () => void) => {
  if (window) {
    let hwnd = id + '_' + pid;
    return (
      <WinWindow key={hwnd} x={window.x} y={window.y} w={window.w} h={window.h} title={window.title} icon={window.icon} id={id} pid={pid} hwnd={hwnd} zIndex={zIndex} setUpdate={setUpdate}>
        {window.children}
      </WinWindow>
    );
  }
  return <></>;
};

const getIconJSX = (icon: WinFile) => {};
