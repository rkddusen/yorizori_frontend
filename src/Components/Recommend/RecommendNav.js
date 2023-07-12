import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function RecommendNav(props) {
  const { mode } = props;
  const navigate = useNavigate();

  const movePR = () => {
    navigate(`/recommend?mode=PR`,{replace: true});
  }
  const moveTR = () => {
    navigate(`/recommend?mode=TR`,{replace: true});
  }

  return (
    <StyledDiv>
        <Mode clicked={mode === 'TR' ? true : false} onClick={moveTR}>
            <Title clicked={mode === 'TR' ? true : false}>오늘의 추천</Title>
        </Mode>
        <Mode clicked={mode === 'PR' ? true : false} onClick={movePR}>
            <Title clicked={mode === 'PR' ? true : false}>사용자 맞춤 추천</Title>
        </Mode>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  border: 1px solid #FFA800;
  margin-bottom: 20px;
`;
const Mode = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${props => props.clicked ? '#FFA800' : '#FFFFFF'};
  color: ${props => props.clicked ? '#FFFFFF' : '#FFA800'};
  cursor: pointer;

  border-radius: 10px;
`;
const Title = styled.p`
  color: ${props => props.clicked ? '#FFFFFF' : '#FFA800'};
  font-size: 18px;
  @media screen and (max-width: 767px) {
    font-size: 12px;
  }
`
export default RecommendNav;