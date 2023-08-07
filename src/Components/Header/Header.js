import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import styled from "styled-components";
import { useUserContext } from '../../contexts/UserContext';
import SearchBar from "./SearchBar";
import Menus from "./Menus";
import ShortMenus from './ShortMenus';
import ProfileBox from './ProfileBox';
import { ProfileImgClickable } from '../ProfileImg'

function Header() {
  const { user } = useUserContext();
  const [shortMenusOpen, setShortMenusOpen] = useState(false);
  const [profileBoxOpen, setProfileBoxOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const boxRef = useRef(null);

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
  const moveLoginPage = () => {
    navigate(`/login`);
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

  return (
    <StyledHeader>
      <StyledHeaderDesktop>
        <a onClick={movePage}>
          <img src={process.env.PUBLIC_URL + '/images/logo.png'} height="28px" alt="logo" />
        </a>
        <DesktopNav>
          <SearchBar />
          <Menus profileBoxOpen={profileBoxOpen} setProfileBoxOpen={setProfileBoxOpen} />
        </DesktopNav>
      </StyledHeaderDesktop>
      <StyledHeaderPhone>
        <PhoneNav>
          <a onClick={movePage} style={{height: "25px"}}>
            <img src={process.env.PUBLIC_URL + '/images/logo.png'} height="20px" alt="logo" />
          </a>
          <PhoneDetail>
            {
              user.id ? 
              (
                <StyledProfileList ref={boxRef}>
                  <ProfileImgClickable src={user.profileImg} onClick={OnBoxClickHandler} style={{width:'32px', marginRight: '10px'}} />
                  <ProfileBox profileBoxOpen={profileBoxOpen} />
                </StyledProfileList>
              ) : 
              (
                <LoginBtn onClick={moveLoginPage}>로그인</LoginBtn>
              )
            }
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
          </PhoneDetail>
          <ShortMenus shortMenusOpen={shortMenusOpen} setShortMenusOpen={setShortMenusOpen} />
        </PhoneNav>
        <SearchBar />
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
  position: relative;
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
  position: relative;
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
const PhoneDetail = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const StyledSvg = styled.svg`
  cursor: pointer;
`;
const StyledProfileList = styled.div`
  display: none;
  @media screen and (max-width: 767px){
    display: block;
  }
`;
// const ProfileImg = styled.img`
//   width: 32px;
//   margin-right: 10px;
//   border-radius: 100%;
//   &:hover{
//     cursor: pointer;
//   }
// `;
const LoginBtn = styled.button`
  font-size: 12px;
  padding: 5px 10px;
  background-color: #FFA800;
  color: white;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  &:hover{
    cursor: pointer;
  }
`;

export default Header;
