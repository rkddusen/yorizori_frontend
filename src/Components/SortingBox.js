import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const SortingBox = (props) => {
  const { sorting, setSorting, sortMenu } = props;
  const [openDropDown, setOpenDropDown] = useState(false);
  const divRef = useRef(null);

  

  const handleDropDown = () => {
    setOpenDropDown(!openDropDown);
  }
  const handleChangeSelect = (select) => {
    setOpenDropDown(!openDropDown);
    setSorting(select);
  }
  const handleOutsideClick = ({ target }) => {
    if (divRef.current && openDropDown === true && !divRef.current.contains(target)) {
      if(window.getComputedStyle(divRef.current).getPropertyValue('display') !== 'none')
      handleDropDown();
    }
  }
  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    }
  })

  return (
    <StyledSortingBox ref={divRef}>
      <NowSelectBox onClick={handleDropDown}>
        <p>{sorting}</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
      </NowSelectBox>
      <SortingDropDown $openDropDown={openDropDown}>
        {sortMenu.map((v,i) => 
          <SortingItem key={i} onClick={() => handleChangeSelect(v)} $nowChecked={v===sorting}>{v}</SortingItem>
        )}
      </SortingDropDown>
    </StyledSortingBox>
  );
}

const StyledSortingBox = styled.div`
  height: 100%;
  font-size: 12px;
  position: relative;
  z-index: 9;
`;
const NowSelectBox = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 3px;
  font-size: 12px;
  &:hover{
    cursor: pointer;
  }
`;
const NowSelecting = styled.p`
`;
const SortingDropDown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 130px;
  height: auto;
  margin-top: 5px;
  display: ${props => props.$openDropDown ? 'block' : 'none'};
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #dfdfdf;
  overflow: hidden;
`;
const SortingItem = styled.p`
  text-align: end;
  padding: 10px 0;
  padding-right: 10px;
  box-sizing: border-box;
  color: ${props => props.$nowChecked ? '#FFA800' : 'black'};

  &:hover{
    cursor: pointer;
    background-color: #efefef;
  }
`;

export default SortingBox;