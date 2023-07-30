import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import RecipeView from '../Components/RecipeView';
import PageExplain from '../Components/PageExplain';
import RecommendNav from '../Components/Recommend/RecommendNav';

function RecommendPage() {
  const [mode, setMode] = useState('TR');
  const [result, setResult] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const _mode = search.get('mode') || 'TR';
    setMode(_mode);

    let _result = [];
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
    setResult(_result);
  }, [location]);

  return (
    <div>
      <Wrap>
      <Header />
      <StyledBody>
        <Contents>
          <PageExplain title="RECOMMEND RECIPE" explain="추천되는 레시피를 살펴보세요!" />
          <RecommendNav mode={mode} />
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

export default RecommendPage;
