import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { Heart } from "../Components/Evaluation";
import { useUserContext } from '../contexts/UserContext';
import { ProfileImg } from '../Components/ProfileImg';
import EditButton from '../Components/EditButton';

const TipReadPage = () => {
  const { user } = useUserContext();
  const [tip, setTip] = useState(null);
  const [review, setReview] = useState(null);
  const [heartCount, setHeartCount] = useState(0);
  const [isHeart, setIsHeart] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const textRef = useRef(null);
  const axiosUrl = process.env.REACT_APP_AXIOS_URL;

  const getTip = async () => {
    const res = await axios.get(`${axiosUrl}/tip/get/details?tipId=${params.id}`);
    try {
      let _tip = {};
      _tip.id = res.data.tipId;
      _tip.thumbnail = res.data.tipThumbnail;
      _tip.title = res.data.tipTitle;
      _tip.profileImg = res.data.profileImg;
      _tip.nickname = res.data.nickname;
      _tip.tipUserTokenId = res.data.tipUserTokenId;
      _tip.date = res.data.date;
      _tip.tipDetail = res.data.tipDetail;
      _tip.viewCount = res.data.tipViewCount;
      setTip(_tip);
    } catch {
      console.log("오류");
    }
  };
  useEffect(() => {
    getTip();
    getReview();
    getIsHeart();
  }, [user]);

  const saveReview = () => {
    let content = {};
    content['text'] = textRef.current.value;
    content['userTokenId'] = user.id;
    if(content['userTokenId']){
      if(content['text'].length > 0){
        axios.post(`${axiosUrl}/user/save/tip/review/${params.id}`, content)
        .then(() => {
          textRef.current.value = null;
          getReview();
        })
        .catch(() => {
          console.log('오류');
        });
      }
      else {
        window.alert('평가가 덜 됐음.')
      }
    } else {
      window.alert('로그인 필요');
    }
  }
  const getReview = async () => {
    const res = await axios.get(`${axiosUrl}/tip/get/reviews/${params.id}`);
    try {
      let _review = {};
      _review.reviewCount = res.data.reviewCount;
      _review.reviews = res.data.reviews;
      setReview(_review);
    } catch {
      console.log("오류");
    }
  }
  const handleHeartClick = () => {
    isHeart ? saveIsHeart(false) : saveIsHeart(true);
  }
  const getIsHeart = async () => {
    if(user.id){
      const res = await axios.get(`${axiosUrl}/user/get/tip/isHeart/${params.id}?userId=${user.id}`);
    try {
      setIsHeart(res.data.heart);
      setHeartCount(res.data.tipHeartCount);
    } catch {
      console.log("오류");
    }
    }
    
  }
  const saveIsHeart = async (bool) => {
    const res = await axios.post(`${axiosUrl}/user/save/tip/isHeart/${params.id}?userId=${user.id}&isHeart=${bool}`);
    try {
      getIsHeart();
    } catch {
      console.log("오류");
    }
  }

  const handleDelete = async () => {
    if(window.confirm('팁을 삭제하시겠습니까?')){
      const res = await axios.delete(`${axiosUrl}/tip/delete/${params.id}`);
      try {
        alert('삭제가 완료되었습니다.');
        navigate(-1);
      } catch {
        console.log("오류");
      }
    }
  }
  // const handleEditing = async () => {
  //   if(window.confirm('팁을 수정하시겠습니까?')){
  //     const res = await axios.post(`${axiosUrl}/tip/update?tipId=${params.id}`);
  //     try {
  //       navigate(`/writing`);
  //     } catch {
  //       console.log("오류");
  //     }
  //   }
  // }
  const handleEditing = () => {
    if(window.confirm('팁을 수정하시겠습니까?')){
      navigate(`/writing?mode=tip&updateId=${params.id}`);
    }
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
                  <img src={process.env.REACT_APP_IMG_URL + tip?.thumbnail} />
                </Thumbnail>
                <Title>{tip?.title}</Title>
                <HeartBox onClick={handleHeartClick}>
                  <Heart size={22} color={isHeart ? '#FFA800' : '#dfdfdf'} />
                  {heartCount}
                </HeartBox>
                <Explain>
                  <Profile>
                    <div>
                      <ProfileImg src={tip?.profileImg} style={{width: '35px', height: '35px', marginRight: '10px'}} />
                      <ProfileNickname>{tip?.nickname}</ProfileNickname>
                    </div>
                    {user.id === tip?.tipUserTokenId ? <EditButton mode='tip' isSelf={true} handleDelete={handleDelete} handleEditing={handleEditing} /> : null}
                    
                  </Profile>
                  <ExplainSemi>
                    <p>조회수 {tip?.viewCount}회</p>
                    <p>{tip?.date}</p>
                  </ExplainSemi>
                </Explain>
              </RecipeTitle>
              <RecipeDetailBox>
                <BoxTitle>
                  <p>팁</p>
                </BoxTitle>
                <TipContent dangerouslySetInnerHTML={{ __html: tip?.tipDetail }} />
              </RecipeDetailBox>
              <RecipeDetailBox>
                <BoxTitle>
                  <div>
                    <p>댓글</p>
                    <p>{review?.reviewCount}</p>
                  </div>
                </BoxTitle>
                <ReviewWriteBox>
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
const HeartBox = styled.button`
  width: 100px;
  height: 40px;
  border: none;
  background-color: #F5F5F5;
  border-radius: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  & > svg{
    margin-right: 10px;
    flex-shrink: 0;
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

const ProfileNickname = styled.p`
  font-size: 18px;
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
const TipContent = styled.div`
  width: 80%;
  margin: 30px auto;
  margin-bottom: 100px;
  line-height: normal;
  color: #333333;
  & h1{
    font-size: 30px;
  }
  & h2{
    font-size: 25px;
  }
  & h3{
    font-size: 18px;
  }
  & p{
    font-size: 14px;
  }
  & ol{
    list-style: decimal;
    list-style-position: inside;
  }
  & ul{
    list-style: inside;
  }
  & strong{
    font-weight: 900;
  }
  & em{
    font-style: italic;
  }
  & u{
    text-decoration: underline;
  }
  & s{
    text-decoration: overline;
  }
  & img{
    width: 100%;
  }
  & blockquote{
    display: block;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 10px;
    margin-right: 10px;
    border-left: 4px solid #ccc;
    padding-left: 16px;
  }
  & pre{
    color: white;
    background-color: black;
    padding: 5px;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
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

export default TipReadPage;
