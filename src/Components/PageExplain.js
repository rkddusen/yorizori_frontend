import React from 'react';
import styled from 'styled-components';

function PageExplain(props){
  const { title, explain } = props;

  return(
    <StyledPageExplain>
      <Title>[ {title} ]</Title>
      <Explain>{explain}</Explain>
    </StyledPageExplain>
  );
}
const StyledPageExplain = styled.div`
  padding: 50px 0;
  margin-bottom: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 767px) {
    padding: 20px 0;
  }
`;
const Title = styled.p`
  font-size: 34px;
  text-align: center;
  margin-bottom: 20px;
  letter-spacing: 5px;
  @media screen and (max-width: 1023px) {
    font-size: 25px;
  }
  @media screen and (max-width: 767px) {
    font-size: 20px;
  }
`;
const Explain = styled.p`
  font-size: 18px;
  color: gray;
  @media screen and (max-width: 1023px) {
    font-size: 16px;
  }
  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
`;

export default PageExplain;