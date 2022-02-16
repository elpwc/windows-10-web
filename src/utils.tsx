import WinWindow from './components/WinWindow';
import { WinIcon, WinWindowStruct } from './interfaces';

export const getWindowJSX = (window: WinWindowStruct | null, hwnd: number, zIndex: number) => {
  if (window) {
    return (
      <WinWindow key={hwnd} x={window.x} y={window.y} w={window.w} h={window.h} title={window.title} icon={window.icon} hwnd={hwnd} zIndex={zIndex}>
        {window.children}
      </WinWindow>
    );
  }
  return <></>;
};

const getIconJSX = (icon: WinIcon) => {};
