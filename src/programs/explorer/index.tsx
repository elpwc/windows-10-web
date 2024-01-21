import { useState } from 'react';
import WinIconBox from '../../components/WinIconBox';
import { FolderManager } from '../../folderManager';
import { Global } from '../../global';
import { ProcessManager } from '../../processManager';
import { FileType, WinFile } from '../../interfaces';

interface p {
  setUpdate: () => void;
}
export default (props: p) => {
  const [currentFolder, setCurrentFoler]: [number, any] = useState(-1);

  let route = '';

  return (
    <div style={{ backgroundColor: '#fff', position: 'absolute', width: '100%', height: 'calc( 100% - 30px )' }}>
      <div style={{ display: 'flex', padding: '10px', gap: '5px' }}>
        <div>
          <button
            onClick={() => {
              setCurrentFoler(FolderManager.getParentFolderId(currentFolder));
            }}
          >
            {'<'}
          </button>
        </div>
        <div style={{ width: '100%' }}>
          <input style={{ width: '100%' }} value={FolderManager.getRoute(currentFolder, true)} />
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {FolderManager.getChildren(currentFolder).map(child => {
          console.log(Global.files);
          return (
            <WinIconBox
              key={child.id}
              name={child.filename}
              color="black"
              noShadow
              icon={child.icon}
              onDoubleClick={() => {
                if (child.type === FileType.Driver || child.type === FileType.Folder) {
                  console.log(child);
                  setCurrentFoler(child.id);
                } else if (child.type === FileType.Program) {
                  ProcessManager.startProcessById(child.id);

                  props.setUpdate();
                }
                console.log(Global.currentProcesses);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
