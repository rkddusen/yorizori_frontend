import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { Star } from "../Components/Evaluation";
import { useUserContext } from '../contexts/UserContext';
import { ProfileImg } from '../Components/ProfileImg';
import EditButton from '../Components/EditButton';

const RecipeReadPage = () => {
  const [recipe, setRecipe] = useState(null);
  const [review, setReview] = useState(null);
  const [mainIngredient, setMainIngredient] = useState([]);
  const [semiIngredient, setSemiIngredient] = useState([]);
  const [recipeOrder, setRecipeOrder] = useState([]);
  const [star, setStar] = useState([0,0,0,0,0]);
  const params = useParams();
  const textRef = useRef(null);
  const { user } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosUrl = process.env.REACT_APP_AXIOS_URL;
  const [referenceOpen, setReferenceOpen] = useState(false);

  const getRecipe = async () => {
    const res = await axios.get(`${axiosUrl}/recipe/get/details?recipeId=${params.id}&userId=${user.id}`);
    console.log(res)
    try {
      let _recipe = {};
      _recipe.id = res.data.id;
      _recipe.thumbnail = res.data.thumbnail;
      _recipe.title = res.data.title;
      _recipe.dishName = res.data.dishName;
      _recipe.level = res.data.level;
      _recipe.time = res.data.time;
      _recipe.profileImg = res.data.profileImg;
      _recipe.recipeUserTokenId = res.data.recipeUserTokenId;
      _recipe.nickname = res.data.nickname;
      _recipe.date = res.data.date;
      _recipe.explain = res.data.explain;
      _recipe.mainIngredient = res.data.mainIngredient;
      _recipe.semiIngredient = res.data.semiIngredient;
      _recipe.order = res.data.order;
      _recipe.category = res.data.category;
      _recipe.viewCount = res.data.viewCount;
      _recipe.referenceRecipe = res.data.referenceRecipe;
      setRecipe(_recipe);
    } catch {
      console.log("오류");
    }
  };
  useEffect(() => {
    getRecipe();
    getReview();
  }, [location]);

  useEffect(() => {
    if (recipe) {
      let _mainIngredient = [];
      if (recipe.mainIngredient.length > 0) {
        for (let i = 0; i < recipe.mainIngredient.length; i++) {
          _mainIngredient.push(
            <IngredientList key={i}>
              <p>{recipe.mainIngredient[i].name}</p>
              <p>{recipe.mainIngredient[i].size}</p>
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
              <p>{recipe.semiIngredient[i].size}</p>
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
              <p>{recipe.order[i].detail}</p>
            </RecipeOrderDetailArea>
            {
              recipe.order[i].image ? (
                <RecipeOrderImgArea>
                  <div>
                    <img
                      src={process.env.REACT_APP_IMG_URL + recipe.order[i].image}
                    />
                  </div>
                </RecipeOrderImgArea>
              ) : (
                null
              )
            }
            
          </RecipeOrder>
        );
      }
      setRecipeOrder(_recipeOrder);
    }
  }, [recipe]);

  const getStar = (num) => {
    let _star = [0, 0, 0, 0, 0];
    for(let i = 0; i < num; i++){
      _star[i] = 1;
    }
    setStar(_star);
  }

  const saveReview = () => {
    let content = {};
    content['starCount'] = star.lastIndexOf(1) + 1;
    content['text'] = textRef.current.value;
    content['userTokenId'] = user.id;
    if(content['userTokenId']){
      if(content['starCount'] > -1 && content['text'].length > 0 && content['text'].length <= 255){
        axios.post(`${axiosUrl}/user/save/review/${params.id}`, content)
        .then(() => {
          let _star = [0,0,0,0,0];
          setStar(_star);
          textRef.current.value = null;
          getReview();
        })
        .catch(() => {
          console.log('오류');
        });
      } else if(content['starCount'] > -1 && content['text'].length > 255){
        window.alert('댓글은 최대 255자입니다.');
      } else {
        window.alert('평가가 덜 됐습니다. 별점과 댓글 둘 다 입력해주세요.');
      }
    } else {
      window.alert('로그인이 필요한 기능입니다.');
    }
  }
  const getReview = async () => {
    const res = await axios.get(`${axiosUrl}/recipe/get/reviews/${params.id}`);
    try {
      let _review = {};
      _review.recipeStarCount = res.data.recipeStarCount;
      _review.userStarCount = res.data.userStarCount;
      _review.reviewCount = res.data.reviewCount;
      _review.reviews = res.data.reviews;
      setReview(_review);
    } catch {
      console.log("오류");
    }
  }

  const handleDelete = async () => {
    if(window.confirm('레시피를 삭제하시겠습니까?')){
      const res = await axios.delete(`${axiosUrl}/recipe/delete/${params.id}`);
      try {
        alert('삭제가 완료되었습니다.');
        navigate(-1);
      } catch {
        console.log("오류");
      }
    }
  }
  const handleReferenceWriting = () => {
    navigate(`/writing?mode=recipe&method=reference&origin=${recipe.id}`);
  }
  const handleEditing = () => {
    navigate(`/writing?mode=recipe&method=edit&origin=${recipe.id}`);
  }

  const moveRestaurant = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        navigate(`/restaurant?dish=${recipe.dishName || ""}`,{state: {latitude: position.coords.latitude, longitude: position.coords.longitude}})
      },
      (error) => {
        window.alert('위치정보를 사용할 수 없습니다.\n브라우저의 위치사용을 허용해 주세요.')
      }
    );
  }
  const moveOtherRecipe = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  }

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
                    <SubTitleName>음식 이름</SubTitleName>
                    <SubTitleContent>
                    {recipe?.dishName ? (
                      <>{recipe.dishName}</>
                    ) : (
                      <>등록된 요리 이름이 없습니다.</>
                    )}
                    </SubTitleContent>
                    <RestaurantBtn onClick={moveRestaurant}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/></svg>
                      식당 조회
                    </RestaurantBtn>
                  </SubTitle>
                <SubTitleFirst>
                  <div>
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
                  </div>
                  <div>
                    <SubTitleName>소요시간</SubTitleName>
                    <SubTitleContent>{recipe?.time}</SubTitleContent>
                  </div>
                </SubTitleFirst>
                <SubTitle>
                  <SubTitleName>카테고리</SubTitleName>
                  <SubTitleContent>
                    {recipe?.category.join(", ")}
                  </SubTitleContent>
                </SubTitle>
                <SubTitle>
                  <Star />
                  <SubTitleContent>
                    {review?.recipeStarCount} ({review?.reviewCount})
                  </SubTitleContent>
                </SubTitle>
                <Explain>
                  <Profile>
                    <div>
                      <ProfileImg src={recipe?.profileImg} style={{width: '35px', height: '35px', marginRight: '10px'}} />
                      <ProfileNickname>{recipe?.nickname}</ProfileNickname>
                    </div>
                    <EditButton mode='recipe' isSelf={user.id === recipe?.recipeUserTokenId} handleDelete={handleDelete} handleReferenceWriting={handleReferenceWriting} handleEditing={handleEditing} />
                  </Profile>
                  <ExplainMain>{recipe?.explain}</ExplainMain>
                  <ExplainMain>
                    {recipe?.referenceRecipe.length ? (
                      <>
                        <ReferenceTitle>
                          <p>Recipe by <span onClick={() => moveOtherRecipe(recipe.referenceRecipe[0].recipeId)}>'{recipe.referenceRecipe[0].nickname}'의 레시피</span></p>
                          <svg onClick={() => setReferenceOpen((prev) => !prev)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                            {!referenceOpen ? <path d="M6 9l6 6 6-6"/> : <path d="M18 15l-6-6-6 6"/>}
                          </svg>
                        </ReferenceTitle>
                        { referenceOpen ? (
                          <ReferenceArea>
                            { recipe.referenceRecipe.map((v, i) => 
                              <div key={i}>
                                { i !== 0 ? (
                                  <p style={{display: 'inline-block', marginLeft: '2.5px'}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V6M5 12l7-7 7 7"/></svg>
                                  </p>
                                ) : (
                                  null
                                )}
                                <ReferenceBox>
                                  <ReferenceProfile>
                                    <ProfileImg src={v.profileImage} style={{width: '25px', height: '25px', marginRight: '10px'}} />
                                    <ReferenceNickname onClick={() => moveOtherRecipe(v.recipeId)}>{v.nickname}</ReferenceNickname>
                                  </ReferenceProfile>
                                  <div>{v.recipeTitle}</div>
                                </ReferenceBox>
                              </div>
                            )}
                          </ReferenceArea>
                        ) : (
                          null
                        )}
                      </>
                    ) : (
                      null
                    )}
                  </ExplainMain>
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
                    <p>댓글</p>
                    <p>{review?.reviewCount}</p>
                  </div>
                </BoxTitle>
                <ReviewExplainBox>
                  <div>
                    <div>
                      <Star size={20} />
                      <p>{review?.recipeStarCount}</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div><p>5</p><progress max={review?.reviewCount} value={review?.userStarCount[0]} /><p>{review?.userStarCount[0]}</p></div>
                      <div><p>4</p><progress max={review?.reviewCount} value={review?.userStarCount[1]} /><p>{review?.userStarCount[1]}</p></div>
                      <div><p>3</p><progress max={review?.reviewCount} value={review?.userStarCount[2]} /><p>{review?.userStarCount[2]}</p></div>
                      <div><p>2</p><progress max={review?.reviewCount} value={review?.userStarCount[3]} /><p>{review?.userStarCount[3]}</p></div>
                      <div><p>1</p><progress max={review?.reviewCount} value={review?.userStarCount[4]} /><p>{review?.userStarCount[4]}</p></div>
                    </div>
                  </div>
                </ReviewExplainBox>
                <ReviewWriteBox>
                  <ReviewStar>
                    <p>별점 : </p>
                    <Star size={24} color={star[0] ? '#FFA800' : '#efefef'} onClick={() => {getStar(1)}} />
                    <Star size={24} color={star[1] ? '#FFA800' : '#efefef'} onClick={() => {getStar(2)}} />
                    <Star size={24} color={star[2] ? '#FFA800' : '#efefef'} onClick={() => {getStar(3)}} />
                    <Star size={24} color={star[3] ? '#FFA800' : '#efefef'} onClick={() => {getStar(4)}} />
                    <Star size={24} color={star[4] ? '#FFA800' : '#efefef'} onClick={() => {getStar(5)}} />
                  </ReviewStar>
                  <ReviewTextArea rows={3} placeholder='댓글을 작성해주세요.' ref={textRef} />
                  <ReviewSubmitBtn onClick={saveReview}>작성</ReviewSubmitBtn>
                </ReviewWriteBox>
                <div>
                  {review?.reviews.map((e, i) => (
                    <ReviewList key={i}>
                      <div>
                        <img src={e.profileImg} />
                      </div>
                      <div>
                        <ReviewListStar>
                          <Star size={18} color={e.starCount >= 1 ? '#FFA800' : '#efefef'} />
                          <Star size={18} color={e.starCount >= 2 ? '#FFA800' : '#efefef'} />
                          <Star size={18} color={e.starCount >= 3 ? '#FFA800' : '#efefef'} />
                          <Star size={18} color={e.starCount >= 4 ? '#FFA800' : '#efefef'} />
                          <Star size={18} color={e.starCount >= 5 ? '#FFA800' : '#efefef'} />
                        </ReviewListStar>
                        <ReviewListProfile>{e.nickname}</ReviewListProfile>
                        <ReviewListContent>{e.review}</ReviewListContent>
                        <ReviewListDate>{e.date}</ReviewListDate>
                      </div>
                    </ReviewList>
                  ))}
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
  @media screen and (max-width: 767px) {
    font-size: 20px;
  }
`;
const SubTitle = styled.div`
  width: 100%;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  & > svg {
    padding: 10px 0;
  }
`;
const SubTitleFirst = styled(SubTitle)`
  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
  & > div{
    display: flex;
    flex-direction: row;
    justify-content: start;
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
const RestaurantBtn = styled.button`
  display: flex;
  align-items: center;
  padding: 5px;
  border: 1px solid #FFA800;
  background-color: white;
  color: #FFA800;
  font-size: 12px;
  font-weight: bold;

  & > svg{
    margin-right: 5px;
    stroke: #FFA800;
  }

  &:hover{
    cursor: pointer;
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
  justify-content: space-between;
  align-items: center;
  & > div:first-child{
    display: flex;
    justify-content: start;
    align-items: center;
  }
`;
// const ProfileImg = styled.img`
//   width: 35px;
//   margin-right: 10px;
// `;
const ProfileNickname = styled.p`
  font-size: 18px;
`;
const ExplainMain = styled.div`
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.2;
`;

const ReferenceTitle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 20px;
  & > p > span:hover{
    cursor: pointer;
    text-decoration: underline;
    text-underline-position: below;
  }
  & > svg{
    margin-left: 5px;
    &:hover{
      cursor: pointer;
    }
  }
`;
const ReferenceArea = styled.div`
  margin: 0 5px 20px 5px;
`;
const ReferenceBox = styled.div`
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  margin: 10px 0;
  &:hover{
    cursor: pointer;
    background-color: #fef8f0;
  }
`;
const ReferenceProfile = styled.div`
  width: 100%;
  margin-bottom: 8px;
  display: flex;
  justify-content: start;
  align-items: center;
`;
const ReferenceNickname = styled.p`
  font-size: 14px;
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
    object-fit: cover;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    margin-top: 10px;
  }
`;

const ReviewExplainBox = styled.div`
  margin-top: 20px;
  background-color: #FFFBF4;
  padding: 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius: 15px;

  & > div:first-child{
    width: 30%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    border-right: 1px solid #aaaaaa;
    & > div{
      display: flex;
      flex-direction: row;
      align-items: baseline;
    }
    & > div > p{
      font-size: 25px;
      margin-left: 5px;
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

const ReviewWriteBox = styled.div`
  margin-top: 30px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #efefef;
  border-radius: 5px;
  padding: 10px;
`;
const ReviewStar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  &>p{
    font-size: 14px;
    margin-right: 5px;
  }
  &>svg:hover{
    cursor: pointer;
  }
`;
const ReviewTextArea = styled.textarea`
  width: 100%;
  margin: 10px 0;
  font-size: 16px;
  border: none;
  outline: none;
  resize: none;
`;
const ReviewSubmitBtn = styled.button`
  border: none;
  border-radius: 5px;
  background-color: #FFA800;
  padding: 5px 10px;
  font-size: 14px;
  color: white;
  &:hover{
    cursor: pointer;
  }
`;
const ReviewList = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-top: 20px;
  padding: 0 10px;
  padding-bottom: 15px;
  border-bottom: 1px solid #efefef;
  display: flex;
  flex-direction: row;

  & > div > img{
    width: 40px;
    height: 40px;
    border-radius: 100%;
    margin-right: 5px;
  }
`;
const ReviewListStar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin-bottom: 5px;
`;
const ReviewListProfile = styled.p`
  margin-bottom: 10px;
  font-size: 10px;
  color: #aaaaaa;
`;
const ReviewListContent = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
`;
const ReviewListDate = styled.p`
  font-size: 12px;
  color: #aaaaaa;
`;
export default RecipeReadPage;
