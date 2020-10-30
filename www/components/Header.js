import React from 'react';
import styled from 'styled-components';


const Header = ({ className }) => (
  <header className={className}>
    <div className="header-container">
      <a href="//www.thatconference.com">
        <img src='../static/images/THAT.svg' alt="THAT Logo" class="that-logo"/>
      </a>
    </div>
  </header>
);

export default styled(Header)`
  height: 118px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #121B46;
  border-bottom: 1px solid #4c3e30;

  .header-container {
    padding: 0 1.5rem;
    width: 100%;
    max-width: 1170px;
    text-align: center;
  }

  .header-logo {
    position: absolute;
    top: 0;
  }

  img.that-logo {
    filter: brightness(0) saturate(100%) invert(99%) sepia(2%) saturate(315%) hue-rotate(170deg) brightness(117%) contrast(100%);
    padding-top: 1%;
    width: 50%;
  }

header-logo svg text {
  font-size: 42px;
}

`;
