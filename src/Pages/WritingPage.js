import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import RecipeWriting from '../Components/Writing/RecipeWriting';

function WritingPage() {
  const [writing, setWriting] = useState('recipe');

  const changeWriting = (str) => {
    setWriting(str);
  };

  return (
    <div>
      <Wrap>
      <Header />
      <StyledBody>
        <Contents>
          <SearchNavUl>
            <SearchNavLi onClick={() => changeWriting('recipe')} checked={writing === 'recipe'}>레시피 작성</SearchNavLi>
            <SearchNavLi onClick={() => changeWriting('tip')} checked={writing === 'tip'}>팁 작성</SearchNavLi>
          </SearchNavUl>
          {writing === 'recipe' ? (
              <RecipeWriting />
            ) : (
              <></>
            )}
        </Contents>
      </StyledBody>
      </Wrap>
      <Footer />
    </div>
  );
}

const Wrap = styled.div`
  width: 100%;
  height: auto;
  min-height: calc(100vh - 250px - 170px);
`;
const StyledBody = styled.div`
  width: 100%;
`;
const Contents = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 170px;
  @media screen and (max-width: 767px) {
    max-width: 400px;
    margin-top: 130px;
  }
`;

const SearchNavUl = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 50px;
  margin-top: 50px;
`;
const SearchNavLi = styled.li`
  width: 110px;
  font-size: 18px;
  text-align: center;
  padding: 10px 0;
  margin: 0 20px;
  border-bottom: ${props => props.checked ? '2px solid #FFA800' : 'none'};
  color: ${props => props.checked ? '#FFA800' : 'black'};
  &:hover{
    cursor: pointer;
  }
  @media screen and (max-width: 767px) {
    width: 90px;
    font-size: 14px;
    margin: 0 15px;
  }
`;

const RecipeList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: left;
  column-gap: 2%;
  word-wrap: normal;
  word-break: break-all;
  @media screen and (max-width: 1023px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default WritingPage;
