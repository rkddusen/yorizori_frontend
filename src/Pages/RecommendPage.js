import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import RecipeView from '../Components/RecipeView';
import PageExplain from '../Components/PageExplain';
import RecommendNav from '../Components/Recommend/RecommendNav';
import { useUserContext } from '../contexts/UserContext';
import axios from 'axios';
import NoRecipe from '../Components/NoRecipe';
import Error from '../Components/Error';

function RecommendPage() {
  const { user } = useUserContext();
  const [mode, setMode] = useState('TR');
  const [result, setResult] = useState([]);
  const location = useLocation();
  const axiosUrl = process.env.REACT_APP_AXIOS_URL;
  const serverAxiosUrl = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();
  const [getEnd, setGetEnd] = useState(false);
  const [getFail, setGetFail] = useState(false);

  useEffect(() => {
    setGetEnd(false);
    const search = new URLSearchParams(location.search);
    const _mode = search.get('mode') || 'TR';
    if(_mode !== 'TR' && _mode !== 'PR') navigate(`/recommend?mode=TR`, {replace: true});
    setMode(_mode);

    if(user.id && _mode === 'PR'){
      getPRRecipe();
    } else if(user.id && _mode === 'TR'){
      getTRRecipe();
    }
  }, [location]);

  const getPRRecipe = async (userId = user.id) => {
    setGetEnd(false);
    axios
      .get(`${serverAxiosUrl}/recipe/get/recommend/${userId}`)
      .then((res) => {
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
      })
      .catch((error) => {
        setGetEnd(true);
        setGetFail(true);
        console.log(error);
      })
  };
  const getTRRecipe = async () => {
    setGetEnd(false);
    axios
      .get(`${serverAxiosUrl}/recipe/get/recommendToday`)
      .then((res) => {
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
      })
      .catch((error) => {
        setGetEnd(true);
        setGetFail(true);
        console.log(error);
      })
  }

  const test = async (arr, bool) => {
    setGetEnd(false);
    axios
      .get(`${axiosUrl}/recipe/get/recommendToday/test?month=${arr[0]}&day=${arr[1]}&rain=${bool}`)
      .then((res) => {
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
      })
      .catch((error) => {
        setGetEnd(true);
        setGetFail(true);
        console.log(error);
      })
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
              {!getFail ? (
                <>
                {result.length ? (
                  <>
                    {mode === 'TR' ? (
                      <div>
                        <button onClick={() => test([1,23], 'off')}>설날</button>
                        <button onClick={() => test([7,11], 'off')}>초복</button>
                        <button onClick={() => test([2,14], 'off')}>발렌타인데이</button>
                        <button onClick={() => test([12,25], 'off')}>크리스마스</button>
                        <button onClick={() => test([2,14], 'on')}>비 오는 날</button>
                      </div>
                    ) : (
                      <div>
                        <button onClick={() => getPRRecipe('test-d50-k30-w20')}>d50-k30-w20</button>
                        <button onClick={() => getPRRecipe('test-d80-w20-k10')}>d80-w20-k10</button>
                        <button onClick={() => getPRRecipe('test-j70-k30')}>j70-k30</button>
                        <button onClick={() => getPRRecipe('test-w65-k45')}>w65-k45</button>
                        <button onClick={() => getPRRecipe('test-k60-w20-f20')}>k60-w20-f20</button>
                      </div>
                    )}
                    <RecipeList>{result}</RecipeList>
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
