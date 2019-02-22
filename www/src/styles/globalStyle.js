import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';

const GlobalStyle = createGlobalStyle`
  ${normalize()};
  html {
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,700');
    font-family: 'Roboto', sans-serif;
    width: 100%;
    height: 100%;

    box-sizing: border-box;
    font-size: 10px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    padding: 0;
    margin: 0;
    font-size: 1.6rem;
    line-height: 1.5;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
