import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import ProfileBox from './ProfileBox';
import { useUserContext } from '../../contexts/UserContext';
import { ProfileImgClickable } from '../ProfileImg';

function Menus(props){
  const { user } = useUserContext();
  const { profileBoxOpen, setProfileBoxOpen } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [nowPath, setNowPath] = useState(location.pathname);
  const boxRef = useRef(null);

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



  const OnBoxClickHandler = () => {
    setProfileBoxOpen(!profileBoxOpen);
  }

  const onClickOutsideHandler = ({ target }) => {
    if (boxRef.current && profileBoxOpen === true && !boxRef.current.contains(target)) {
      if(window.getComputedStyle(boxRef.current).getPropertyValue('display') !== 'none')
        setProfileBoxOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", onClickOutsideHandler);
    return () => {
      window.removeEventListener("click", onClickOutsideHandler);
    };
  });


  return(
    <>
      <StyledMenus>
        <StyledList checked={nowPath === "/recommend" ? true : false} onClick={moveRecommendPage}>추천</StyledList>
        <StyledList checked={nowPath === "/category" ? true : false} onClick={moveCategoryPage}>카테고리</StyledList>
        <StyledList checked={nowPath === "/ranking" ? true : false} onClick={moveRankingPage}>랭킹</StyledList>
        <StyledList checked={nowPath === "/tip" ? true : false} onClick={moveTipPage}>쿠킹팁</StyledList>
        {user.id ?
          <>
            <StyledProfileList  ref={boxRef}>
              <ProfileImgClickable onClick={OnBoxClickHandler} src={user.profileImg} style={{width: '40px'}} />
              <ProfileBox user={user} profileBoxOpen={profileBoxOpen} />
            </StyledProfileList>
            
          </>
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
const StyledProfileList = styled.li`
  margin-left: 36px;
  font-size: 16px;
  &:hover{
    cursor: pointer;
  }
  @media screen and (max-width: 767px){
    display: none;
  }
`;

export default Menus;