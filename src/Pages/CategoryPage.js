import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import CategoryList from "../Components/Category/CategoryList";
import RecipeView from "../Components/RecipeView";
import Paging from "../Components/Paging";
import PageExplain from "../Components/PageExplain";
import NoRecipe from '../Components/NoRecipe';
import SortingBox from '../Components/SortingBox';
import Error from '../Components/Error';

function CategoryPage() {
  const [checked, setChecked] = useState(null);
  const [result, setResult] = useState([]);
  const [totalRecipeCount, setTotalRecipeCount] = useState(0);
  const location = useLocation();
  const axiosUrl = process.env.REACT_APP_AXIOS_URL;
  const [sorting, setSorting] = useState(1);
  const [getEnd, setGetEnd] = useState(false);
  const [getFail, setGetFail] = useState(false);
  const navigate = useNavigate();
  const category = ['전체','한식','중식','일식','양식','아시안','분식','안주','퓨전','카페','편의점','기타'];

  useEffect(() => {
    setGetEnd(false);
    const search = new URLSearchParams(location.search);
    let _checked = search.get("category");
    if(category.indexOf(_checked) === -1) navigate(`/category?category=전체`, {replace: true});
    const _page = search.get("page") || 1;
    setChecked(_checked);
    const _sort = search.get("sort") || '1';
    if(_sort !== '1' && _sort !== '2' && _sort !== '3' && _sort !== '4' && _sort !== '5'){
      moveSort(1);
    }
    setSorting(Number(_sort));
    getRecipe(_checked, _page-1, Number(_sort));
  }, [location]);

  const getRecipe = async (category, page, sort) => {
    let sortingName = 'yorizori';
    if(sort === 1) sortingName = 'yorizori';
    else if(sort === 2) sortingName = 'recipeViewCount';
    else if(sort === 3) sortingName = 'reviewCount';
    else if(sort === 4) sortingName = 'starCount';
    else if(sort === 5) sortingName = 'createdTime';
    const res = await axios.get(
      `${axiosUrl}/recipe/get/category/${category}?pageNo=${page}&orderBy=${sortingName}`
    );
    try {
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
    } catch {
      setGetEnd(true);
      setGetFail(true);
      console.log("오류");
    }
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
            <PageExplain
              title="RECIPE CATEGORY"
              explain="원하는 레시피를 카테고리 내에서 찾아보세요!"
            />
            <CategoryList checked={checked} />
            <CategoryTitle>
              <div>
                <CategoryName>"{checked}"</CategoryName> 레시피
              </div>
              <SortingBox moveSort={(num) => moveSort(num)} sorting={sorting} sortMenu={['요리조리 랭킹순', '조회순', '댓글순', '별점순', '최신순']} />
            </CategoryTitle>
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
const CategoryTitle = styled.div`
  font-size: 20px;
  margin-top: 50px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  
`;
const CategoryName = styled.span`
  font-size: 20px;
  color: #ffa800;
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

export default CategoryPage;
