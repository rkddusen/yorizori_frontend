import React, { useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { Star } from "../Evaluation";
import { useUserContext } from "../../contexts/UserContext";
import { ProfileImg } from "../ProfileImg";
import { useNavigate } from 'react-router-dom';

const PlusCircle = ({size=16, color="#000000", clickEvent}) => (<Svg onClick={clickEvent} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></Svg>);
const Trash = ({size=16, color="#000000", clickEvent}) => (<Svg onClick={clickEvent} style={{flexShrink: '0'}} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></Svg>);
const Svg = styled.svg`
  cursor: pointer;
`;

const RecipeWriting = () => {
  const { user } = useUserContext();
  const [thumbnail, setThumbnail] = useState('');
  const [thumbnailHover, setThumbnailHover] = useState(false);
  const [recipeInfo, setRecipeInfo] = useState({
    title: null,
    level: null,
    time: null,
    category: null,
    explain: null,
  });
  const [mainIngredient, setMainIngredient] = useState([{}]);
  const [semiIngredient, setSemiIngredient] = useState([{}]);
  const [recipeDetail, setRecipeDetail] = useState([{}]);
  const [recipeImageHover, setRecipeImageHover] = useState([false]);
  const thumbnailRef = useRef(null);
  const recipeImageRef = useRef([]);
  const navigate = useNavigate();
  const axiosUrl = process.env.REACT_APP_AXIOS_URL;

  const handleThumbnailHover = (bool) => {
    setThumbnailHover(bool);
  }
  const handleThumbnailClick = () => {
    if(thumbnail.length > 0) {
      serverImageDelete(thumbnail);
      setThumbnail('');
      thumbnailRef.current.value = null;
    } else thumbnailRef.current.click();
  };
  const serverImageDelete = async (image) => {
    axios
      .get(`${axiosUrl}/image/remove?imageAddress=${image}`)
      .catch((error) => {
        console.log(error);
      });
  };
  const handleThumbnailChange = async (e) => {
    const _recipeImg = e.target.files[0];
    const fileExtension = _recipeImg.name.split('.').pop();
    if(fileExtension.toLowerCase() === 'jpg' || fileExtension.toLowerCase() === 'jpeg' || fileExtension.toLowerCase() === 'png' ){
      const formData = new FormData();
      formData.append('recipeImage', _recipeImg);
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      axios.post(`${axiosUrl}/image/upload/recipe`, formData, { headers })
        .then((res) => {
          setThumbnail(res.data.data.url);
          setThumbnailHover(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else{
      alert('jpg, png 형식의 파일만 첨부하실 수 있습니다.');
    }
  }
  const handleInfoChange = (e, info) =>{
    let _recipeInfo = {...recipeInfo};
    _recipeInfo[info] = e.target.value || '';
    setRecipeInfo(_recipeInfo);
  }
  const handleIngredient = (type, index, field, e) => {
    if(type === 'main'){
      let _mainIngredient = [...mainIngredient];
      _mainIngredient[index][field] = e.target.value;
      setMainIngredient(_mainIngredient);
    } else{
      let _semiIngredient = [...semiIngredient];
      _semiIngredient[index][field] = e.target.value;
      setSemiIngredient(_semiIngredient);
    }
  }
  const handleIngredientDelete = (type, index) => {
    if(type === 'main'){
      let _mainIngredient = [...mainIngredient].filter((_, i) => i !== index);
      setMainIngredient(_mainIngredient);
    } else{
      let _semiIngredient = [...semiIngredient].filter((_, i) => i !== index);
      setSemiIngredient(_semiIngredient);
    }
  }
  const handleRecipeDetail = (index, e) => {
    let _recipeDetail = [...recipeDetail];
    _recipeDetail[index]['text'] = e.target.value;
    setRecipeDetail(_recipeDetail);
  }
  const handleRecipeDetailDelete = (index) => {
    let _recipeDetail = [...recipeDetail].filter((_, i) => i !== index);
    setRecipeDetail(_recipeDetail);
  }
  const handleRecipeImageHover = (index, bool) => {
    let _recipeImageHover = [...recipeImageHover];
    _recipeImageHover[index] = bool;
    setRecipeImageHover(_recipeImageHover);
  }
  const handleRecipeImageClick = (index) => {
    if(recipeDetail[index]['image']){
      let _recipeDetail = [...recipeDetail];
      serverImageDelete(_recipeDetail[index]['image']);
      delete _recipeDetail[index]['image'];
      setRecipeDetail(_recipeDetail);
      recipeImageRef.current[index].value = null;
    } else recipeImageRef.current[index].click();
  }
  const handleRecipeImageChange = (index, e) => {
    const _recipeImg = e.target.files[0];
    const fileExtension = _recipeImg.name.split('.').pop();
    if(fileExtension.toLowerCase() === 'jpg' || fileExtension.toLowerCase() === 'jpeg' || fileExtension.toLowerCase() === 'png' ){
      const formData = new FormData();
    formData.append('recipeImage', _recipeImg);
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    axios.post(`${axiosUrl}/image/upload/recipe`, formData, { headers })
        .then((res) => {
          let _recipeDetail = [...recipeDetail];
          _recipeDetail[index]['image'] = res.data.data.url;
          setRecipeDetail(_recipeDetail);
          let _recipeImageHover = [...recipeImageHover];
          _recipeImageHover[index] = false;
          setRecipeImageHover(_recipeImageHover);
        })
        .catch((error) => {
          console.log(error);
        });
    } else{
      alert('jpg, png 형식의 파일만 첨부하실 수 있습니다.');
    }
  }
  const submitRecipeWriting = async () => {
    let confirm = window.confirm('레시피를 등록하시겠습니까?');
    if(confirm){
      let paramsObject = {
        userId: user.id,
        thumbnail: thumbnail,
        recipeInfo: recipeInfo,
        mainIngredient: mainIngredient,
        semiIngredient: semiIngredient,
        recipeDetail: recipeDetail
      }
      axios
        .post(`${axiosUrl}/recipe/save/details`, paramsObject)
        .then((res) => {
          navigate(`/recipe/${res.data}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  const cancelRecipeWriting = () => {
    let confirm = window.confirm('정말 취소하시겠습니까?');
    if(confirm){
      navigate(-1);
    }
  }

  return (
    <RecipeContents>
      <RecipeTitle>
        <Thumbnail onMouseEnter={() => handleThumbnailHover(true)} onMouseLeave={() => handleThumbnailHover(false)} onClick={handleThumbnailClick}>
          <input type="file" accept="image/*" style={{display: 'none'}} ref={thumbnailRef} onChange={handleThumbnailChange} />
          { thumbnail.length > 0 ? (
            <>
              <ThumbnailDeleteSvg xmlns="http://www.w3.org/2000/svg" $thumbnailhover={thumbnailHover} width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></ThumbnailDeleteSvg>
              <ThumbnailImg src={thumbnail} $thumbnailhover={thumbnailHover} />
            </>
          ) : (
              <ThumbnailSvg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></ThumbnailSvg>
          )}
        </Thumbnail>
        <Title>
          <input type='text' placeholder='요리 제목을 알려주세요.' onChange={(e) => handleInfoChange(e, 'title')}/>
        </Title>
        <SubTitleFirst>
          <div>
            <SubTitleName>난이도</SubTitleName>
            <SubTitleContent>
              <select onChange={(e) => handleInfoChange(e, 'level')}>
                <option>난이도</option>
                <option>하</option>
                <option>중</option>
                <option>상</option>
              </select>
            </SubTitleContent>
          </div>
          <div>
            <SubTitleName>소요시간</SubTitleName>
            <SubTitleContent>
              <select onChange={(e) => handleInfoChange(e, 'time')}>
                <option>시간</option>
                <option>5분 이내</option>
                <option>10분 이내</option>
                <option>30분 이내</option>
                <option>60분 이내</option>
                <option>90분 이내</option>
                <option>2시간 이내</option>
                <option>2시간 이상</option>
              </select>
            </SubTitleContent>
          </div>
        </SubTitleFirst>
        <SubTitle>
          <SubTitleName>카테고리</SubTitleName>
          <SubTitleContent>
            <select onChange={(e) => handleInfoChange(e, 'category')}>
              <option>전체</option>
              <option>한식</option>
              <option>중식</option>
              <option>일식</option>
              <option>양식</option>
              <option>아시안</option>
              <option>분식</option>
              <option>안주</option>
              <option>퓨전</option>
              <option>카페</option>
              <option>편의점</option>
              <option>기타</option>
            </select>
          </SubTitleContent>
        </SubTitle>
        <SubTitle>
          <Star />
          <SubTitleContent>
            0.0 (0)
          </SubTitleContent>
        </SubTitle>
        <Explain>
          <Profile>
            <ProfileImg
              src={user?.profileImg}
              style={{ width: "35px", height: "35px", marginRight: "10px" }}
            />
            <ProfileNickname>{user?.nickName}</ProfileNickname>
          </Profile>
          <ExplainMain>
            <ExplainTextArea rows={5} placeholder='요리를 소개해주세요.' onChange={(e) => handleInfoChange(e, 'explain')} />
          </ExplainMain>
        </Explain>
      </RecipeTitle>
      <RecipeDetailBox>
        <BoxTitle>
          <p>재료</p>
        </BoxTitle>
        <div>
          <IngredientTitle>주재료</IngredientTitle>
          <ul>
          {mainIngredient.map((value, index) => (
              <IngredientList key={index} $last={mainIngredient.length === 1 ? true : false}>
                <input type='text' placeholder='주재료를 알려주세요.' value={value['name'] || ''} onChange={e => handleIngredient('main', index, 'name', e)} />
                <input type='text' placeholder='재료 양을 알려주세요.' value={value['size'] || ''} onChange={(e) => handleIngredient('main', index, 'size', e)} />
                {mainIngredient.length === 1 ? (
                  null
                ) : (
                  <Trash size={20} clickEvent={() => handleIngredientDelete('main', index)} />
                )}
              </IngredientList>
            ))}
          </ul>
          <IngredientPlus>
            <PlusCircle size={25} clickEvent={() => setMainIngredient(prev => [...prev, {}])} />
          </IngredientPlus>
        </div>
        <div>
          <IngredientTitle>부재료</IngredientTitle>
          <ul>
            {semiIngredient.map((value, index) => (
              <IngredientList key={index} $last={semiIngredient.length === 1 ? true : false}>
                <input type='text' placeholder='부재료를 알려주세요.' value={value['name'] || ''} onChange={e => handleIngredient('semi', index, 'name', e)} />
                <input type='text' placeholder='재료 양을 알려주세요.' value={value['size'] || ''} onChange={e => handleIngredient('semi', index, 'size', e)} />
                {semiIngredient.length === 1 ? (
                  null
                ) : (
                  <Trash size={20} clickEvent={() => handleIngredientDelete('semi', index)} />
                )}
              </IngredientList>
            ))}
          </ul>
          <IngredientPlus>
            <PlusCircle size={25} clickEvent={() => setSemiIngredient(prev => [...prev, {}])} />
          </IngredientPlus>
        </div>
      </RecipeDetailBox>
      <RecipeDetailBox>
        <BoxTitle>
          <p>레시피</p>
        </BoxTitle>
        {recipeDetail.map((value, index) => (
          <RecipeOrderBox key={index} $first={index ? false : true}>
            <RecipeNav $only={recipeDetail.length === 1 ? true : false}>
              <Trash size={20} clickEvent={() => handleRecipeDetailDelete(index)} />
            </RecipeNav>
            <RecipeOrder>
              <RecipeOrderDetailArea>
                <p>
                  Step {index + 1}
                </p>
                <textarea rows={5} value={value['text'] || ''} onChange={(e) => handleRecipeDetail(index, e)} />
              </RecipeOrderDetailArea>
              <RecipeOrderImgArea onMouseEnter={() => handleRecipeImageHover(index, true)} onMouseLeave={() => handleRecipeImageHover(index, false)} onClick={() => handleRecipeImageClick(index)}>
                <input type="file" accept="image/*" style={{display: 'none'}} ref={e => recipeImageRef.current[index] = e} onChange={(e) => handleRecipeImageChange(index, e)} />
                {value['image'] ? (
                  <div>
                    <ThumbnailDeleteSvg xmlns="http://www.w3.org/2000/svg" $thumbnailhover={recipeImageHover[index]} width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></ThumbnailDeleteSvg>
                    <ThumbnailImg src={value['image']} $thumbnailhover={recipeImageHover[index]} />
                  </div>
                ) : (
                  <div>
                    <ThumbnailSvg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></ThumbnailSvg>
                  </div>
                )}
              </RecipeOrderImgArea>
            </RecipeOrder>
          </RecipeOrderBox>
        ))}
        <RecipePlusArea>
          <PlusCircle size={25} clickEvent={() => {
            setRecipeDetail(prev => [...prev, {}]);
            setRecipeImageHover(prev => [...prev, false]);
          }} />
        </RecipePlusArea>
      </RecipeDetailBox>
      <ButtonBox>
        <button onClick={submitRecipeWriting}>적용</button>
        <button onClick={cancelRecipeWriting}>취소</button>
      </ButtonBox>
    </RecipeContents>
  );
};

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
  &:hover{
    cursor: pointer;
  }
`;
const ThumbnailSvg = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
`;
const ThumbnailDeleteSvg = styled(ThumbnailSvg)`
  display: ${props => props.$thumbnailhover ? 'block' : 'none'};
  z-index: 1;
`;
const ThumbnailImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
  opacity: ${props => props.$thumbnailhover ? '30%' : '100%'};
`;
const Title = styled.div`
  width: 100%;
  font-size: 22px;
  text-align: start;
  margin-top: 20px;
  margin-bottom: 20px;
  & > input{
    width: 100%;
    height: 100%;
    font-size: 20px;
    padding: 10px;
    box-sizing: border-box;
    outline: none;
  }
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
const ExplainTextArea = styled.textarea`
  width: 100%;
  margin: 10px 0;
  font-size: 16px;
  border: none;
  outline: none;
  resize: none;
  padding: 10px;
  box-sizing: border-box;
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
  align-items: center;
  padding: 10px 10px;
  margin-left: 30px;
  margin-right: ${props => props.$last ? '30px' : '10px'};
  @media screen and (max-width: 767px) {
    margin-left: 20px;
    margin-right: ${props => props.$last ? '20px' : '0'};
  }
  
  &>input{
    width: 100%;
    font-size: 16px;
    padding: 10px;
    box-sizing: border-box;
    outline: none;
    margin: 0 5px;
    @media screen and (max-width: 767px) {
      font-size: 14px;
    }
  }
  &>svg{
    &:hover{
      cursor: pointer;
    }
  }
`;
const IngredientPlus = styled.div`
  width: 100%;
  margin-top: 10px;
  text-align: center;
  /* width: calc(100% - 80px);
  margin: 0 35px;
  margin-top: 10px;
  text-align: center;
  background-color: #FFA800;
  border-radius: 5px;
  padding: 5px 0;
  &:hover{
    cursor: pointer;
  } */
`;

const RecipeOrderBox = styled.div`
  width: 100%;
  border-top: ${props => props.$first ? 'none' : '1px solid #ffa80050'};
  padding-top: 30px;
`;
const RecipeNav = styled.div`
  width: 100%;
  padding-bottom: 10px;
  display: ${props => props.$only ? 'none' : 'block'};
`;
const RecipeOrder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 30px;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    justify-content: start;
  }
`;
const RecipeOrderDetailArea = styled.div`
  width: 60%;
  box-sizing: border-box;
  padding-right: 20px;

  & > p {
    font-size: 20px;
    margin-bottom: 10px;
    font-style: italic;
    color: #ffa800;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  & > textarea{
    font-size: 14px;
    width: 100%;
    outline: none;
    resize: none;
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
    border-radius: 10px;
    border: 1px solid #dfdfdf;
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
const RecipePlusArea = styled.p`
  text-align: center;
  padding: 20px 0;
`;

const ButtonBox = styled.div`
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

export default RecipeWriting;
