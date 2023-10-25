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
      <StyledButton onClick={handleReload}>새로고침</StyledButton>
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
const StyledButton = styled.button`
  margin: 0 auto;
  margin-top: 40px;
  display: block;
  background-color: #FFA800;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  padding: 15px 25px;

  @media screen and (max-width: 767px) {
    margin-top: 30px;
    font-size: 14px;
    padding: 15px 20px;
  }

  &:hover{
    cursor: pointer;
  }
`;

export default Error;