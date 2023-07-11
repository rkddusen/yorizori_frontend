import React, { useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const search = () => {
    navigate(`/search?search=`+searchRef.current.value);
  };
  return (
    <>
      <SearchArea>
        <SearchInput type="text" placeholder="요리명, 재료명" ref={searchRef}></SearchInput>
        <SearchSvg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={search}
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </SearchSvg>
      </SearchArea>
    </>
  );
}
const SearchArea = styled.div`
  max-width: 500px;
  width: 100%;
  height: 38px;
  border: 1px solid #00000050;
  border-radius: 10px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 767px) {
    max-width: 400px;
    width: 90vw;
    margin-top: 15px;
  }
`;
const SearchInput = styled.input`
  border: none;
  padding: 0;
  width: 100%;
  margin-left: 5px;
  font-size: 16px;
  line-height: normal;
  &:focus {
    outline: none;
  }
  &::placeholder{
    color: #cccccc;
  }
`;
const SearchSvg = styled.svg`
  margin: 0 8px;
  &:hover {
    cursor: pointer;
  }
`;
export default SearchBar;
