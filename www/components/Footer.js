import styled from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';

const FOOTER_MODIFIERS = {
  site: ({ theme }) => `
    background-color: ${theme.colors.brown};
    color: ${theme.colors.fonts.tan};
  `
};

const Footer = ({ className }) => (
  <footer className={className}>
    <div>
      <p>© 2019 THAT Conference &#x00AE;, Summer Camp for Geeks &#x00AE;</p>
    </div>
  </footer>
);

// use that media query...
export default styled(Footer)`
  padding: 4.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin: 0;
  }

  ${applyStyleModifiers(FOOTER_MODIFIERS)};
`;
