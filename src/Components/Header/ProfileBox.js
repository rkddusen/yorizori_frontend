import React from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';
import { ProfileImg } from '../ProfileImg';

const ProfileBox = (props) => {
  const { profileBoxOpen, setProfileBoxOpen } = props;
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const moveMypage = () => {
    setProfileBoxOpen(false);
    navigate(`/mypage`);
  }
  const moveWritingPage = () => {
    setProfileBoxOpen(false);
    navigate(`/writing`);
  }

  const logout = () => {
    setUser({
      id: null,
      nickName: null,
      age: null,
      gender: null,
      profileImg: null,
    });
    localStorage.removeItem('user');
  }

  return (
    <StyledProfileBox $profileBoxOpen={profileBoxOpen}>
      <MainArea>
        <InfoArea>
          <ProfileImg src={user.profileImg} style={{width: '40px', height: '40px'}} />
          <NickName>{user.nickName}</NickName>
        </InfoArea>
        <VisitArea>
          <Visit onClick={moveMypage}>
          <StyledSvg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></StyledSvg>
            마이페이지
          </Visit>
          <Visit onClick={moveWritingPage}>
          <StyledSvg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></StyledSvg>
            게시글 등록
          </Visit>
        </VisitArea>
      </MainArea>
      <LogoutArea>
        <Logout onClick={logout}>로그아웃</Logout>
      </LogoutArea>
    </StyledProfileBox>
  );
}
const StyledProfileBox = styled.div`
  position: absolute;
  right: 0;
  top: 90px;
  width: 250px;
  height: 250px;
  z-index: 99;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.25);
  border: 1px solid #dfdfdf;
  display: ${props => props.$profileBoxOpen ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
  cursor: auto;
  @media screen and (max-width: 767px){
    top: 50px;
    right: 0;
  }
`;

const MainArea = styled.div`
  width: 100%;
  background-color: white;
`;
const InfoArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
`;

const NickName = styled.p`
  font-size: 16px;
  margin-left: 10px;
`;
const VisitArea = styled.div`
  width: 100%;
  margin-top: 20px;
`;
const Visit = styled.p`
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #dfdfdf;
  stroke: black;
  &:hover{
    color: #FFA800;
    cursor: pointer;
    stroke: #FFA800;
  }
`;
const StyledSvg = styled.svg`
  margin-right: 5px;
`;
const LogoutArea = styled.div`
  width: 100%;
`;
const Logout = styled.p`
  width: 100%;
  font-size: 14px;
  &:hover{
    cursor: pointer;
    color: #FFA800;
  }
`;


export default ProfileBox;