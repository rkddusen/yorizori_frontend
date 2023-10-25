import React, { useEffect, useRef, useState } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import { styled } from 'styled-components';
import axios from 'axios';
import { ProfileImg } from '../ProfileImg';
import { useLocation, useNavigate } from 'react-router-dom';

const ProfileChange = () => {
  const { user, setUser } = useUserContext();
  const [nowImg, setNowImg] = useState(null);
  const [gender, setGender] = useState("성별");
  const [age, setAge] = useState("연령대");
  const profileImgRef = useRef(null);
  const nicknameRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const search = new URLSearchParams(location.search);

  const axiosUrl = process.env.REACT_APP_AXIOS_URL;
  
  useEffect(() => {
    setNowImg(user.profileImg);
    setGender(user.gender ? user.gender : '성별');
    setAge(user.age ? user.age : '연령대');
  },[user]);

  const submitProfileChange = () => {
    let nowNickname = nicknameRef.current.value;
    let pattern1 = /[^a-zA-Z0-9가-힣]/g;

    if(nowNickname.length < 1){
      alert("닉네임을 입력하세요.");
    } else if(nowNickname.length > 9){
      alert("(닉네임) 최대 길이는 9자입니다.");
    } else if(pattern1.test(nowNickname)){
      alert("닉네임은 한글, 영어, 숫자만 가능합니다.");
    } else{
      applyProfileChange(nowImg, nowNickname);
    }
  }
  const cancelProfileChange = () => {
    if(nowImg !== user.profileImg && nowImg !== `${process.env.REACT_APP_IMG_URL}/default/defaultProfile.png`){
      deleteProfileImg(nowImg);
    }

    search.delete('ischange');
    navigate({
      pathname: location.pathname,
      search: search.toString(),
    });
  }

  const handleProfileImgClick = () => {
    profileImgRef.current.click();
  };
  const handleProfileImgDelete = () => {
    let defaultImgUrl = process.env.REACT_APP_IMG_URL + '/default/defaultProfile.png';
    let oldImg = nowImg;
    setNowImg(defaultImgUrl);
    if(oldImg !== user.profileImg && oldImg !== `${process.env.REACT_APP_IMG_URL}/default/defaultProfile.png`){
      deleteProfileImg(oldImg);
    }
  }

  const uploadProfileImg = async (e) => {
    const _profileImg = e.target.files[0];
    const fileExtension = _profileImg.name.split('.').pop();
    if(fileExtension.toLowerCase() === 'jpg' || fileExtension.toLowerCase() === 'jpeg' || fileExtension.toLowerCase() === 'png' ){
      const formData = new FormData();
      formData.append("profileImage", _profileImg);
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      axios
        .post(`${axiosUrl}/image/upload/profile`, formData, { headers })
        .then((res) => {
          let oldImg = nowImg;
          let newImg = res.data.data.url;
          setNowImg(newImg);
          if(oldImg !== user.profileImg && oldImg !== `${process.env.REACT_APP_IMG_URL}/default/defaultProfile.png`){
            deleteProfileImg(oldImg);
          }
        })
        .catch((error) => {
          console.log(error);
        });      
    } else{
      alert('jpg, png 형식의 파일만 첨부하실 수 있습니다.');
    }
  };
  const deleteProfileImg = async (img) => {
    axios
      .delete(`${axiosUrl}/profileImage/remove?imageAddress=${img}`)
      .catch((error) => {
        console.log(error);
      });
  }
  const applyProfileChange = async (img, nickname) => {
    let confirm = window.confirm('프로필을 적용하시겠습니까?');
    if(confirm){
      let _age = age === '연령대' ? null : age;
      let _gender = gender === '성별' ? null : gender;
      if((_age === null && _gender !== null) || (_age !== null && _gender === null)){
        alert('성별과 나이는 항상 같이 입력되어야 합니다.');
      } else{
        axios
          .get(`${axiosUrl}/profile/apply?userId=${user.id}&postImage=${img}&postNickname=${nickname}&age=${_age}&gender=${_gender}`)
          .then((res) => {
            if(img !== user.profileImg && user.profileImg !== `${process.env.REACT_APP_IMG_URL}/default/defaultProfile.png`){
              deleteProfileImg(user.profileImg);
            }
    
            let _user = { ...user };
            _user.id = res.data.userTokenId;
            _user.nickName = res.data.nickname;
            _user.age = res.data.age;
            _user.gender = res.data.gender;
            _user.profileImg = res.data.imageAddress;
            setUser(_user);
    
            search.delete('ischange');
            navigate({
              pathname: location.pathname,
              search: search.toString(),
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };
  const handleGenderChange = (event) => {
    console.log(event);
    setGender(event.target.value);
  };
  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <StyledProfileChange>
        <div>
          <ProfileChangeTitle>프로필 편집</ProfileChangeTitle>
          <ProfileInfo>
            <ProfileBox>
              <Col>
                <p>프로필</p>
                <Row>
                  <ProfileImg src={nowImg} style={{width: '150px', height: '150px'}} />
                  <ProfileImgChangeArea>
                    <ChangeBtn onClick={handleProfileImgClick}>사진 선택</ChangeBtn>
                    <input type="file" accept="image/jpeg, image/png" style={{display: 'none'}} ref={profileImgRef} onChange={uploadProfileImg} />
                    <ChangeBtn onClick={handleProfileImgDelete}>삭제</ChangeBtn>
                  </ProfileImgChangeArea>
                </Row>
              </Col>
              <Col>
                <Row>
                  <p>닉네임</p>
                  <ChangeInput type='text' defaultValue={user.nickName || ''} ref={nicknameRef} />
                </Row>
              </Col>
              <Col>
                <Row>
                  <p>성별</p>
                  <SelectInput value={gender} onChange={handleGenderChange}>
                    <option value="성별">성별</option>
                    <option value="남자">남자</option>
                    <option value="여자">여자</option>
                  </SelectInput>
                </Row>
                <Row>
                  <p>연령대</p>
                  <SelectInput value={age} onChange={handleAgeChange}>
                    <option>연령대</option>
                    <option>20대 이하</option>
                    <option>20-29</option>
                    <option>30-39</option>
                    <option>40-49</option>
                    <option>50-59</option>
                    <option>60대 이상</option>
                  </SelectInput>
                </Row>
              </Col>
            </ProfileBox>
            <FinishArea>
              <button onClick={submitProfileChange}>적용</button>
              <button onClick={cancelProfileChange}>취소</button>
            </FinishArea>
          </ProfileInfo>
        </div>
      </StyledProfileChange>
    </>
  );
}

const StyledProfileChange = styled.div`
  width: 100%;
  margin-top: -30px;
  & > div{
    width: 600px;
    margin: 0 auto;
    @media screen and (max-width: 767px) {
      width: 100%;
    }
  }
`;
const ProfileChangeTitle = styled.p`
  font-size: 20px;
  margin-bottom: 20px;
`;
const ProfileInfo = styled.div`
  width: 100%;
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

const Col = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid rgba(255,168,0,0.3);
  &:last-child{
    border-bottom: none;
  }
  & > p{
    margin-bottom: 20px;
    font-size: 16px;
    @media screen and (max-width: 767px) {
      text-align: center;
    }
  }
`;
const Row = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
  min-height: 30px;
  & > p{
    width: 50px;
  }
  
  @media screen and (max-width: 767px) {
    flex-direction: column;
    & > p{
      width: auto;
    }
  }
`;
const AgreeRow = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 10px 0;
  min-height: 30px;
  & > p{
    margin-right: 10px;
  }

  @media screen and (max-width: 767px) {
    justify-content: center;
  }
`;
const ProfileImgChangeArea = styled.div`
  margin-left: 20px;
  @media screen and (max-width: 767px) {
    margin-left: 0;
    margin-top: 20px;
  }
`;
const ChangeBtn = styled.button`
  background-color: white;
  color: black;
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #cfcfcf;
  font-size: 14px;
  font-weight: 600;
  &:hover{
    cursor: pointer;
  }
`;
const ChangeInput = styled.input`
  font-size: 16px;
  border: 1px solid #cfcfcf;
  margin-left: 20px;
  padding: 5px;
  @media screen and (max-width: 767px) {
    margin-left: 0;
    margin-top: 20px;
  }
`;
const SelectInput = styled.select`
  font-size: 16px;
  border: 1px solid #cfcfcf;
  margin-left: 20px;
  padding: 5px;
  @media screen and (max-width: 767px) {
    margin-left: 0;
    margin-top: 20px;
  }
`;

const StyledSvg = styled.svg`
  margin: 0 5px;
  &:hover{
    cursor: pointer;
  }
`;
const FinishArea = styled.div`
  text-align: center;
  margin-top: 20px;
  & > button{
    padding: 8px 25px;
    font-size: 14px;
    margin: 0 5px;
    &:hover{
      cursor: pointer;
    }
  }
  & > button:first-child{
    background-color: #FFA800;
    border: 1px solid #FFA800;
    color: white;
  }
  & > button:last-child{
    background-color: white;
    border: 1px solid #cfcfcf;
    color: black;
  }
`;

export default ProfileChange;