import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from 'react-router-dom';
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import RecipeView from '../Components/RecipeView';
import Paging from '../Components/Paging';
import NoRecipe from '../Components/NoRecipe';
import { useUserContext } from '../contexts/UserContext';
import axios from 'axios';
import SortingBox from '../Components/SortingBox';

function SearchPage() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [nowMethod, setNowMethod] = useState('');
  const [nowSearch, setNowSearch] = useState('');
  const [result, setResult] = useState([]);
  const [totalRecipeCount, setTotalRecipeCount] = useState(0);
  const axiosUrl = process.env.REACT_APP_AXIOS_URL;
  const [sorting, setSorting] = useState('요리조리 랭킹순');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    let _method = queryParams.get('method');
    let _search = queryParams.get('search');
    const _page = queryParams.get("page") || 1;

    if(_method === 'food')
    getRecipe(_search, _page - 1);
  else{getIRecipe(_search, _page - 1);}
    setNowMethod(_method);
    setNowSearch(_search);

  },[location, sorting]);

  const getRecipe = async (search, page) => {
    let sortingName = 'recipeViewCount';
    if(sorting === '요리조리 랭킹순') sortingName = 'recipeViewCount';
    else if(sorting === '조회순') sortingName = 'recipeViewCount';
    else if(sorting === '댓글순') sortingName = 'reviewCount';
    else if(sorting === '별점순') sortingName = 'starCount';
    else if(sorting === '최신순') sortingName = 'createdTime';
    const res = await axios.get(
      `${axiosUrl}/recipe/get/search/food?userId=${user.id}&search=${search}&pageNo=${page}&orderBy=${sortingName}`
    );
    try {
      let _result = [];
      console.log(res.data);
      for (let i = 0; i < res.data.content.length; i++) {
        _result.push(
          <RecipeView
            key={i}
            recipe={
              {
                id: res.data.content[i].id,
                title: res.data.content[i].title,
                thumbnail: res.data.content[i].thumbnail,
                reviewCount: res.data.content[i].reviewCount,
                starCount: res.data.content[i].starCount,
                profileImg: res.data.content[i].profileImg,
                nickname: res.data.content[i].nickname,
                viewCount: res.data.content[i].viewCount,
              }
            }
          />
        );
      }
      
      setResult(_result);
      setTotalRecipeCount(res.data.totalElements);
    } catch {
      console.log("오류");
    }
  };

  const getIRecipe = async (search, page) => {
    console.log(search)
    const res = await axios.get(
      `${axiosUrl}/recipe/get/search/ingredient?userId=${user.id}&search=${search}&pageNo=${page}`
    );
    try {
      let _result = [];
      console.log(res.data);
      for (let i = 0; i < res.data.length; i++) {
        _result.push(
          <RecipeView
            key={i}
            recipe={
              {
                id: res.data[i].id,
                title: res.data[i].title,
                thumbnail: res.data[i].thumbnail,
                reviewCount: res.data[i].reviewCount,
                starCount: res.data[i].starCount,
                profileImg: res.data[i].profileImg,
                nickname: res.data[i].nickname,
                viewCount: res.data[i].viewCount,
              }
            }
          />
        );
      }
      
      setResult(_result);
      setTotalRecipeCount(res.data.totalElements);
    } catch {
      console.log("오류");
    }
  };

  return (
    <div>
      <Wrap>
      <Header />
      <StyledBody>
        <Contents>
          <SearchNav>
            <div>
              <SearchTitle>{nowMethod === 'food' ? '요리명' : '재료명'} 검색 결과</SearchTitle>
              <p>"{nowSearch}"</p>
            </div>
            <SortingBox sorting={sorting} setSorting={setSorting} sortMenu={['요리조리 랭킹순', '조회순', '댓글순', '별점순', '최신순']} />
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
  display: flex;
  justify-content: space-between;
`;
const SearchTitle = styled.p`
  margin-bottom: 10px;
  font-size: 20px;
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
