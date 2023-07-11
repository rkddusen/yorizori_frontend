import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

function Menus(props){
  const { user } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [nowPath, setNowPate] = useState(location.pathname);

  const moveLoginPage = () => {
    navigate(`/login`);
  }
  const moveRecommendPage = () => {
    navigate(`/recommend?mode=TR`);
  }
  const moveCategoryPage = () => {
    navigate(`/category?category=전체`);
  }
  const moveRankingPage = () => {
    navigate(`/ranking`);
  }
  const moveTipPage = () => {
    navigate(`/tip`);
  }
  return(
    <>
      <StyledMenus>
        <StyledList clicked={nowPath === "/recommend" ? true : false} onClick={moveRecommendPage}>추천</StyledList>
        <StyledList clicked={nowPath === "/category" ? true : false} onClick={moveCategoryPage}>카테고리</StyledList>
        <StyledList clicked={nowPath === "/ranking" ? true : false} onClick={moveRankingPage}>랭킹</StyledList>
        <StyledList clicked={nowPath === "/tip" ? true : false} onClick={moveTipPage}>쿠킹팁</StyledList>
        {user.id ?
          <StyledList onClick={moveLoginPage}>
            <ProfileImg src='./images/profiles/basic.png' />
          </StyledList>
        :
          <StyledList onClick={moveLoginPage}>로그인</StyledList>
        }
        
      </StyledMenus>
    </>
  );
}
const StyledMenus = styled.ul`
  height: 40px;
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  align-items: center;
`;
const StyledList = styled.li`
  margin-left: 36px;
  font-size: 16px;
  line-height: normal;
  color: ${props => props.clicked ? "#FFA800" : "reset"};
  &:hover{
    cursor: pointer;
    color: #FFA800;
  }
`;
const ProfileImg = styled.img`
  width: 32px;
  height: 32px;
`;

export default Menus;