import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Star, Opinion } from './Evaluation';

function RecipeView(props){
  const { recipe } = props;
  const [result, setResult] = useState('');
  useEffect(() => {
    let recipeData = recipe.map(data => (
      <RecipeData key={data.id} >
        <ImgContent>
          <Img src={data.img}/>
        </ImgContent>
        <TitleContent>{data.title}</TitleContent>
        <EvaluationContent>
          <Star />
          <StarRate>{data.starRate}</StarRate>
          <StarCount>({data.starCount})</StarCount>
          <Opinion />
          <OpinionCount>{data.opinionCount}</OpinionCount>
        </EvaluationContent>
      </RecipeData>
    ))

    setResult(recipeData);
  },[recipe]);

  return(
    <RecipeRankingList>{result}</RecipeRankingList>
  );
}

const RecipeRankingList = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const RecipeData = styled.div`
  width: 23%;
  box-sizing: border-box;
  margin-bottom: 50px;
  cursor: pointer;
  &:hover{ // TitleContent 부분을 연하게 만들기
    color: lightgray;
  }
  &:hover img{
    transform: scale(1.1);
  }

  @media screen and (min-width: 768px) and (max-width: 1023px){
    width: 32%;
  }
  @media screen and (max-width: 767px){
    width: 100%;
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

export default RecipeView;
