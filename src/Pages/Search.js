import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from 'react-router-dom';
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import RecipeView from '../Components/RecipeView';
import Paging from '../Components/Paging';

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [nowQuery, setNowQuery] = useState('food');
  const [result, setResult] = useState([]);
  const [totalRecipeCount, setTotalRecipeCount] = useState(0);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if(queryParams.get('method') === 'ingredient') {
      getRecipe('ingredient');
      setNowQuery('ingredient');
    }
    else {
      getRecipe('food');
      setNowQuery('food');
    }
  },[location]);

  const movePage = (method) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('method', method);
    navigate({
      pathname: location.pathname,
      search: queryParams.toString(),
    });
  }

  const getRecipe = (method) => {
    let _result = [];
    let _count = 0;
    for(let i = 0; i < 12; i++){
      _result.push(
        <RecipeView
          key={i}
          recipe={
            {
              id: i+1,
              title: method,
              thumbnail: '/src',
              starRate: 4.5,
              starCount: 100,
              profileImg: '/src',
              nickname: 'ㅇㅇ',
              viewCount: 100,
            }
          }
        />
      )
    }

    setResult(_result);
    _count = 30;
    setTotalRecipeCount(_count);
  };

  return (
    <div>
      <Wrap>
      <Header />
      <StyledBody>
        <Contents>
          <SearchNavUl>
            <SearchNavLi onClick={() => movePage('food')} checked={nowQuery === 'food'}>요리 검색</SearchNavLi>
            <SearchNavLi onClick={() => movePage('ingredient')} checked={nowQuery === 'ingredient'}>재료 검색</SearchNavLi>
          </SearchNavUl>
          <RecipeList>
            {result}
          </RecipeList>
          <Paging pagingCount={Math.ceil(totalRecipeCount/12)} />
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

export default Search;
