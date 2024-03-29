import { RunningWinProcess } from '../../interfaces';

interface p {
  process: RunningWinProcess;
  focus: boolean;
  onClick: () => void;
}

export default (props: p) => {
  return (
    <div className={'taskbaritem long open ' + (props.focus ? 'focus' : '')} style={{ maxWidth: '150px', width: '150px' }} onClick={props.onClick}>
      <div className="taskbaritemContents">
        <img src={props.process.icon} />
        <span>{props.process.filename}</span>
      </div>
      <div className="taskbaritemBorders"></div>
    </div>
  );
};
