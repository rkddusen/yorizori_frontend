import React from 'react';
import { styled } from 'styled-components';

const NoRecipe = () => {
  return (
    <StyledDiv>
      <StyledImg src={process.env.REACT_APP_PUBLIC_URL + '/images/noRecipe.png'} />
      <StyledP>레시피가 없어요 :(</StyledP>
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

export default NoRecipe;