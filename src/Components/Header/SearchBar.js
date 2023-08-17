import React, { useRef, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

const Circle = ({size=16, color="#000000"}) => (<svg xmlns="http://www.w3.org/2000/svg" style={{marginRight: '5px'}} width={size} height={size} viewBox="0 0 24 24" fill="white" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>);
const CheckCircle = ({size=16, color="#000000"}) => (<svg xmlns="http://www.w3.org/2000/svg" style={{marginRight: '5px'}} width={size} height={size} viewBox="0 0 24 24" fill="white" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>);

function SearchBar(props) {
  const { strokeWidth, isOpen, setIsOpen } = props;
  const [isRemoveModal, setIsRemoveModal] = useState(true);
  const [type, setType] = useState('food');
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  const openSearch = () => setIsOpen(true);
  const closeSearch = () => setIsOpen(false);
  const changeType = (str) => setType(str);

  const search = () => {
    navigate(`/search?search=${searchRef.current.value}&method=${type}`);
  };
  useEffect(() => {
    setIsOpen(false);
    setIsRemoveModal(true);
  }, [location]);

  const handleEnterKey = (event) => {
    if(event.key === 'Enter'){
      search();
    }
  }
  useEffect(() => {
    if (isOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if(scrollBarWidth > 0){
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
      setIsRemoveModal(false);
    } else {
      const timer = setTimeout(() => {
        setIsRemoveModal(true);
      }, 500)
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0';
      setType('food');
    };
  }, [isOpen]);

  useEffect(() => {
    if(!isRemoveModal) searchRef.current?.focus();
  },[isRemoveModal])

  return (
    <>
    {
      isRemoveModal ? (
        <SearchSvg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" onClick={openSearch}>
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </SearchSvg>
      ) : (
        <SearchArea $isopen={isOpen} $isremovemodal={isRemoveModal}>
          <SearchModal $isopen={isOpen}>
            <div>
              <Contents>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" onClick={closeSearch}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </div>
                <div>
                  <SearchType>
                    <div onClick={() => changeType('food')}>{type === 'food' ? <CheckCircle /> : <Circle />}요리명 검색</div>
                    <div onClick={() => changeType('ingredient')}>{type === 'ingredient' ? <CheckCircle /> : <Circle />}재료명 검색</div>
                  </SearchType>
                  <SearchBox>
                    <SearchInput type="text" placeholder="요리명, 재료명" ref={searchRef} onKeyDown={handleEnterKey} />
                    <SearchSvg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#FFA800" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" onClick={search}>
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </SearchSvg>
                  </SearchBox>
                  <SearchExplain>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" style={{marginRight: '5px'}} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    </div>
                    <div>
                      <p>이렇게 검색해보세요!</p>
                      <br />
                      <p>요리명 검색</p>
                      <p>ex) 제육볶음</p>
                      <p>ex) 파스타</p>
                      <br />
                      <p>재료명 검색</p>
                      <p>ex) 달걀</p>
                      <p>ex) 소세지, 케첩, 설탕, 양파</p>
                    </div>
                  </SearchExplain>
                </div>  
              </Contents>
            </div>
          </SearchModal>
        </SearchArea>
      )
    }
    </>
  );
}

const SearchSvg = styled.svg`
  margin: 0 10px;
  &:hover {
    cursor: pointer;
    stroke: #FFA800;
  }
`;
const SearchArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000099;
  overflow-y: ${props => props.$isopen ? 'scroll' : 'hidden'};
  visibility: ${props => props.$isopen ? 'visible' : 'hidden'};
  ${props => !props.$isopen ? `
    transition-property: visibility;
    transition-delay: 0.5s` 
    : null
  };
  display: ${props => props.$isremovemodal ? 'none' : 'block'};
  &:hover{
    cursor: initial;
    color: black;
  }
`;
const SearchDown = keyframes`
  0% {
    margin-top: -400px;
  }
  100% {
    margin-top: 0px;
  }
`;
const SearchUp = keyframes`
  0% {
    margin-top: 0px;
  }
  100% {
    margin-top: -400px;
  }
`;
const SearchModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 400px;
  background-image: url("./images/background.png");
  background-size: cover;
  background-position: center;
  animation-name: ${props => props.$isopen ? SearchDown : SearchUp};
  animation-duration: 0.5s;
  animation-delay: 0s;
  animation-fill-mode: backwards;
  animation-timing-function: ease-in-out;
  & > div{
      position: relative;
      width: 100%;
      height: 100%;
    &::before{
      content: "";
      background-color: #FFEAC2;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.7;
    }
  }
`;
const Contents = styled.div`
  width: 90%;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 40px 0;
  box-sizing: border-box;
  position: relative;

  & > div:first-child{
    display: flex;
    justify-content: end;
    align-items: center;
    height: 40px;
    & > svg:hover{
      cursor: pointer;
    }
  }
  @media screen and (max-width: 767px){
    max-width: 400px;
  }
`;
const SearchType = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
  & > div{
    margin: 0 10px;
    display: flex;
    align-items: bottom;
    &:hover{
      cursor: pointer;
    }
  }
`;
const SearchBox = styled.div`
  max-width: 600px;
  width: 100%;
  height: 50px;
  //border: 2px solid #FFA800;
  border-radius: 10px;
  display: flex;
  align-items: center;
  background-color: white;
  margin: 0 auto;
  @media screen and (max-width: 767px) {
    max-width: 400px;
    width: 90vw;
    margin-top: 10px;
  }
`;
const SearchInput = styled.input`
  border: none;
  padding: 0;
  width: 100%;
  margin-left: 5px;
  font-size: 18px;
  line-height: normal;
  &:focus {
    outline: none;
  }
  &::placeholder{
    color: #cccccc;
  }
`;
const SearchExplain = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding-top: 20px;
  padding-left: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: start;
  font-size: 14px;
  & > div > p{
    line-height: 1.3;
    &:first-child{
      line-height: 1;
    }
  }
`;
export default SearchBar;
