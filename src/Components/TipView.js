import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Heart, Opinion } from './Evaluation';

function TipView(props){
    const { tip } = props;
    const [result, setResult] = useState('');
    useEffect(() => {
      let tipData = tip.map(data => (
        <CookingTipData key={data.id}>
          <ImgContent>
            <Img src={data.img}/>
          </ImgContent>
          <TitleContent>{data.title}</TitleContent>
          <EvaluationContent>
            <Heart />
            <HeartCount>{data.heartCount}</HeartCount>
            <Opinion />
            <OpinionCount>{data.opinionCount}</OpinionCount>
          </EvaluationContent>
        </CookingTipData>
      ))
  
      setResult(tipData);
    },[]);

  return(
      <CookingTipList>{result}</CookingTipList>
  );
}

const CookingTipList = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const CookingTipData = styled.div`
  width: 23%;
  min-width: 23%;
  box-sizing: border-box;
  margin-bottom: 50px;
  cursor: pointer;
  &:hover{
    color: lightgray;
  }
  &:hover Img{
    transform: scale(1.1);
  }
  @media screen and (max-width: 767px){
    width: 48%;
    min-width: 48%;
  }
`;
const ImgContent = styled.div`
  position: relative;
  width: 100%;
  min-width: 100%;
  padding-bottom: 100%;
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
  color: inherit;
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

const HeartCount = styled.p`
  margin-left: 5px;
  margin-right: 10px;
`;
const OpinionCount = styled.p`
  margin-left: 5px;
`;


export default TipView;