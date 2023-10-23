import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import RecipeView from '../Components/RecipeView';
import PageExplain from '../Components/PageExplain';
import RecommendNav from '../Components/Recommend/RecommendNav';
import { useUserContext } from '../contexts/UserContext';
import axios from 'axios';
import NoRecipe from '../Components/NoRecipe';

function RecommendPage() {
  const { user } = useUserContext();
  const [mode, setMode] = useState('TR');
  const [result, setResult] = useState([]);
  const location = useLocation();
  const axiosUrl = process.env.REACT_APP_SERVER_URL;
  const serverAxiosUrl = process.env.REACT_APP_SERVER_URL;
  const [getEnd, setGetEnd] = useState(false);

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const _mode = search.get('mode') || 'TR';
    setMode(_mode);

    if(user.id && _mode === 'PR'){
      getPRRecipe();
    } else if(user.id && _mode === 'TR'){
      getTRRecipe();
    }
  }, [location]);

  const getPRRecipe = async () => {
    setGetEnd(false);
    const res = await axios.get(`${axiosUrl}/recipe/get/recommend/${user.id}`);
    
    try {
      let _result = [];
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
      setGetEnd(true);
    } catch {
      setGetEnd(true);
      console.log("오류");
    }
  };
  const getTRRecipe = async () => {
    setGetEnd(false);
    const res = await axios.get(`${serverAxiosUrl}/recipe/get/recommendToday`);
    
    try {
      let _result = [];
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
      setGetEnd(true);
    } catch {
      setGetEnd(true);
      console.log("오류");
    }
  }

  return (
    <div>
      <Wrap>
      <Header />
      <StyledBody>
        <Contents>
          <PageExplain title="RECOMMEND RECIPE" explain="추천되는 레시피를 살펴보세요!" />
          <RecommendNav mode={mode} />
            {getEnd ? (
              <>
                {result.length ? (
                  <RecipeList>{result}</RecipeList>
                ) : (
                  <NoRecipe />
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
const RecipeList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: left;
  flex-wrap: wrap;
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

export default RecommendPage;
