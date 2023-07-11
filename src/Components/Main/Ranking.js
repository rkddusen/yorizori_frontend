import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Star, Opinion } from '../Evaluation';
import { useNavigate } from 'react-router-dom';

function Ranking(props){
  const { rankRecipe } = props;
  const [result, setResult] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    let recipeData = rankRecipe.map(data => ( // rank가 3이하면 다른 스타일 적용
      <RecipeData key={data.id} isInThree={data.rank <= 3 ? true : false}>
        <ImgContent>
          <Rank isInThree={data.rank <= 3 ? true : false}>
            <RankNum isInThree={data.rank <= 3 ? true : false}>{data.rank}</RankNum>
          </Rank>
          <Img src={data.img}/>
        </ImgContent>
        <TitleContent>{data.title}</TitleContent>
        <EvaluationContent isInThree={data.rank <= 3 ? true : false}>
          <Star />
          <StarRate>{data.starRate}</StarRate>
          <StarCount>({data.starCount})</StarCount>
          <Opinion />
          <OpinionCount>{data.opinionCount}</OpinionCount>
        </EvaluationContent>
      </RecipeData>
    ))

    setResult(recipeData);
  },[rankRecipe]);

  const moveRankingPage = () => {
    navigate(`/ranking`);
  }

  return(
    <StyledRanking>
      <RankingNav>
        <RankingTitle>오늘의 <RankingRed>랭킹</RankingRed></RankingTitle>
        <RankingMore onClick={moveRankingPage}>더보기 {'>'}</RankingMore>
      </RankingNav>
      <RecipeRankingList>{result}</RecipeRankingList>
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

const RecipeRankingList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const RecipeData = styled.div`
  width: ${props => props.isInThree ? "31%" : "23%"};
  box-sizing: border-box;
  margin-bottom: 50px;
  cursor: pointer;
  &:hover{ // TitleContent 부분을 연하게 만들기
    color: lightgray;
  }
  &:hover img{
    transform: scale(1.1);
  }

  @media screen and (max-width: 767px){
    width: ${props => props.isInThree ? "100%" : "48%"};
    min-width: ${props => props.isInThree ? "100%" : "48%"};
  }
`;

const ImgContent = styled.div`
  position: relative;
  width: 100%;
  min-width: 100%;
  padding-bottom: 60%;
  margin-bottom: 10px;
  overflow: hidden;
  border-radius: 15px;
`;
const Rank = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: ${props => props.isInThree ? "4%" : "5%"};
  width: ${props => props.isInThree ? "50px" : "35px"};
  height: ${props => props.isInThree ? "50px" : "35px"};
  background-color: #FFA800;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (max-width: 767px){
    width: ${props => props.isInThree ? "40px" : "30px"};
    height: ${props => props.isInThree ? "40px" : "30px"};
  }
`;
const RankNum = styled.p`
  font-size: ${props => props.isInThree ? "28px" : "20px"};
  color: white;
  text-align: center;
  @media screen and (max-width: 767px){
    font-size: ${props => props.isInThree ? "18px" : "16px"};
  }
`;
const Img = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition-duration: 0.2s;
  transition-delay: 0s;
`;
const TitleContent = styled.div`
  margin-bottom: 10px;
  color: inherit; // 부모의 색상 따라감
`;

const EvaluationContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  font-size: 14px;
  color: black;
  // margin-bottom: ${props => props.isInThree ? "40px" : "30px"};
  @media screen and (max-width: 767px){
    font-size: 12px;
  }
`;

const StarRate = styled.p`
  margin-left: 5px;
`;
const StarCount = styled.p`
  margin-left: 2px;
  margin-right: 10px;
  color: #808080;
  
`;
const OpinionCount = styled.p`
  margin-left: 5px;
`;

export default Ranking;