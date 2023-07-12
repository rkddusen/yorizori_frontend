import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import RecipeView from '../Components/RecipeView';
import PageExplain from '../Components/PageExplain';

function Ranking(props) {
  const { user } = props;
  const [rankRecipe, setRankRecipe] = useState([
    { id: 1, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+', rank: 1 },
    { id: 2, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+', rank: 2 },
    { id: 3, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+', rank: 3 },
    { id: 4, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스스스스스스스스스스스', starRate: '5.0', starCount: '999+', opinionCount: '499+', rank: 4 },
    { id: 5, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+', rank: 5 },
    { id: 6, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+', rank: 6 },
    { id: 7, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+', rank: 7 },
    { id: 8, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+', rank: 8 },
    { id: 9, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+', rank: 9 },
    { id: 10, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+', rank: 10 },
    { id: 11, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+', rank: 11 },
    { id: 12, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+', rank: 12 },
  ]);
  const [recipeCount, setRecipeCount] = useState(12);

  useEffect(() => {
    function handleScroll() {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;// 페이지의 높이와 스크롤 위치

      if (scrollTop + clientHeight >= scrollHeight * 0.8) // 스크롤이 페이지 하단에 도달했는지 확인
        loadMoreContents(); // 추가 콘텐츠를 로드하는 로직을 실행
    }
    if(recipeCount < 100)
      window.addEventListener('scroll', handleScroll); // 스크롤 이벤트 리스너를 추가

    return () => {
      window.removeEventListener('scroll', handleScroll); // 컴포넌트가 언마운트되면 스크롤 이벤트 리스너를 제거
    };
  }, [recipeCount]);

  function loadMoreContents() {
    // 추가로 로드할 콘텐츠의 개수 (여기서는 12개씩 추가로 로드)
    let additionalCount = recipeCount === 96 ? 4 : 12;
  
    // 추가로 로드할 콘텐츠를 가져오는 비동기 로직을 수행합니다.
    // 예를 들어, API 호출이나 데이터베이스에서 콘텐츠를 가져오는 작업을 수행합니다.
    // 콘텐츠를 가져오는 비동기 작업이 완료되면 allContents 상태 변수를 업데이트합니다.
    // 이 예시에서는 간단히 새로운 콘텐츠를 생성하여 추가합니다.
    const newContents = Array.from({ length: additionalCount }, (_, index) => ({
      id: rankRecipe.length + index + 1,
      img: './images/recipe_thumbnail.jpg',
      title: `Recipe ${rankRecipe.length + index + 1}`,
      starRate: '5.0',
      starCount: '999+',
      opinionCount: '499+',
      rank: rankRecipe.length + index + 1,
    }));
    setRankRecipe(prevRankRecipe => [...prevRankRecipe, ...newContents]);

    // 로드된 콘텐츠 개수를 업데이트합니다.
    setRecipeCount(prevRecipeCount => prevRecipeCount + additionalCount);
  }

  return (
    <div>
      <Wrap>
      <Header user={user} />
      <StyledBody>
        <Contents>
          <PageExplain title="RECIPE RANKING" explain="레시피 랭킹을 살펴보세요!"/>
          <RecipeView recipe={rankRecipe} />
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

export default Ranking;
