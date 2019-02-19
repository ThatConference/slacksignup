import styled from 'styled-components';

const Header = ({ className }) => (
  <header className={className}>
    <div>
      <p>logo</p>
    </div>
  </header>
);

export default styled(Header)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
