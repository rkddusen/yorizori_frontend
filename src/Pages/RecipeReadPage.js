import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

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
        _recipe.img = res.data.img;
        _recipe.level = res.data.level;
        _recipe.time = res.data.time;
        _recipe.profileImg = res.data.profileImg;
        _recipe.nickname = res.data.nickname;
        _recipe.date = res.data.date;
        _recipe.explain = res.data.explain;
        _recipe.mainIngredient = res.data.mainIngredient;
        _recipe.semiIngredient = res.data.semiIngredient;
        _recipe.order = res.data.order;
        setRecipe(_recipe);
      } catch {
        console.log("오류");
      }
    };
  useEffect(() => {
    getRecipe();
  }, []);

  useEffect(() => {
    if(recipe){
      let _mainIngredient = [];
      if(recipe.mainIngredient.length > 0){
        for(let i = 0; i < recipe.mainIngredient.length; i++){
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
      for(let i = 0; i < recipe.semiIngredient.length; i++){
        _semiIngredient.push(
          <IngredientList key={i}>
            <p>{recipe.semiIngredient[i].name}</p>
            <p>{recipe.semiIngredient[i].detail}</p>
          </IngredientList>
        );
      }
      setSemiIngredient(_semiIngredient);

      let _recipeOrder = [];
      for(let i = 0; i < recipe.order.length; i++){
        _recipeOrder.push(
          <RecipeOrder>
            <RecipeOrderDetailArea>
              <p>Step {i+1}</p>
              <p>{recipe.order[i].contents}</p>
            </RecipeOrderDetailArea>
            <RecipeOrderImgArea>
              <div>
                <img src={process.env.REACT_APP_IMG_URL + recipe.order[i].img}/>
              </div>
            </RecipeOrderImgArea>
          </RecipeOrder>
        );
      }
      setRecipeOrder(_recipeOrder);


    }
  }, [recipe])

  return (
    <div>
      <Wrap>
        <Header />
        <StyledBody>
          <Contents>
            <RecipeContents>
            <RecipeTitle>
              <Thumbnail src={process.env.REACT_APP_IMG_URL + recipe?.img} />
              <Title>{recipe?.title}</Title>
              <SubTitle>
                <Level>난이도</Level>
                <Levels level={recipe?.level === '하'}>하</Levels>
                <Levels level={recipe?.level === '중'}>중</Levels>
                <Levels level={recipe?.level === '상'}>상</Levels>
                <Time>소요시간</Time>
                <Time>{recipe?.time}</Time>
              </SubTitle>
              <Explain>
                <Profile>
                  <ProfileImg src={process.env.REACT_APP_IMG_URL + recipe?.profileImg} />
                  <ProfileNickname>{recipe?.nickname}</ProfileNickname>
                </Profile>
                <ExplainMain>{recipe?.explain}</ExplainMain>
                <ExplainDate>등록 {recipe?.date}</ExplainDate>
              </Explain>
            </RecipeTitle>
            <RecipeIngredient>
              <p>재료</p>
              <div>
                <IngredientTitle>주재료</IngredientTitle>
                <ul>{mainIngredient}</ul>
              </div>
              <div>
                <IngredientTitle>부재료</IngredientTitle>
                <ul>{semiIngredient}</ul>
              </div>
            </RecipeIngredient>
            <RecipeDetail>
              <p>레시피</p>
              {recipeOrder}
            </RecipeDetail>
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
  margin-top: 170px;
  @media screen and (max-width: 767px) {
    max-width: 400px;
    margin-top: 130px;
  }
`;

const RecipeContents = styled.div`
  width: 60%;
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
const Thumbnail = styled.img`
  width: 100%;
  border-radius: 10px;
`;
const Title = styled.div`
  width: 100%;
  font-size: 22px;
  text-align: start;
  margin-top: 20px;
`;
const SubTitle = styled.div`
  width: 100%;
  margin-top: 10px;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: start;
`;
const Level = styled.p`
  margin-right: 10px;
  padding: 10px 0;
`;
const Levels = styled.p`
  margin-right: 5px;
  background-color: ${props => props.level ? '#FFA800' : 'white'};
  color: ${props => props.level ? 'white' : '#888888'};
  border-radius: 100%;
  padding: 10px;
`;
const Time = styled.p`
  margin-left: 20px;
  padding: 10px 0;
  &:last-child{
    margin-left: 10px;
    color: #888888;
  }
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
const ExplainDate = styled.p`
  margin-top: 10px;
  font-size: 14px;
`;
const RecipeIngredient = styled.div`
  width: 100%;
  margin-top: 50px;
  & > p:first-child{
    font-size: 22px;
    padding-bottom: 10px;
    border-bottom: 2px solid #FFA800;
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
const RecipeDetail = styled.div`
  width: 100%;
  margin-top: 50px;

  & > p:first-child{
    font-size: 22px;
    padding-bottom: 10px;
    border-bottom: 2px solid #FFA800;
  }
`;

const RecipeOrder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-top: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #FFA80050;
  &:last-child{
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
    color: #FFA800
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

export default RecipeReadPage;
