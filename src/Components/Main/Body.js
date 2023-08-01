import React, { useState } from 'react';
import styled from 'styled-components';
import MainCategory from './MainCategory';
import Ranking from './Ranking';
import Recommend from './Recommend';
import CookingTip from './CookingTip';

const Body = () => {
  return(
    <StyledBody>
      <Contents>
        <MainCategory />
        <Ranking />
        <Recommend />
        <CookingTip />
      </Contents>
    </StyledBody>
  );
}

const StyledBody = styled.div`
  width: 100%;
`;
const Contents = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  @media screen and (max-width: 767px){
    max-width: 400px;
  }
`;

export default Body;