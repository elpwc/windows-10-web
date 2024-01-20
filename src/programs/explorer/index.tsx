import { useState } from 'react';
import WinIconBox from '../../components/WinIconBox';
import { FolderManager } from '../../folderManager';
import { Global } from '../../global';
import { ProcessManager } from '../../processManager';
import { FileType, WinFile } from '../../interfaces';

interface p {}
export default (props: p) => {
  const [currentFolder, setCurrentFoler]: [number, any] = useState(-1);
  return (
    <div style={{ backgroundColor: '#fff', position: 'absolute', width: '100%', height: 'calc( 100% - 30px )' }}>
      {FolderManager.getChildren(currentFolder).map(child => {
        console.log(Global.files);
        return (
          <WinIconBox
            name={child.filename}
            color="black"
            noShadow
            icon={child.icon}
            onDoubleClick={() => {
              if (child.type === FileType.Driver || child.type === FileType.Folder) {
                setCurrentFoler(child.id);
              } else if (child.type === FileType.Program) {
                ProcessManager.startProcess(Global.files[1] as WinFile);
              }
              console.log(Global.currentProcesses);
            }}
          />
        );
      })}
    </div>
  );
};
