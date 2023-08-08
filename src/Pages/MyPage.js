import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from 'react-router-dom';
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import PageExplain from '../Components/PageExplain';
import MyRecipe from '../Components/MyPage/MyRecipe';
import MyTip from '../Components/MyPage/MyTip';
import MyProfile from '../Components/MyPage/MyProfile';

function MyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [nowPage, setNowPage] = useState(<MyProfile />);
  const [nowQuery, setNowQuery] = useState('mypage');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    let _nowPage = '';
    if(queryParams.get('view') === 'myrecipe') {
      _nowPage = <MyRecipe />;
      setNowQuery('myrecipe');
    }
    else if(queryParams.get('view') === 'mytip') {
      _nowPage = <MyTip />;
      setNowQuery('mytip');
    }
    else {
      _nowPage = <MyProfile />;
      setNowQuery('mypage');
    }

    setNowPage(_nowPage);
  },[location]);

  const movePage = (view) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('view', view);
    queryParams.delete('page');
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
          <PageExplain title="MY PAGE" explain=""/>
          <div>
            <MypageUl>
              <MypageLi onClick={() => movePage('mypage')} checked={nowQuery === 'mypage'}>내 프로필</MypageLi>
              <MypageLi onClick={() => movePage('myrecipe')} checked={nowQuery === 'myrecipe'}>나의 레시피</MypageLi>
              <MypageLi onClick={() => movePage('mytip')} checked={nowQuery === 'mytip'}>나의 팁</MypageLi>
            </MypageUl>
            <div>
              {nowPage}
            </div>
          </div>
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

const MypageUl = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 100px;
  margin-top: -50px;
`;
const MypageLi = styled.li`
  width: 110px;
  font-size: 18px;
  text-align: center;
  padding: 10px 0;
  margin: 0 20px;
  border-bottom: ${props => props.checked ? '2px solid #FFA800' : 'none'};
  color: ${props => props.checked ? '#FFA800' : 'black'};
  &:hover{
    cursor: pointer;
  }
  @media screen and (max-width: 767px) {
    width: 90px;
    font-size: 14px;
    margin: 0 15px;
  }
`;

export default MyPage;
