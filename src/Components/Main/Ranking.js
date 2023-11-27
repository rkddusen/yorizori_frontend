import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RecipeView from '../RecipeView';

function Ranking(){
  const [result, setResult] = useState([]);
  const navigate = useNavigate();
  const axiosUrl = process.env.REACT_APP_AXIOS_URL;

  const getRankRecipe = async () => {
    axios
      .get(`${axiosUrl}/recipe/get/rank/part`)
      .then((res) => {
        let _result = [];
        for(let i = 0; i < 9; i++){
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
                    rank: i+1,
                  }
                }
              />
            )
          }
        setResult(_result);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  useEffect(() => {
    getRankRecipe();
  },[])

  const moveRankingPage = () => {
    navigate(`/ranking`);
  }

  return(
    <StyledRanking>
      <RankingNav>
        <RankingTitle>오늘의 <RankingRed>랭킹</RankingRed></RankingTitle>
        <RankingMore onClick={moveRankingPage}>더보기 {'>'}</RankingMore>
      </RankingNav>
      <RecipeList>
        {result}
      </RecipeList>
    </StyledRanking>
  );
}

const StyledRanking = styled.div`
  margin-top: 50px;
`;

const RankingNav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;
const RankingTitle = styled.p`
  font-size: 20px;
`;
const RankingRed = styled.span`
  color: #FFA800;
`;
const RankingMore = styled.p`
  font-size: 16px;
  color: #FFA800;
  &:hover{
    opacity: 50%;
    cursor: pointer;
  }
`;

const RecipeList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: left;
  column-gap: 2%;
  word-wrap: normal;
  word-break: break-all;

  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default Ranking;