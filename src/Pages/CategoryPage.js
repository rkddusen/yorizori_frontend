import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import CategoryList from "../Components/Category/CategoryList";
import RecipeView from '../Components/RecipeView';
import Paging from '../Components/Paging'
import PageExplain from '../Components/PageExplain';

function CategoryPage(props) {
  const { user } = props;
  const [checked, setChecked] = useState(null);
  const [recipe, setRecipe] = useState([
    { id: 1, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+'},
    { id: 2, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+'},
    { id: 3, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+'},
    { id: 4, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스스스스스스스스스스스', starRate: '5.0', starCount: '999+', opinionCount: '499+'},
    { id: 5, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+' },
    { id: 6, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+'},
    { id: 7, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+'},
    { id: 8, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+'},
    { id: 9, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+'},
    { id: 10, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+'},
    { id: 11, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+'},
    { id: 12, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+'},
  ]);
  const [totalRecipeCount, SetTotalRecipeCount] = useState(200);
  const location = useLocation();

  useEffect(() => {
    const _checked = new URLSearchParams(location.search);
    setChecked(_checked.get('category'));
  }, [location]);


  return (
    <div>
      <Wrap>
      <Header user={user} />
      <StyledBody>
        <Contents>
          <PageExplain title="RECIPE CATEGORY" explain="원하는 레시피를 카테고리 내에서 찾아보세요!" />
          <CategoryList checked={checked} />
          <CategoryTitle><CategoryName>"{checked}"</CategoryName> 레시피</CategoryTitle>
          <RecipeView recipe={recipe} />
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

export default CategoryPage;
