import React from 'react';
import styled from 'styled-components';

const CountDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: normal;
  }
`
const Num = styled.div`
  font-size: 18rem;
`;

const Days = styled.div`
  font-size: 3rem;
  @media (max-width: 768px) {
    margin-top: -3rem;
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
