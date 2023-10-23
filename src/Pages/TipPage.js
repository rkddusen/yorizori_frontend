import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import axios from 'axios';
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import TipView from "../Components/TipView"
import Paging from '../Components/Paging'
import PageExplain from '../Components/PageExplain';
import SortingBox from '../Components/SortingBox';

function TipPage() {
  const [result, setResult] = useState([]);
  const [totalTipCount, setTotalTipCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const axiosUrl = process.env.REACT_APP_AXIOS_URL;
  const [sorting, setSorting] = useState('조회순');
  const [getEnd, setGetEnd] = useState(false);

  const getTip = async (page, search) => {
    setGetEnd(false);
    let sortingName = 'recipeViewCount';
    if(sorting === '조회순') sortingName = 'tipViewCount';
    else if(sorting === '댓글순') sortingName = 'tipReviewCount';
    else if(sorting === '좋아요순') sortingName = 'tipHeartCount';
    else if(sorting === '최신순') sortingName = 'createdTime';
    const res = await axios.get(`${axiosUrl}/tip/get/all?search=${search}&pageNo=${page}&orderBy=${sortingName}`);
    try {
      let _result = [];
      for(let i = 0; i < res.data.content.length; i++){
          _result.push(
            <TipView
              key={i}
              tip={
                {
                  id: res.data.content[i].tipId,
                  title: res.data.content[i].tipTitle,
                  thumbnail: res.data.content[i].tipThumbnail,
                  heartCount: res.data.content[i].tipHeartCount,
                  profileImg: res.data.content[i].profileImg,
                  nickname: res.data.content[i].nickname,
                  viewCount: res.data.content[i].tipViewCount,
                }
              }
            />
          )
        }
      setResult(_result);
      setTotalTipCount(res.data.totalElements);
      setGetEnd(true);
    } catch {
      setGetEnd(true);
      console.log("오류");
    }
  };

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const _page = search.get("page") || 1;
    const _search = search.get("search") || "";
    getTip(_page - 1, _search);
  }, [location, sorting]);

  const handleEnterKey = (event) => {
    if(event.key === 'Enter'){
      search();
    }
  }
  const search = () => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('search', searchRef.current.value);

    navigate({
      pathname: location.pathname,
      search: queryParams.toString(),
    });
  }

  return (
    <div>
      <Wrap>
      <Header />
      <StyledBody>
        <Contents>
          <PageExplain title="COOKING TIP" explain="요리에 도움이 될 팁을 살펴보세요!"/>
          <SearchBox>
            <SearchInput type="text" placeholder="팁을 검색하세요." ref={searchRef} onKeyDown={handleEnterKey} />
            <SearchSvg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#FFA800" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" onClick={search}>
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </SearchSvg>
          </SearchBox>
          <SortingBox sorting={sorting} setSorting={setSorting} sortMenu={['조회순', '댓글순', '좋아요순', '최신순']} />
          {getEnd ? (
            <>
              { result.length ? (
                <TipList>
                  {result}
                </TipList>
              ) : (
                <>
                  {/* no Tip */}
                </>
              )}
            </>
          ):(
            <>
              <Loading>
                <img src={process.env.REACT_APP_PUBLIC_URL + '/images/loading.svg'} />
              </Loading>
            </>
          )}
          <Paging pagingCount={Math.ceil(totalTipCount/12)} />
        </Contents>
      </StyledBody>
      </Wrap>
      <Footer />
    </div>
  );
}

const Wrap = styled.div`
  width: 100%;
  height: auto;
  min-height: calc(100vh - 250px - 170px);
`;
const StyledBody = styled.div`
  width: 100%;
`;
const Contents = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 170px;
  @media screen and (max-width: 767px) {
    max-width: 400px;
    margin-top: 130px;
  }
`;
const SearchBox = styled.div`
  max-width: 600px;
  width: 100%;
  padding: 10px 0;
  border: 2px solid #FFA800;
  border-radius: 10px;
  display: flex;
  align-items: center;
  background-color: white;
  margin: 0 auto;
  margin-bottom: 10px;
  @media screen and (max-width: 767px) {
    max-width: 400px;
    width: 90vw;
    margin-top: 10px;
    padding: 5px 0;
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
  @media screen and (max-width: 767px) {
    font-size: 16px;
  }
`;
const SearchSvg = styled.svg`
  margin: 0 10px;
  &:hover {
    cursor: pointer;
    stroke: #FFA800;
  }
`;
const TipList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: left;
  column-gap: 2%;
  word-wrap: normal;
  word-break: break-all;
  @media screen and (max-width: 1023px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Loading = styled.p`
  width: 15%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  & > img{
    width: 100%;
  }
  @media screen and (max-width: 767px) {
    width: 30%;
  }
`;

export default TipPage;
