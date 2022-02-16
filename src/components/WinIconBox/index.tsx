import './index.css';

interface WinIconBoxProps {
  icon: string;
  name: string;
  color?: string;
  noShadow?: boolean;
  processId?: number;
  onDoubleClick?: (processId: number) => void;
}

export default (props: WinIconBoxProps) => {
  return (
    <div
      className="fileIcon"
      onDoubleClick={() => {
        props.onDoubleClick?.(props.processId ?? -1);
      }}
    >
      <img src={props.icon} />
      <p style={{ color: props.color ?? 'white', textShadow: props.noShadow ? 'none' : '0 0 3px #000' }}>{props.name}</p>
    </div>
  );
};
