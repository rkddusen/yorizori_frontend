import React from 'react';
import { styled } from 'styled-components';

const Error = () => {
  const handleReload = () => {
    window.location.reload();
  }
  return (
    <StyledDiv>
      <StyledImg src={process.env.REACT_APP_PUBLIC_URL + '/images/noRecipe.png'} />
      <StyledP>데이터 로딩을 실패했어요:(</StyledP>
      <button onClick={handleReload}>새로고침</button>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  margin: 100px 0;
  width: 100%;
  text-align: center;
`;
const StyledImg = styled.img`
  width: 200px;
  margin-bottom: 20px;
  @media screen and (max-width: 767px) {
    width: 100px;
    margin-bottom: 10px;
  }
`;
const StyledP = styled.p`
  font-size: 25px;
  @media screen and (max-width: 767px) {
    font-size: 18px;
  }
`;

export default Error;