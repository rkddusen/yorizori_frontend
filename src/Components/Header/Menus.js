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
  console.log(user.profileImg);
  return(
    <>
      <StyledMenus>
        <StyledList checked={nowPath === "/recommend" ? true : false} onClick={moveRecommendPage}>추천</StyledList>
        <StyledList checked={nowPath === "/category" ? true : false} onClick={moveCategoryPage}>카테고리</StyledList>
        <StyledList checked={nowPath === "/ranking" ? true : false} onClick={moveRankingPage}>랭킹</StyledList>
        <StyledList checked={nowPath === "/tip" ? true : false} onClick={moveTipPage}>쿠킹팁</StyledList>
        {user.id ?
          <StyledList onClick={moveLoginPage}>
            <ProfileImg src={process.env.PUBLIC_URL + user.profileImg} />
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
  color: ${props => props.checked ? "#FFA800" : "reset"};
  &:hover{
    cursor: pointer;
    color: #FFA800;
  }
`;
const ProfileImg = styled.img`
  width: 40px;
`;

export default Menus;