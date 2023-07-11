import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

function Paging(props){
  const { pagingCount } = props;
  const [result, setResult] = useState('');
  const [nowPage, setNowPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const movePage = (num) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('page', num);

    navigate({
      pathname: location.pathname,
      search: queryParams.toString(),
    });
  }
  
  useEffect(() => {
    let paging = [];
    const queryParams = new URLSearchParams(location.search);
    let nowPage = Number(queryParams.get('page')) || 1;

    let pageStart = Math.floor((nowPage - 1) / 5) * 5 + 1;
    let pageEnd = (pageStart + 4) < pagingCount ? (pageStart + 4) : pagingCount;
    for(let i = pageStart; i <= pageEnd; i++){
      paging.push(
        <PagingNumber>
          <PagingButton checked={i === nowPage ? true : false} onClick={() => movePage(i)}>
            {i}
          </PagingButton>
        </PagingNumber>
      )
    }
    setResult(paging);
    setNowPage(nowPage);
  },[location]);

  return(
    <StyledPaging>
      <PagingMoveButton isGray={nowPage === 1 ? true : false} onClick={() => nowPage === 1 ? null : movePage(nowPage - 1)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </PagingMoveButton>
      <PagingList>
        {result}
      </PagingList>
      <PagingMoveButton isGray={nowPage === pagingCount ? true : false} onClick={() => nowPage === pagingCount ? null : movePage(nowPage + 1)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      </PagingMoveButton>
    </StyledPaging>
  );
}

const StyledPaging = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const PagingList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const PagingNumber = styled.li`
  width: 35px;
  height: 35px;
  margin: 2px;
`;

const PagingMoveButton = styled.button`
  width: 35px;
  height: 35px;
  margin: 2px;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  stroke-width: 1;
  ${props => props.isGray ? 
  `
    stroke: #dddddd;
  `
  :
  `
    stroke: #111111;
    &:hover{
      cursor: pointer;
      stroke: black;
    }
  `
  }
  
`;
const PagingButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 0px;
  background: none;
  border: none;
  border-radius: 5px;
  border: 1px solid ${props => props.checked ? '#FFA800' : 'none'};
  color: ${props => props.checked ? '#FFA800' : 'black'};
  font-size: 16px;
  text-align: center;
  cursor: pointer;
`;
export default Paging;