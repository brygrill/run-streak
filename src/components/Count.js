import React from 'react';
import styled from 'styled-components';

const CountDiv = styled.div`
  display: flex;
  flex-direction: column;
`
const Num = styled.div`
  font-size: 18rem;
  @media (max-width: 768px) {
    font-size: 15rem;
  }
`;

const Days = styled.div`
  font-size: 3rem;
  margin-top: -3rem;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Count = ({ count }) => {
  return (
    <CountDiv>
      <Num>{count}</Num>
      <Days>Days</Days>
    </CountDiv>
  );
};

export default Count;
