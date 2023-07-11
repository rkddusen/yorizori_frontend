import React from 'react';
import styled from 'styled-components';
import CategoryList from '../Category/CategoryList';

function MainCategory(){
  return(
    <StyledCategories>
      {/* <div>
        <CategoryTitle>카테고리</CategoryTitle>
      </div> */}
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

const CategoryTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
`;

export default MainCategory;