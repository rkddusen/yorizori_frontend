import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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

function CategoryPage() {
  const [checked, setChecked] = useState(null);
  const [result, setResult] = useState([]);
  const [totalRecipeCount, setTotalRecipeCount] = useState(0);
  const location = useLocation();
  const axiosUrl = process.env.REACT_APP_AXIOS_URL;
  const [sorting, setSorting] = useState('요리조리 랭킹순');

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const _checked = search.get("category");
    const _page = search.get("page") || 1;
    setChecked(_checked);
    
    getRecipe(_checked, _page-1);
  }, [location, sorting]);

  const getRecipe = async (category, page) => {
    let sortingName = 'recipeViewCount';
    if(sorting === '요리조리 랭킹순') sortingName = 'recipeViewCount';
    else if(sorting === '조회순') sortingName = 'recipeViewCount';
    else if(sorting === '댓글순') sortingName = 'reviewCount';
    else if(sorting === '별점순') sortingName = 'starCount';
    else if(sorting === '최신순') sortingName = 'createdTime';
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
            <PageExplain
              title="RECIPE CATEGORY"
              explain="원하는 레시피를 카테고리 내에서 찾아보세요!"
            />
            <CategoryList checked={checked} />
            <CategoryTitle>
              <div>
                <CategoryName>"{checked}"</CategoryName> 레시피
              </div>
              <SortingBox sorting={sorting} setSorting={setSorting} sortMenu={['요리조리 랭킹순', '조회순', '댓글순', '별점순', '최신순']} />
            </CategoryTitle>
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

export default CategoryPage;
