import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RecipeView from '../RecipeView';

function Ranking(){
  const [result, setResult] = useState([]);
  const navigate = useNavigate();

  const getRankRecipe = async () => {
    const res = await axios.get("http://172.30.1.32:8080/recipe/get/all/paging");
    try {
      let _result = [];
      for(let i = 0; i < 9; i++){
          _result.push(
            <RecipeView
              key={i}
              recipe={
                {
                  id: res.data.content[i].id,
                  title: res.data.content[i].title,
                  thumbnail: res.data.content[i].thumbnail,
                  starRate: res.data.content[i].starRate,
                  starCount: res.data.content[i].starCount,
                  profileImg: res.data.content[i].profileImg,
                  nickname: res.data.content[i].nickName,
                  viewCount: res.data.content[i].viewCount,
                  rank: i+1,
                }
              }
            />
          )
        }
      setResult(_result);
    } catch {
      console.log("오류");
    }
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