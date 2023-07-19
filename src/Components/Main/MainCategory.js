import React from 'react';
import styled from 'styled-components';
import CategoryList from '../Category/CategoryList';

function MainCategory(){
  return(
    <StyledCategories>
      <CategoryList />
    </StyledCategories>
  );
}

const StyledCategories = styled.div`
  margin-top: 170px;
  @media screen and (max-width: 767px) {
    margin-top: 130px;
  }
`;

export default MainCategory;