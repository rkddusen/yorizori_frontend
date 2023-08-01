import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import CategoryList from "../Components/Category/CategoryList";
import RecipeView from '../Components/RecipeView';
import Paging from '../Components/Paging'
import PageExplain from '../Components/PageExplain';

function CategoryPage() {
  const [checked, setChecked] = useState(null);
  const [result, setResult] = useState([]);
  const [totalRecipeCount, setTotalRecipeCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const _checked = search.get('category');
    setChecked(_checked);

    let _result = [];
    let _count = 0;
    for(let i = 0; i < 12; i++){
      _result.push(
        <RecipeView
          key={i}
          recipe={
            {
              id: i+1,
              profileImg: "https://yorizori-s3.s3.ap-northeast-2.amazonaws.com/userImage/sample.png",
              nickname: "duyyaa",
              thumbnail: "https://yorizori-s3.s3.ap-northeast-2.amazonaws.com/src/8455f69d-6f83-4a85-9f95-a577c8d807bf.jpg",
              title: "제목",
              starRate: 4.5,
              starCount: 100,
              viewCount: 100,
            }
          }
        />
      )
    }
    _count = 200;
    setResult(_result);
    setTotalRecipeCount(_count);
  }, [location]);


  return (
    <div>
      <Wrap>
      <Header />
      <StyledBody>
        <Contents>
          <PageExplain title="RECIPE CATEGORY" explain="원하는 레시피를 카테고리 내에서 찾아보세요!" />
          <CategoryList checked={checked} />
          <CategoryTitle><CategoryName>"{checked}"</CategoryName> 레시피</CategoryTitle>
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
const CategoryTitle = styled.p`
  font-size: 20px;
  margin-top: 50px;
  margin-bottom: 30px;
`;
const CategoryName = styled.span`
  font-size: 20px;
  color: #FFA800;
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
