import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

const RecipeReadPage = () => {
  const [recipeData, setRecipeData] = useState(null);
  const [mainIngredient, setMainIngredient] = useState([]);
  const [semiIngredient, setSemiIngredient] = useState([]);
  const [recipeOrder, setRecipeOrder] = useState([]);
  const params = useParams();

  useEffect(() => {
    let _recipeData = {
      id: params,
      img: "/images/recipe/레시피0.jpg",
      title: "소떡소떡",
      level: "상",
      time: "25분",
      profileImg: "/images/profile/sample.png",
      nickname: "duyyaa",
      date: "0000-00-00",
      explain: `말랑말랑하면서도 쫀득쫀득한 떡과 짭조름한 비엔나 소시지에 달콤한 양념을 바른 소떡소떡! 특히 아이들이 정말 사랑하는 간식이죠. 떡과 비엔나를 번갈아 먹을 수도 있고, 함께 먹을 수도 있어 먹는 재미까지 쏠쏠한 음식이에요. 오븐에 구워 바삭함을 더한 다음 특제 소스를 발라 주면 더 특별한 소떡소떡이 탄생하는데요. 쉽고 간편한 간식으로 추천합니다!`,
      mainIngredient: [
        { name: "떡볶이 떡", detail: "16개", },
        { name: "비엔나 소시지", detail: "16개", },
        { name: "다진 견과류", detail: "1큰술", },
        { name: "꼬치", detail: "8개", },
        { name: "파슬리 가루", detail: "약간", },
        { name: "식용유", detail: "약간", },
      ],
      semiIngredient: [
        { name: "스위트 칠리소스", detail: "1큰술", },
        { name: "케찹", detail: "1큰술", },
        { name: "올리고당", detail: "2큰술", },
        { name: "고추장", detail: "1큰술", },
        { name: "간장", detail: "1/2작은술", },
        { name: "다진 마늘", detail: "1/2작은술", },
      ],
      order: [
        { contents: `용기에 떡볶이 떡을 담고 잠기도록 물을 넣어주세요. 법랑 접시에 석쇠를 놓고 내열 용기를 올려 1단에 넣고 <레인지> 기능으로 3분 정도 익혀주세요. 말랑말랑해진 떡은 물기를 빼서 준비해 주세요.(tip. 떡이 말랑말랑한 상태가 되어야 꼬치에 잘 꽂혀요)`,
          img: `/images/recipe/레시피1.jpg`, },
        { contents: `볼에 소스 재료를 넣어 섞어주세요.`,
          img: `/images/recipe/레시피2.jpg`, },
        { contents: `꼬치에 떡과 소시지를 번갈아 가며 끼워주세요. 남은 꼬치 부분을 알루미늄 포일로 감싸주세요.`,
          img: `/images/recipe/레시피3.jpg`, },
        { contents: `구이 전용 팬에 소떡소떡을 올린 후 기름을 골고루 발라 4단에 넣고 광파오븐 자동 요리 <에어프라이>에서 <두부강정> 1모 분량을 선택해 조리해 주세요. 조리가 시작되면 조절 기능으로 시간을 10분으로 변경해주세요.(tip. “오븐에 전송" 버튼을 누르면 시간을 조절할 필요 없이 간단하게 설정할 수 있어요)`,
          img: `/images/recipe/레시피4.jpg`, },
        { contents: `완성된 소떡소떡을 소스에 버무려 완성해 주세요. 소떡소떡을 접시에 담고 다진 견과류와 파슬리를 뿌려 맛있게 즐겨주세요.`,
          img: `/images/recipe/레시피5.jpg`, },
      ],
    };
    setRecipeData(_recipeData);
  }, []);

  useEffect(() => {
    if(recipeData){
      let _mainIngredient = [];
      for(let i = 0; i < recipeData.mainIngredient.length; i++){
        _mainIngredient.push(
          <IngredientList key={i}>
            <p>{recipeData.mainIngredient[i].name}</p>
            <p>{recipeData.mainIngredient[i].detail}</p>
          </IngredientList>
        );
      }
      setMainIngredient(_mainIngredient);

      let _semiIngredient = [];
      for(let i = 0; i < recipeData.semiIngredient.length; i++){
        _semiIngredient.push(
          <IngredientList key={i}>
            <p>{recipeData.semiIngredient[i].name}</p>
            <p>{recipeData.semiIngredient[i].detail}</p>
          </IngredientList>
        );
      }
      setSemiIngredient(_semiIngredient);

      let _recipeOrder = [];
      for(let i = 0; i < recipeData.order.length; i++){
        _recipeOrder.push(
          <RecipeOrder>
            <RecipeOrderDetailArea>
              <p>Step {i+1}</p>
              <p>{recipeData.order[i].contents}</p>
            </RecipeOrderDetailArea>
            <RecipeOrderImgArea>
              <div>
                <img src={recipeData.order[i].img}/>
              </div>
            </RecipeOrderImgArea>
          </RecipeOrder>
        );
      }
      setRecipeOrder(_recipeOrder);


    }
  }, [recipeData])

  return (
    <div>
      <Wrap>
        <Header />
        <StyledBody>
          <Contents>
            <RecipeContents>
            <RecipeTitle>
              <Thumbnail src={recipeData?.img} />
              <Title>{recipeData?.title}</Title>
              <SubTitle>
                <Level>난이도</Level>
                <Levels level={recipeData?.level === '하'}>하</Levels>
                <Levels level={recipeData?.level === '중'}>중</Levels>
                <Levels level={recipeData?.level === '상'}>상</Levels>
                <Time>소요시간</Time>
                <Time>{recipeData?.time}</Time>
              </SubTitle>
              <Explain>
                <Profile>
                  <ProfileImg src={recipeData?.profileImg} />
                  <ProfileNickname>{recipeData?.nickname}</ProfileNickname>
                </Profile>
                <ExplainMain>{recipeData?.explain}</ExplainMain>
                <ExplainDate>등록 {recipeData?.date}</ExplainDate>
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
                <ul>{mainIngredient}</ul>
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
