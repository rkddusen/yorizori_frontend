import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import { styled } from 'styled-components';
import { ProfileImg } from '../ProfileImg';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileChange from './ProfileChange';

const MyProfile = () => {
  const { user } = useUserContext();
  const [changeForm, setChangeForm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const search = new URLSearchParams(location.search);

  const activeChangeForm = () => {
    search.set("ischange", true);
    navigate({
      pathname: location.pathname,
      search: search.toString(),
    });
  };

  useEffect(() => {
    setChangeForm(search.get('ischange') || false)
  },[location])

  return (
    <>
      {!changeForm ? (
        <StyledMyProfile>
          <div>
            <ProfileImg
              src={user.profileImg}
              style={{
                width: "250px",
                height: "250px",
                margin: "0 auto",
                textAlign: "center",
              }}
            />
            <NickName>{user.nickName}</NickName>
          </div>
          <div>
            <ProfileInfo>
              <ProfileBox>
                <InfoTitle>
                  <p>기본 정보</p>
                  <InfoChangeBtn onClick={activeChangeForm}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                    프로필 변경
                  </InfoChangeBtn>
                </InfoTitle>
                <InfoCol>
                  <BasicRow>
                    <ProfileImg
                      src={user.profileImg}
                      style={{ width: "60px", height: "60px" }}
                    />
                    <BasicInfoNickName>{user.nickName}</BasicInfoNickName>
                  </BasicRow>
                </InfoCol>
                <InfoCol>
                  <BasicRow>
                    <p>성별</p>
                    <p>{user.gender}</p>
                  </BasicRow>
                  <BasicRow>
                    <p>연령대</p>
                    <p>{user.age}</p>
                  </BasicRow>
                </InfoCol>
                <InfoCol>
                  <AgreeRow>
                    <p>개인 정보 수집 동의(?)</p>
                    <p>동의함</p>
                  </AgreeRow>
                </InfoCol>
              </ProfileBox>
              <DropOut>회원 탈퇴 {">"}</DropOut>
            </ProfileInfo>
          </div>
        </StyledMyProfile>
      ) : (
        <ProfileChange />
      )}
    </>
  );
};

const StyledMyProfile = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  & > div{
    text-align: center;
  }
  @media screen and (max-width: 1023px) {
    flex-direction: column;
  }
`;

const NickName = styled.p`
  font-size: 25px;
  margin-top: 10px;
  margin-bottom: 30px;
  text-align: center;
`;
const ProfileInfo = styled.div`
  width: 600px;
  margin: 0 auto;

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;
const ProfileBox = styled.div`
  width: 100%;
  min-height: 300px;
  border: 1px solid rgba(255,168,0,0.8);
  border-radius: 20px;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 1px 5px 10px rgba(255,168,0,0.1);
`;
const InfoTitle = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  & > p:first-child{
    color: #555555;
  }
`;
const InfoChangeBtn = styled.p`
  display: flex;
  align-items: center;
  stroke: #000000;
    
  & > svg{
    margin-right: 2px;
    stroke: inherit;
  }
  &:hover{
    cursor: pointer;
    color: #aaaaaa;
    stroke: #aaaaaa;
  }
`;
const InfoCol = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid rgba(255,168,0,0.3);
  &:last-child{
    border-bottom: none;
  }
`;
const BasicRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  margin: 10px 0;
  height: 30px;
  & > p:first-child{
    margin-right: 10px;
    font-weight: bold;
  }
`;

const BasicInfoNickName = styled.p`
  font-weight: bold;
  font-size: 24px;
  margin-left: 10px;
`;
const AgreeRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  height: 30px;
  & > p:first-child{
    font-weight: bold;
  }
  & > p:last-child{
    font-size: 12px;
  }
`;
const DropOut = styled.p`
  padding: 20px;
  font-size: 14px;
  color: #555555;
  text-align: start;
  &:hover{
    cursor: pointer;
  }
`;

export default MyProfile;