import styled from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';

const FOOTER_MODIFIERS = {
  site: ({ theme }) => `
    background-color: ${theme.colors.dark}; 
    color: ${theme.colors.fonts.light}; 
  `
};

const Footer = ({ className }) => (
  <footer className={className}>
    <div>
      <h1>THAT Conference</h1>
    </div>
    <div>
      <p>© 2019 THAT Conference &#x00AE;, Summer Camp for Geeks &#x00AE;</p>
    </div>
  </footer>
);

// use that media query...
export default styled(Footer)`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: ${({ theme }) => theme.colors.orange};
  }

  ${applyStyleModifiers(FOOTER_MODIFIERS)};
`;
