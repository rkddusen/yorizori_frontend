import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from 'react-router-dom';
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import RecipeView from '../Components/RecipeView';
import Paging from '../Components/Paging';
import NoRecipe from '../Components/NoRecipe';

function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [nowMethod, setNowMethod] = useState('');
  const [nowSearch, setNowSearch] = useState('');
  const [result, setResult] = useState([]);
  const [totalRecipeCount, setTotalRecipeCount] = useState(0);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    let _method = queryParams.get('method');
    let _search = queryParams.get('search');
    
    getRecipe(_method, _search);
    setNowMethod(_method);
    setNowSearch(_search);

  },[location]);

  const getRecipe = (method, search) => {
    let _result = [];
    let _count = 0;
    for(let i = 0; i < 10; i++){
      _result.push(
        <RecipeView
          key={i}
          recipe={
            {
              id: i+1,
              title: method + search,
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
          <SearchNav>
            <p>{nowMethod === 'food' ? '요리명' : '재료명'} 검색 결과</p>
            <p>"{nowSearch}"</p>
          </SearchNav>
          {result.length ? (
              <>
                <RecipeList>{result}</RecipeList>
                <Paging pagingCount={Math.ceil(totalRecipeCount / 12)} />
              </>
            ) : (
              <NoRecipe />
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

const SearchNav = styled.div`
  width: 100%;
  font-size: 25px;
  padding-bottom: 50px;
  padding-top: 50px;
  & > p:first-child{
    margin-bottom: 10px;
    font-size: 20px;
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

export default SearchPage;
