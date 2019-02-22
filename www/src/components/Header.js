import styled from 'styled-components';

const Header = ({ className }) => (
  <header className={className}>
    <div className="header-container">
      <a href="//www.thatconference.com">
        <img
          className="header-logo"
          src="/static/images/TC-Head-Logo.png"
          alt="THAT Conference"
        />
      </a>
    </div>
  </header>
);

export default styled(Header)`
  height: 7.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #5e4530;
  border-bottom: 1px solid #4c3e30;

  .header-container {
    padding: 0 1.5rem;
    width: 100%;
    max-width: 1170px;
  }

  .header-logo {
    position: absolute;
    top: 0;
  }
`;
