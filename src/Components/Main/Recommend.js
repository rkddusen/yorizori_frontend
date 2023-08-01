import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';

function Recommend() {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const movePage = () => {
    navigate(`/login`);
  }
  const moveRecommendPage = (str) => {
    navigate(`/recommend?mode=` + str);
  }
  
  return (
    <StyledRecommend>
      <RecommendNav>
        <RecommendTitle>요리조리 <RecommendRed>추천</RecommendRed></RecommendTitle>
      </RecommendNav>
      <RecommendContent>
        {user.id === null ? (
          <NeedLoginBox> {/* 로그인 상태가 아니라면 */}
            <NeedLoginBoxContent>
              <NeedLoginSvg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#FFA800" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></NeedLoginSvg>
              <NeedLoginExplain>로그인이 필요한 서비스입니다.</NeedLoginExplain>
              <NeedLoginButton onClick={movePage}>로그인</NeedLoginButton>
            </NeedLoginBoxContent>
          </NeedLoginBox>
        ) : (
          <RecommendBox> {/* 로그인 상태라면 */}
            <MovingBoxs>
              <MovingBox move={'tr'}>
                <RecImg src={process.env.REACT_APP_PUBLIC_URL + '/images/recommend1.png'}/>
                <p>오늘의 추천</p>
                <button onClick={() => moveRecommendPage('TR')}>바로가기 {'>'}</button>
              </MovingBox>
              <MovingBox move={'pr'}>
                <RecImg src={process.env.REACT_APP_PUBLIC_URL + '/images/recommend2.png'}/>
                <p>사용자 맞춤 추천</p>
                <button onClick={() => moveRecommendPage('PR')}>바로가기 {'>'}</button>
              </MovingBox>
            </MovingBoxs>
          </RecommendBox>
        )}
      </RecommendContent>
    </StyledRecommend>
  );
}

const StyledRecommend = styled.div`
  // margin-top: 50px;
`;

const RecommendNav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;
const RecommendTitle = styled.p`
  font-size: 20px;
`;
const RecommendRed = styled.span`
  color: #FFA800;
`;
// const RecommendMore = styled.p`
//   font-size: 16px;
//   color: #FFA800;
//   &:hover{
//     opacity: 50%;
//     cursor: pointer;
//   }
// `;
const RecommendContent = styled.div`
  margin-bottom: 30px;
`;
const NeedLoginBox = styled.div`
  background-color: #FFF7E8;
  border-radius: 15px;
  width: 100%;
  height: 200px;
  position: relative;
  @media screen and (max-width: 767px){
    margin-bottom: 5px;
  }
`;
const NeedLoginBoxContent = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const NeedLoginSvg = styled.svg`
  margin-bottom: 5px;
`;
const NeedLoginExplain = styled.p`
  @media screen and (max-width: 767px){
    font-size: 14px;
  }
`;
const NeedLoginButton = styled.button`
  width: 100px;
  background-color: #FFA800;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  margin-top: 15px;
  padding: 10px 20px;
  cursor: pointer;
  color: white;
  &:hover{
    opacity: 70%;
  }

  @media screen and (max-width: 767px){
    margin-top: 10px;
    font-size: 12px;
    padding: 8px 15px;
  }
`;

const RecommendBox = styled.div`
  width: 100%;
  padding-bottom: 20%;
  position: relative;

  @media screen and (max-width: 767px){
    padding-bottom: 60%;
  }
`;
const MovingBoxs = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media screen and (max-width: 767px){
    flex-direction: column;
  }
`;
const MovingBox = styled.div`
  position: relative;
  width: 48%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.move === 'tr' ? '#FFE27B' : '#FFD27A'};
  border-radius: 15px;
  overflow: hidden;

  & > p {
    font-size: 20px;
    margin: 15px 0;
    font-weight: 900;
    z-index: 2;
  }
  & > button {
    border: none;
    font-size: 14px;
    padding: 10px 20px;
    border-radius: 50px;
    background-color: black;
    color: white;
    z-index: 2;
    &:hover{
      cursor: pointer;
    }
  }

  @media screen and (max-width: 767px){
    width: 100%;
    height: 48%;
    & > p {
      font-size: 18px;
      margin: 15px 0;
    }
    & > button {
      font-size: 12px;
      padding: 8px 15px;
  }
  }
`;
const RecImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 20%;
  object-fit: cover;
`;

export default Recommend;