import React from 'react';
import { useUserContext } from '../../contexts/UserContext';
import { styled } from 'styled-components';

const MyProfile = () => {
  const { user } = useUserContext();

  return (
    <>
      <StyledMyProfile>
        <div>
          <ProfileImg src={user.profileImg} />
          <NickName>{user.nickName}</NickName>
        </div>
        <div>
          <ProfileInfo>
            <ProfileBox>
              <BasicInfo>기본 정보</BasicInfo>
              <BasicCol>
                <BasicRow>
                  <div>
                    <BasicInfoImg src={user.profileImg} />
                    <BasicInfoNickName>{user.nickName}</BasicInfoNickName>
                  </div>
                  <div>
                    <ChangeBtn>사진 변경</ChangeBtn>
                    <ChangeBtn>닉네임 변경</ChangeBtn>
                  </div>
                </BasicRow>
              </BasicCol>
              <BasicCol>
                <BasicRow>
                  <div>
                    <p>성별</p><p>{user.gender}</p>
                  </div>
                  <div>
                    <ChangeBtn>변경</ChangeBtn>
                  </div>
                </BasicRow>
                <BasicRow>
                  <div>
                    <p>연령대</p><p>{user.age}</p>
                  </div>
                  <div>
                    <ChangeBtn>변경</ChangeBtn>
                  </div>
                </BasicRow>
              </BasicCol>
              <BasicCol>
                <BasicRow>
                  <div>
                    <p>개인 정보 수집 동의(?)</p>
                  </div>
                  <div>
                    <StyledSvg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFA800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></StyledSvg>
                  </div>
                </BasicRow>
              </BasicCol>
            </ProfileBox>
            <DropOut>회원 탈퇴 {'>'}</DropOut>
          </ProfileInfo>
        </div>
      </StyledMyProfile>
    </>
  );
}

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
const ProfileImg = styled.img`
  width: 250px;
  margin: 0 auto;
  text-align: center;
  border-radius: 100%;
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
const BasicInfo = styled.p`
  font-size: 14px;
  color: #555555;
  text-align: start;
`;
const BasicCol = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid rgba(255,168,0,0.3);
  &:last-child{
    border-bottom: none;
  }
`;
const BasicRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;

  & > div{
    display: flex;
    justify-content: start;
    align-items: center;
  }
  & > div > p:first-child{
    margin-right: 10px;
    font-weight: bold;
  }
`;
const BasicInfoImg = styled.img`
  width: 60px;
  border-radius: 100%;
`;
const BasicInfoNickName = styled.p`
  font-weight: bold;
  font-size: 24px;
  margin-left: 10px;
`;
const ChangeBtn = styled.button`
  background-color: #FFFDF9;
  color: black;
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid rgba(255,168,0,0.3);
  border-radius: 5px;
  font-size: 14px;
  &:hover{
    cursor: pointer;
  }
`;
const StyledSvg = styled.svg`
  margin: 0 5px;
  &:hover{
    cursor: pointer;
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