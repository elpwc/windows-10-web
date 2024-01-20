import WinButton from '../components/WinButton';

interface p {}
export default (props: p) => {
  let route = '';

  return (
    <div style={{ height: '90%', width: '90%', padding: '5px', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui', justifyContent: 'space-between' }}>
      <span>Hello, world</span>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'right' }}>
        <WinButton w="80px">Ok</WinButton>
        <WinButton w="80px">Cancel</WinButton>
      </div>
    </div>
  );
};
