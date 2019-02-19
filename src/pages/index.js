import { Fragment } from 'react';
import styled from 'styled-components';
import SignUpForm from '../components/SignUpForm';

const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const home = props => (
  <Fragment>
    <ContentSection>
      <SignUpForm />
    </ContentSection>
  </Fragment>
);

export default home;
