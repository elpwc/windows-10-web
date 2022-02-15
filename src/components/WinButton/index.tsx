import './index.css';

interface WinButtonProps {
  w?: string;
  h?: string;
  children?: string | JSX.Element | never[];
}

export default (props: WinButtonProps) => {
  return (
    <>
      <button style={{width: props.w, height: props.h}}>{props.children}</button>
    </>
  );
};
