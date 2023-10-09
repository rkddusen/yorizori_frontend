import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';

function NeedLoginPage() {
  const navigate = useNavigate();

  const movePage = () => {
    navigate(`/login`);
  }
  
  const moveBack = () => {
    navigate(-1);
  }
  return (
    <div>
      <Wrap>
        <Header />
        <Contents>
          <NeedLoginBoxContent>
            <NeedLoginSvg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#FFA800" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></NeedLoginSvg>
            <NeedLoginExplain>해당 서비스는 로그인이 필요한 서비스입니다.</NeedLoginExplain>
            <NeedLoginExplain>로그인하러 가시겠습니까?</NeedLoginExplain>
            <ButtonDiv>
              <NeedLoginButton $back={false} onClick={movePage}>로그인</NeedLoginButton>
              <NeedLoginButton $back={true} onClick={moveBack}>뒤로가기</NeedLoginButton>
            </ButtonDiv>
          </NeedLoginBoxContent>
        </Contents>
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

const NeedLoginBoxContent = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding: 80px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

`;
const NeedLoginSvg = styled.svg`
  margin-bottom: 5px;
`;
const NeedLoginExplain = styled.p`
  margin-bottom: 5px;
  @media screen and (max-width: 767px){
    font-size: 14px;
  }
`;
const ButtonDiv = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
`;
const NeedLoginButton = styled.button`
  min-width: 120px;
  background-color: #FFA800;
  border: 1px solid #FFA800;
  border-radius: 20px;
  font-size: 16px;
  margin: 15px 5px 0 5px;
  padding: 10px 20px;
  cursor: pointer;
  color: white;
  background-color: ${props => props.$back ? 'white' : '#FFA800'};
  color: ${props => props.$back ? '#FFA800' : '#white'};
  &:hover{
    opacity: 70%;
  }

  @media screen and (max-width: 767px){
    margin-top: 10px;
    font-size: 12px;
    padding: 8px 15px;
  }
`;

export default NeedLoginPage;
