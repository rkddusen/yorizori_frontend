import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import RecipeView from '../Components/RecipeView';
import PageExplain from '../Components/PageExplain';

function Ranking(props) {
  const { user } = props;
  const [recipeCount, setRecipeCount] = useState(0);
  const [result, setResult] = useState([]);

  useEffect(() => {
    let _result = [];
    for(let i = 0; i < 12; i++){
      _result.push(
        <RecipeView
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
    setResult(_result);
    setRecipeCount(12);
  },[])

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
  
    // 추가로 로드할 콘텐츠를 가져오는 비동기 로직을 수행.
    // 콘텐츠를 가져오는 비동기 작업이 완료되면 allContents 상태 변수를 업데이트.
    let _result = [];
    for(let i = 0; i < additionalCount; i++){
      _result.push(
        <RecipeView
          recipe={
            {
              id: recipeCount + i + 1,
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
      );
    }
    setResult([...result, _result]);
    // 로드된 콘텐츠 개수를 업데이트.
    setRecipeCount(prevRecipeCount => prevRecipeCount + additionalCount);
  }

  return (
    <div>
      <Wrap>
      <Header user={user} />
      <StyledBody>
        <Contents>
          <PageExplain title="RECIPE RANKING" explain="레시피 랭킹을 살펴보세요!"/>
          <RecipeList>
            {result}
          </RecipeList>
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
const RecipeList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: left;
  flex-wrap: wrap;
  column-gap: 2%;
  @media screen and (max-width: 1023px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default Ranking;
