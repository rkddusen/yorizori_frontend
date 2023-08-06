import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { Star } from "../Components/Evaluation";

const RecipeReadPage = () => {
  const [recipe, setRecipe] = useState(null);
  const [mainIngredient, setMainIngredient] = useState([]);
  const [semiIngredient, setSemiIngredient] = useState([]);
  const [recipeOrder, setRecipeOrder] = useState([]);
  const params = useParams();
  const axiosUrl = process.env.REACT_APP_AXIOS_URL;

  const getRecipe = async () => {
    const res = await axios.get(`${axiosUrl}/recipe/get/details/${params.id}`);
    try {
      let _recipe = {};
      _recipe.id = res.data.id;
      _recipe.thumbnail = res.data.thumbnail;
      _recipe.title = res.data.title;
      _recipe.level = res.data.level;
      _recipe.time = res.data.time;
      _recipe.profileImg = res.data.profileImg;
      _recipe.nickname = res.data.nickname;
      _recipe.date = res.data.date;
      _recipe.explain = res.data.explain;
      _recipe.mainIngredient = res.data.mainIngredient;
      _recipe.semiIngredient = res.data.semiIngredient;
      _recipe.order = res.data.order;
      _recipe.category = res.data.category;
      _recipe.starRate = res.data.starRate;
      _recipe.starCount = res.data.starCount;
      _recipe.viewCount = res.data.viewCount;
      _recipe.reviewCount = res.data.reviewCount;
      setRecipe(_recipe);
    } catch {
      console.log("오류");
    }
  };
  useEffect(() => {
    getRecipe();
  }, []);

  useEffect(() => {
    if (recipe) {
      let _mainIngredient = [];
      if (recipe.mainIngredient.length > 0) {
        for (let i = 0; i < recipe.mainIngredient.length; i++) {
          _mainIngredient.push(
            <IngredientList key={i}>
              <p>{recipe.mainIngredient[i].name}</p>
              <p>{recipe.mainIngredient[i].detail}</p>
            </IngredientList>
          );
        }
      } else {
        _mainIngredient.push(
          <IngredientList key={0}>
            <p>정보 없음</p>
          </IngredientList>
        );
      }
      setMainIngredient(_mainIngredient);

      let _semiIngredient = [];
      if (recipe.semiIngredient.length > 0) {
        for (let i = 0; i < recipe.semiIngredient.length; i++) {
          _semiIngredient.push(
            <IngredientList key={i}>
              <p>{recipe.semiIngredient[i].name}</p>
              <p>{recipe.semiIngredient[i].detail}</p>
            </IngredientList>
          );
        }
      } else {
        _semiIngredient.push(
          <IngredientList key={0}>
            <p>정보 없음</p>
          </IngredientList>
        );
      }
      setSemiIngredient(_semiIngredient);

      let _recipeOrder = [];
      for (let i = 0; i < recipe.order.length; i++) {
        _recipeOrder.push(
          <RecipeOrder key={i}>
            <RecipeOrderDetailArea>
              <p>Step {i + 1}</p>
              <p>{recipe.order[i].contents}</p>
            </RecipeOrderDetailArea>
            <RecipeOrderImgArea>
              <div>
                <img
                  src={process.env.REACT_APP_IMG_URL + recipe.order[i].img}
                />
              </div>
            </RecipeOrderImgArea>
          </RecipeOrder>
        );
      }
      setRecipeOrder(_recipeOrder);
    }
  }, [recipe]);

  return (
    <div>
      <Wrap>
        <Header />
        <StyledBody>
          <Contents>
            <RecipeContents>
              <RecipeTitle>
                <Thumbnail>
                  <img src={process.env.REACT_APP_IMG_URL + recipe?.thumbnail} />
                </Thumbnail>
                <Title>{recipe?.title}</Title>
                <SubTitle>
                  <SubTitleName>난이도</SubTitleName>
                  <SubTitleContent $level={recipe?.level === "하"}>
                    하
                  </SubTitleContent>
                  <SubTitleContent $level={recipe?.level === "중"}>
                    중
                  </SubTitleContent>
                  <SubTitleContent $level={recipe?.level === "상"}>
                    상
                  </SubTitleContent>
                  <SubTitleName>소요시간</SubTitleName>
                  <SubTitleContent>{recipe?.time}</SubTitleContent>
                </SubTitle>
                <SubTitle>
                  <SubTitleName>카테고리</SubTitleName>
                  <SubTitleContent>
                    {recipe?.category.join(", ")}
                  </SubTitleContent>
                </SubTitle>
                <SubTitle>
                  <Star />
                  <SubTitleContent>
                    {recipe?.starRate} ({recipe?.starCount})
                  </SubTitleContent>
                </SubTitle>
                <Explain>
                  <Profile>
                    <ProfileImg src={process.env.REACT_APP_IMG_URL + recipe?.profileImg} />
                    <ProfileNickname>{recipe?.nickname}</ProfileNickname>
                  </Profile>
                  <ExplainMain>{recipe?.explain}</ExplainMain>
                  <ExplainSemi>
                    <p>조회수 {recipe?.viewCount}회</p>
                    <p>{recipe?.date}</p>
                  </ExplainSemi>
                </Explain>
              </RecipeTitle>
              <RecipeDetailBox>
                <BoxTitle>
                  <p>재료</p>
                </BoxTitle>
                <div>
                  <IngredientTitle>주재료</IngredientTitle>
                  <ul>{mainIngredient}</ul>
                </div>
                <div>
                  <IngredientTitle>부재료</IngredientTitle>
                  <ul>{semiIngredient}</ul>
                </div>
              </RecipeDetailBox>
              <RecipeDetailBox>
                <BoxTitle>
                  <p>레시피</p>
                </BoxTitle>
                {recipeOrder}
              </RecipeDetailBox>
              <RecipeDetailBox>
                <BoxTitle>
                  <div>
                    <p>리뷰</p>
                    <p>{recipe?.reviewCount}</p>
                  </div>
                  <div>
                    <p>리뷰작성</p>
                  </div>
                </BoxTitle>
                <ReviewExplainBox>
                  <div>
                    <p>{recipe?.starRate}</p>
                    <div>
                      <Star size={15} /><Star size={15} /><Star size={15} /><Star size={15} /><Star size={15} />
                    </div>
                  </div>
                  <div>
                    <div>
                      <div><p>5</p><progress max={110} value={100} /><p>100</p></div>
                      <div><p>4</p><progress max={110} value={0} /><p>0</p></div>
                      <div><p>3</p><progress max={110} value={0} /><p>0</p></div>
                      <div><p>2</p><progress max={110} value={10} /><p>10</p></div>
                      <div><p>1</p><progress max={110} value={0} /><p>0</p></div>
                    </div>
                  </div>
                </ReviewExplainBox>
                <div>

                </div>
              </RecipeDetailBox>
            </RecipeContents>
          </Contents>
        </StyledBody>
      </Wrap>
      <Footer />
    </div>
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
const ProfileImg = styled.img`
  width: 35px;
  margin-right: 10px;
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
  justify-content: space-between;
  align-items: center;

  & > div:first-child{
    display: flex;
    flex-direction: row;
    justify-content: start;

    & > p:first-child{
      margin-right: 10px;
    }
    & > p:last-child{
      color: #ffa800;
    }
  }
  & > div:last-child{
    font-size: 14px;
    &:hover{
      cursor: pointer;
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

const ReviewExplainBox = styled.div`
  margin-top: 20px;
  background-color: #FFFBF4;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius: 15px;

  & > div:first-child{
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    border-right: 1px solid #aaaaaa;
    & > p{
      font-size: 25px;
      margin-bottom: 5px;
    }
  }
  & > div:last-child{
    width: 70%;
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    & > div{
      margin: 0 auto;

      & > div{
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 2px 0;
        & > p{
          font-size: 14px;
        }
        & > progress{
          margin: 0 10px;
          width: 200px;
          appearance: none;
          height: 10px;
          &::-webkit-progress-bar{
            background-color: #f5f5f5;
            border-radius: 5px;
            border: 1px solid #efefef;
          }
          &::-webkit-progress-value{
            background-color: #FFA800;
            border-radius: 5px;
          }

          @media screen and (max-width: 1023px) {
            width: 150px;
          }
          @media screen and (max-width: 767px) {
            width: 100px;
          }
        }
      }
    }
  }
`;

export default RecipeReadPage;
