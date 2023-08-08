import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { Star } from "../Evaluation";
import { useUserContext } from "../../contexts/UserContext";
import { ProfileImg } from "../ProfileImg";

const RecipeWriting = () => {
  const [recipe, setRecipe] = useState(null);
  const [thumbnail, setThumbnail] = useState('');
  const { user } = useUserContext();
  const thumbnailRef = useRef(null);
  const axiosUrl = process.env.REACT_APP_AXIOS_URL;

  const handleThumbnailClick = () => {
    thumbnailRef.current.click();
  };
  const handleThumbnailChange = async (e) => {
    const _thumbnail = e.target.files[0];
    const formData = new FormData();
    formData.append('image', _thumbnail);
    axios.post(`${axiosUrl}/recipe/save/${user.id}`, )
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          console.log(error);
        });
  }

  return (
    <RecipeContents>
      <RecipeTitle>
        <Thumbnail>
          <input type="file" accept="image/*" style={{display: 'none'}} ref={thumbnailRef} onChange={handleThumbnailChange} />
          <img src={thumbnail} onClick={handleThumbnailClick}/>
        </Thumbnail>
        <Title></Title>
        <SubTitle>
          <SubTitleName>난이도</SubTitleName>
          <SubTitleContent $level={recipe?.level === "하"}>하</SubTitleContent>
          <SubTitleContent $level={recipe?.level === "중"}>중</SubTitleContent>
          <SubTitleContent $level={recipe?.level === "상"}>상</SubTitleContent>
          <SubTitleName>소요시간</SubTitleName>
          <SubTitleContent></SubTitleContent>
        </SubTitle>
        <SubTitle>
          <SubTitleName>카테고리</SubTitleName>
          <SubTitleContent></SubTitleContent>
        </SubTitle>
        <SubTitle>
          <Star />
          <SubTitleContent>X.X (XXX)</SubTitleContent>
        </SubTitle>
        <Explain>
          <Profile>
            <ProfileImg
              src={user?.profileImg}
              style={{ width: "35px", marginRight: "10px" }}
            />
            <ProfileNickname>{user?.nickName}</ProfileNickname>
          </Profile>
          <ExplainMain></ExplainMain>
          <ExplainSemi>
            <p>조회수 XX회</p>
            <p>XXXX-XX-XX</p>
          </ExplainSemi>
        </Explain>
      </RecipeTitle>
      <RecipeDetailBox>
        <BoxTitle>
          <p>재료</p>
        </BoxTitle>
        <div>
          <IngredientTitle>주재료</IngredientTitle>
          <ul>
            <IngredientList>
              <p>정보 없음</p>
            </IngredientList>
          </ul>
        </div>
        <div>
          <IngredientTitle>부재료</IngredientTitle>
          <ul>
            <IngredientList>
              <p>정보 없음</p>
            </IngredientList>
          </ul>
        </div>
      </RecipeDetailBox>
      <RecipeDetailBox>
        <BoxTitle>
          <p>레시피</p>
        </BoxTitle>
        <RecipeOrder>
          <RecipeOrderDetailArea>
            <p>Step 0</p>
            <p></p>
          </RecipeOrderDetailArea>
          <RecipeOrderImgArea>
            <div>
              <img />
            </div>
          </RecipeOrderImgArea>
        </RecipeOrder>
      </RecipeDetailBox>
    </RecipeContents>
  );
};

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
  margin-top: 150px;
  @media screen and (max-width: 767px) {
    max-width: 400px;
    margin-top: 130px;
  }
`;

const RecipeContents = styled.div`
  width: 70%;
  margin: 0 auto;
  @media screen and (max-width: 1023px) {
    width: 70%;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;
const RecipeTitle = styled.div`
  width: 100%;
`;
const Thumbnail = styled.div`
  width: 100%;
  border-radius: 10px;
  position: relative;
  padding-bottom: 60%;
  border: 1px solid #dfdfdf;

  & > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
`;
const Title = styled.div`
  width: 100%;
  font-size: 22px;
  text-align: start;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const SubTitle = styled.div`
  width: 100%;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: start;

  & > svg {
    padding: 10px 0;
  }
`;
const SubTitleName = styled.p`
  margin-left: 20px;
  margin-right: 10px;
  padding: 10px 0;
  &:first-child {
    margin-left: 0px;
  }
`;
const SubTitleContent = styled.p`
  margin-right: 5px;
  background-color: ${(props) => (props.$level ? "#FFA800" : "white")};
  color: ${(props) => (props.$level ? "white" : "#888888")};
  border-radius: 100%;
  padding: 10px;
`;

const Explain = styled.div`
  width: 100%;
  margin-top: 20px;
  background-color: #f5f5f5;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 10px;
`;
const Profile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`;
const ProfileNickname = styled.p`
  font-size: 18px;
`;
const ExplainMain = styled.p`
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.2;
`;
const ExplainSemi = styled.div`
  margin-top: 10px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  justify-content: start;
  & > p:first-child {
    margin-right: 10px;
  }
`;

const RecipeDetailBox = styled.div`
  width: 100%;
  margin-top: 50px;
`;
const BoxTitle = styled.div`
  font-size: 22px;
  padding-bottom: 10px;
  border-bottom: 2px solid #ffa800;
  text-align: start;
  display: flex;
  flex-direction: row;
  justify-content: start;

  & > div:first-child {
    display: flex;
    flex-direction: row;
    justify-content: start;

    & > p:first-child {
      margin-right: 10px;
    }
    & > p:last-child {
      color: #ffa800;
    }
  }
`;
const IngredientTitle = styled.p`
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 10px;
`;
const IngredientList = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 10px;
  margin: 0 20px;
  border-bottom: 1px solid #dfdfdf;
  font-size: 14px;
`;

const RecipeOrder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-top: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #ffa80050;
  &:last-child {
    border-bottom: none;
  }

  @media screen and (max-width: 767px) {
    flex-direction: column;
    justify-content: start;
  }
`;
const RecipeOrderDetailArea = styled.div`
  width: 60%;
  box-sizing: border-box;
  padding-right: 20px;

  & > p:first-child {
    font-size: 20px;
    margin-bottom: 10px;
    font-style: italic;
    color: #ffa800;
  }
  & > p:last-child {
    font-size: 16px;
    line-height: 1.2;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    padding-right: 0;
  }
`;
const RecipeOrderImgArea = styled.div`
  width: 40%;
  & > div {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    position: relative;
  }
  & > div > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    margin-top: 10px;
  }
`;

export default RecipeWriting;
