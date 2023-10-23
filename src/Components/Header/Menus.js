import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import ProfileBox from './ProfileBox';
import { useUserContext } from '../../contexts/UserContext';
import { ProfileImgClickable } from '../ProfileImg';
import SearchBar from './SearchBar';
import WritingBox from './WritingBox';

function Menus(props){
  const { user } = useUserContext();
  const { onProfileBoxClickHandler, onWritingBoxClickHandler, profileBoxOpen, setProfileBoxOpen, writingBoxOpen, setWritingBoxOpen, isOpen, setIsOpen } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [nowPath, setNowPath] = useState(location.pathname);
  const profileBoxRef = useRef(null);
  const writingBoxRef = useRef(null);

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

  const onClickProfileOutsideHandler = ({ target }) => {
    if (profileBoxRef.current && profileBoxOpen === true && !profileBoxRef.current.contains(target)) {
      if(window.getComputedStyle(profileBoxRef.current).getPropertyValue('display') !== 'none')
        setProfileBoxOpen(false);
    }
  };

  const onClickWritingOutsideHandler = ({ target }) => {
    if (writingBoxRef.current && writingBoxOpen === true && !writingBoxRef.current.contains(target)) {
      if(window.getComputedStyle(writingBoxRef.current).getPropertyValue('display') !== 'none')
        setWritingBoxOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", onClickProfileOutsideHandler);
    window.addEventListener("click", onClickWritingOutsideHandler);
    return () => {
      window.removeEventListener("click", onClickProfileOutsideHandler);
      window.removeEventListener("click", onClickWritingOutsideHandler);
    };
  });


  return(
    <>
      <StyledMenus>
        <StyledList><SearchBar strokeWidth={1.5} isOpen={isOpen} setIsOpen={setIsOpen} /></StyledList>
        <StyledList checked={nowPath === "/recommend" ? true : false} onClick={moveRecommendPage}>추천</StyledList>
        <StyledList checked={nowPath === "/category" ? true : false} onClick={moveCategoryPage}>카테고리</StyledList>
        <StyledList checked={nowPath === "/ranking" ? true : false} onClick={moveRankingPage}>랭킹</StyledList>
        <StyledList checked={nowPath === "/tip" ? true : false} onClick={moveTipPage}>쿠킹팁</StyledList>
        {user.id ?
          <>
            <StyledProfileList ref={profileBoxRef}>
              <ProfileImgClickable onClick={onProfileBoxClickHandler} src={user.profileImg} style={{width: '40px', height: '40px'}} />
              <ProfileBox user={user} profileBoxOpen={profileBoxOpen} setProfileBoxOpen={setProfileBoxOpen} />
            </StyledProfileList>
          </>
        :
          <StyledList onClick={moveLoginPage}>로그인</StyledList>
        }
        <StyledWritingList ref={writingBoxRef} style={{marginLeft: !user.id ? '26px' : '10px'}}>
          <button onClick={onWritingBoxClickHandler}>글쓰기 ▼</button>
          <WritingBox writingBoxOpen={writingBoxOpen} setWritingBoxOpen={setWritingBoxOpen} />
        </StyledWritingList>
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
  margin-left: 26px;
  font-size: 16px;
  color: ${props => props.checked ? "#FFA800" : "reset"};
  stroke: #000000;
  &:hover{
    cursor: pointer;
    color: #FFA800;
    stroke: #FFA800;
  }
  &:first-child{
    &:hover{
      cursor: initial;
    }
  }
`;
const StyledProfileList = styled.li`
  margin-left: 26px;
  font-size: 16px;
  width: 42px;
  height: 42px;
  &:hover{
    cursor: pointer;
  }
  @media screen and (max-width: 767px){
    display: none;
  }
`;
const StyledWritingList = styled.li`
  /* margin-left: 10px; */
  & > button{
    font-size: 13px;
    background-color: #FFA800;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    &:hover{
      cursor: pointer;
    }
  }
  @media screen and (max-width: 767px){
    display: none;
  }
`;
export default Menus;