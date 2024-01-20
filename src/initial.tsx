import { FileType, WinFile, WinWindowStruct } from './interfaces';
import Explorer from './programs/Explorer';
import Helloworld from './programs/helloworld';

export const initFolders = (setUpdate: () => void) => [
  {
    id: 1,
    filename: 'root',
    icon: require('./resource/icons/imageres_3.ico'),
    parent: -1,
    type: FileType.Folder,
  },
  {
    id: 0,
    filename: 'desktop',
    icon: require('./resource/icons/imageres_3.ico'),
    parent: -1,
    type: FileType.Folder,
  },
  {
    id: 2,
    filename: 'test1',
    icon: require('./resource/icons/imageres_3.ico'),
    parent: 5,
    type: FileType.Folder,
  },
  {
    id: 3,
    filename: 'test2',
    icon: require('./resource/icons/imageres_3.ico'),
    parent: 2,
    type: FileType.Folder,
  },
  {
    id: 4,
    filename: 'pppp',
    icon: require('./resource/icons/imageres_3.ico'),
    parent: 1,
    type: FileType.Folder,
  },
  {
    id: 6,
    filename: 'helloworld.exe',
    icon: require('./resource/icons/imageres_15.ico'),
    parent: 0,
    type: FileType.Program,
    window: {
      x: 100,
      y: 100,
      w: '300px',
      h: '200px',
      children: <Helloworld />,
      title: 'helloworld',
      icon: require('./resource/icons/imageres_15.ico'),
    } as WinWindowStruct,
  },
  {
    id: 7,
    filename: '回收站',
    icon: require('./resource/icons/imageres_55.ico'),
    parent: 0,
    type: FileType.Program,
    window: {
      x: 100,
      y: 100,
      w: '300px',
      h: '200px',
      children: <></>,
      title: '回收站',
      icon: require('./resource/icons/imageres_55.ico'),
    } as WinWindowStruct,
  }as WinFile,
  {
    id: 5,
    filename: '此电脑',
    icon: require('./resource/icons/imageres_3.ico'),
    parent: 0,
    type: FileType.Program,
    window: {
      x: 100,
      y: 100,
      w: '500px',
      h: '500px',
      children: <Explorer setUpdate={setUpdate} />,
      title: '资源管理器',
      icon: require('./resource/icons/imageres_109.ico'),
    } as WinWindowStruct,
  }as WinFile,
];
