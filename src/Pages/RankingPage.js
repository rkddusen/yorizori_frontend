import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import RecipeView from "../Components/RecipeView";
import PageExplain from "../Components/PageExplain";

function Ranking() {
  const [result, setResult] = useState([]);
  const axiosUrl = process.env.REACT_APP_AXIOS_URL;

  const getRankRecipe = async (page) => {
    const res = await axios.get(`${axiosUrl}/recipe/get/rank?page=${page}`);
    
    try {
      let _recipe = [];
      for (let i = 0; i < res.data.content.length; i++) {
        _recipe.push({
          id: res.data.content[i].id,
          title: res.data.content[i].title,
          thumbnail: res.data.content[i].thumbnail,
          starRate: res.data.content[i].starRate,
          starCount: res.data.content[i].starCount,
          profileImg: res.data.content[i].profileImg,
          nickname: res.data.content[i].nickname,
          viewCount: res.data.content[i].viewCount,
          rank: i + 1,
        });
      }

      let _result = [];
      for (let i = 0; i < 20; i++) {
        _result.push(<RecipeView key={result.length + i} recipe={_recipe[i]} />);
      }
      setResult([...result].concat(_result));
    } catch {
      console.log("오류");
    }
  };
  useEffect(() => {
    getRankRecipe(0);
  }, []);

   useEffect(() => {
    function handleScroll() {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement; // 페이지의 높이와 스크롤 위치

      if (scrollTop + clientHeight >= scrollHeight * 0.8)
        // 스크롤이 페이지 하단에 도달했는지 확인
        loadMoreContents(); // 추가 콘텐츠를 로드하는 로직을 실행
    }
    if (result.length < 100) window.addEventListener("scroll", handleScroll); // 스크롤 이벤트 리스너를 추가

    return () => {
      window.removeEventListener("scroll", handleScroll); // 컴포넌트가 언마운트되면 스크롤 이벤트 리스너를 제거
    };
   }, [result]);

  function loadMoreContents() {
    getRankRecipe((result.length)/20);
  }

  return (
    <div>
      <Wrap>
        <Header />
        <StyledBody>
          <Contents>
            <PageExplain
              title="RECIPE RANKING"
              explain="레시피 랭킹을 살펴보세요!"
            />
            <RecipeList>{result}</RecipeList>
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

export default Ranking;
