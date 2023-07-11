import React from "react";
import styled, { keyframes, css } from "styled-components";
import { useNavigate } from "react-router-dom";

function ShortMenus(props) {
  const { shortMenusOpen, setShortMenusOpen } = props;
  const navigate = useNavigate();


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
  return (
    <StyledShortMenus shortMenusOpen={shortMenusOpen}>
      <Content>
        <Close>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={() => {
              setShortMenusOpen(false);
            }}
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </Close>
        <StyledList onClick={moveRecommendPage}>추천</StyledList>
        <StyledList onClick={moveCategoryPage}>카테고리</StyledList>
        <StyledList onClick={moveRankingPage}>랭킹</StyledList>
        <StyledList onClick={moveTipPage}>쿠킹팁</StyledList>
        <StyledList onClick={moveLoginPage}>로그인</StyledList>
      </Content>
    </StyledShortMenus>
  );
}

const slideIn = keyframes`
  0% {
    left: 100%;
    display: none;
  }
  100% {
    left: 0;
    display: block;
  }
`;
const slideOut = keyframes`
  0% {
    left: 0%;
    display: block;
  }
  100% {
    left: 100%;
    display: none;
  }
`;

const animationStyles = css`
  animation: ${props => props.shortMenusOpen ? slideIn : slideOut} 0.5s ease-in-out forwards;
`;

const StyledShortMenus = styled.div`
  top: 0;
  left: 100%;
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 99;
  overflow-x: hidden;
  background-color: rgb(256, 256, 256, 0.95);
  ${props => props.shortMenusOpen && animationStyles}
`;
const Close = styled.div`
  width: 100%;
  text-align: end;
  margin-bottom: 50px;
  cursor: pointer;
`;
const Content = styled.ul`
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
  padding: 10px;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  flex-shrink: 0;
`;
const StyledList = styled.li`
  margin: 20px 0;
  font-size: 18px;
  &:hover {
    cursor: pointer;
    color: #FFA800;
  }
`;

export default ShortMenus;
