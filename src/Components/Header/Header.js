import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Menus from "./Menus";
import styled from "styled-components";
import ShortMenus from './ShortMenus';
import { useNavigate, useLocation } from 'react-router-dom';

function Header(props) {
  const { user } = props;
  const [shortMenusOpen, setShortMenusOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(()=>{
    setShortMenusOpen(false);
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto", // Optional if you want to skip the scrolling animation
    });
  },[location]);

  const movePage = () => {
    navigate(`/`);
  }

  return (
    <StyledHeader>
      <StyledHeaderDesktop>
        <a onClick={movePage}>
          <img src={process.env.PUBLIC_URL + '/images/logo.png'} height="28px" alt="logo" />
        </a>
        <DesktopNav>
          <SearchBar />
          <Menus user={user} />
        </DesktopNav>
      </StyledHeaderDesktop>
      <StyledHeaderPhone>
        <PhoneNav>
          <a onClick={movePage} style={{height: "25px"}}>
            <img src={process.env.PUBLIC_URL + '/images/logo.png'} height="20px" alt="logo" />
          </a>
          <StyledSvg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={() => {setShortMenusOpen(true)}}
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </StyledSvg>
          <ShortMenus shortMenusOpen={shortMenusOpen} setShortMenusOpen={setShortMenusOpen} />
        </PhoneNav>
        <SearchBar user={user} />
      </StyledHeaderPhone>
    </StyledHeader>
  );
}
const StyledHeader = styled.div`
  width: 100%;
  // border-bottom: 1px solid #10101010;
  box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  z-index: 99;
  background-color: white;
`;
const StyledHeaderDesktop = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 0;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  @media screen and (max-width: 767px){
    display: none;
  }
`;
const DesktopNav = styled.div`
  width: 100%;
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
`;

const StyledHeaderPhone = styled.div`
  display: none;
  box-sizing: content-box;
  margin: 0 auto;
  max-width: 400px;
  width: 90%;
  @media screen and (max-width: 767px){
    padding: 10px;
    display: block;
  }
  /* padding: 10px;
  display: block; */
`;
const PhoneNav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const StyledSvg = styled.svg`
  cursor: pointer;
`;

export default Header;
