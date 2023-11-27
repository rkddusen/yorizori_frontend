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
import Error from '../Components/Error';

function SearchPage() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [nowMethod, setNowMethod] = useState('');
  const [nowSearch, setNowSearch] = useState('');
  const [result, setResult] = useState([]);
  const [totalRecipeCount, setTotalRecipeCount] = useState(0);
  const axiosUrl = process.env.REACT_APP_AXIOS_URL;
  const [sorting, setSorting] = useState(1);
  const [getEnd, setGetEnd] = useState(false);
  const [getFail, setGetFail] = useState(false);

  useEffect(() => {
    setGetEnd(false);
    const queryParams = new URLSearchParams(location.search);
    let _method = queryParams.get('method');
    let _search = queryParams.get('search');
    const _page = queryParams.get("page") || 1;
    const _sort = queryParams.get("sort") || '1';
    if(_sort !== '1' && _sort !== '2' && _sort !== '3' && _sort !== '4' && _sort !== '5'){
      moveSort(1);
    }

    if(_method === 'food') getRecipe(_search, _page - 1, Number(_sort));
    else if(_method === 'ingredient') getIRecipe(_search, _page - 1, Number(_sort));
    else {
      const queryParams = new URLSearchParams(location.search);
      queryParams.set('method', 'food');
      navigate({
        pathname: location.pathname,
        search: queryParams.toString(),
      });
    }

    setNowMethod(_method);
    setNowSearch(_search);
    setSorting(Number(_sort));
  },[location]);

  const getRecipe = async (search, page, sort) => {
    
    let sortingName = 'yorizori';
    if(sort === 1) sortingName = 'yorizori';
    else if(sort === 2) sortingName = 'recipeViewCount';
    else if(sort === 3) sortingName = 'reviewCount';
    else if(sort === 4) sortingName = 'starCount';
    else if(sort === 5) sortingName = 'createdTime';
    axios
      .get(`${axiosUrl}/recipe/get/search/food?userId=${user.id}&search=${search}&pageNo=${page}&orderBy=${sortingName}`)
      .then((res) => {
        let _result = [];
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
        setGetEnd(true);
      })
      .catch((error) => {
        setGetEnd(true);
        setGetFail(true);
        console.log(error);
      })
  };

  const getIRecipe = async (search, page, sort) => {
    let sortingName = 'yorizori';
    if(sort === 1) sortingName = 'yorizori';
    else if(sort === 2) sortingName = 'recipeViewCount';
    else if(sort === 3) sortingName = 'reviewCount';
    else if(sort === 4) sortingName = 'starCount';
    else if(sort === 5) sortingName = 'createdTime';
    
    axios
      .get(`${axiosUrl}/recipe/get/search/ingredient?userId=${user.id}&search=${search}&pageNo=${page}&orderBy=${sortingName}`)
      .then((res) => {
        let _result = [];
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
        setGetEnd(true);
      })
      .catch((error) => {
        setGetEnd(true);
        setGetFail(true);
        console.log(error);
      })
  };

  const moveSort = (num) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('sort', num);
    queryParams.set('page', 1);
    navigate({
      pathname: location.pathname,
      search: queryParams.toString(),
    });
  }

  return (
    <div>
      <Wrap>
      <Header />
      <StyledBody>
        <Contents>
          <SearchNav>
            <div>
              <SearchTitle>{nowMethod === 'ingredient' ? '재료명' : '요리명'} 검색 결과</SearchTitle>
              <p>"{nowSearch}"</p>
            </div>
            <SortingBox moveSort={(num) => moveSort(num)} sorting={sorting} sortMenu={['요리조리 랭킹순', '조회순', '댓글순', '별점순', '최신순']} />
          </SearchNav>
          {getEnd ? (
            <>
              {!getFail ? (
                  <>
                  {result.length ? (
                    <>
                      <RecipeList>{result}</RecipeList>
                      <Paging pagingCount={Math.ceil(totalRecipeCount / 12)} />
                    </>
                  ) : (
                    <NoRecipe />
                  )}
                  </>
                ) : (
                  <Error />
                )}
            </> 
          ) : (
            <>
              <Loading>
                <img src={process.env.REACT_APP_PUBLIC_URL + '/images/loading.svg'} />
              </Loading>
            </> 
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

const Loading = styled.p`
  width: 15%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  & > img{
    width: 100%;
  }
  @media screen and (max-width: 767px) {
    width: 30%;
  }
`;

export default SearchPage;
