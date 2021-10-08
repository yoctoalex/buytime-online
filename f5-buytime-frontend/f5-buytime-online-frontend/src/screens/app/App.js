import React from 'react';
import styled from 'styled-components';
import Main from './Main';
import 'antd/dist/antd.css';
import '../../index.css';

function App() {
  document.title = process.env.REACT_APP_TITLE || 'Auction';

  return (
    <Wrapper>
      <Main />
  </Wrapper>
  );
}

export default App;

const Wrapper = styled.section`
  margin: auto;
  min-height: 100vh;
  display: flex;
  flex-basis: auto;
  flex-direction: column;
`;
