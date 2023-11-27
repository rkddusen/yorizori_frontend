import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Star } from "../Evaluation";
import { useUserContext } from "../../contexts/UserContext";
import { ProfileImg } from "../ProfileImg";
import { useLocation, useNavigate } from 'react-router-dom';
import RecipeOrderWriting from './RecipeOrderWriting';

const PlusCircle = ({size=16, color="#000000", clickEvent}) => (<Svg onClick={clickEvent} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></Svg>);
const Trash = ({size=16, color="#000000", clickEvent}) => (<Svg onClick={clickEvent} style={{flexShrink: '0'}} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></Svg>);
const Svg = styled.svg`
  &:hover{
    cursor: pointer;
  }
`;

const RecipeWriting = () => {
  const { user } = useUserContext();
  const [thumbnail, setThumbnail] = useState('');
  const [thumbnailHover, setThumbnailHover] = useState(false);
  const [recipeInfo, setRecipeInfo] = useState({
    title: null,
    dishName: null,
    level: null,
    time: null,
    explain: null,
  });
  const [category, setCategory] = useState([]);
  const [mainIngredient, setMainIngredient] = useState([{}]);
  const [semiIngredient, setSemiIngredient] = useState([{}]);
  const [recipeDetail, setRecipeDetail] = useState([{}]);
  // [
  //   {
  //     details: '',
  //     image: '',
  //     template: [
  //       {
  //         condition: '',
  //         ingredient: '',
  //         size: '',
  //         time: '',
  //         tool: '',
  //         action: '',
  //       },
  //       {
  //         condition: '',
  //         ingredient: '',
  //         size: '',
  //         time: '',
  //         tool: '',
  //         action: '',
  //       },
  //     ]
  //   }
  // ]
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let method = queryParams.get('method');
  let origin = queryParams.get('origin');
  const [referenceUser, setReferenceUser] = useState({
    id: null,
    profileImg: null,
    nickname: null,
  })
  const [originImage, setOriginImage] = useState([]);
  const thumbnailRef = useRef(null);
  const navigate = useNavigate();
  const axiosUrl = process.env.REACT_APP_AXIOS_URL;

  useEffect(() => {
    if(method && origin){
      getRecipe();
    } 
  },[location]);
  const getRecipe = async () => {
    if(origin){
      axios
        .get(`${axiosUrl}/recipe/get/writing/reference?recipeId=${origin}`)
        .then((res) => {
          if(method === 'edit'){
            let _thumbnail = res.data.thumbnail;
            let _recipeDetail = res.data.order;
            let _recipeImage = _recipeDetail.map(order => order.image);
            setThumbnail(_thumbnail);
            setRecipeDetail(_recipeDetail);
            _recipeImage.push(_thumbnail)
            let _originImage = _recipeImage.filter(v => v !== null);
            setOriginImage(_originImage);
          } else{
            let _referenceUser = {};
            _referenceUser.id = res.data.id;
            _referenceUser.profileImg = res.data.profileImg;
            _referenceUser.nickname = res.data.nickname;
            let _recipeDetail = res.data.order;
            _recipeDetail.map(order => delete order.image);
      
            setReferenceUser(_referenceUser);
            setRecipeDetail(_recipeDetail);
          }
          let _recipeInfo = {};
          _recipeInfo.title = res.data.title;
          _recipeInfo.dishName = res.data.dishName;
          _recipeInfo.level = res.data.level;
          _recipeInfo.time = res.data.time;
          _recipeInfo.explain = res.data.explain;
          let _category = res.data.category;
          let _mainIngredient = res.data.mainIngredient;
          let _semiIngredient = res.data.semiIngredient;
      
          setRecipeInfo(_recipeInfo);
          setCategory(_category);
          setMainIngredient(_mainIngredient);
          setSemiIngredient(_semiIngredient);

        })
        .catch((error) => {
          console.log(error);
        
        })
    }
  };


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
    if(originImage.indexOf(image) === -1){ 
    axios
      .delete(`${axiosUrl}/image/remove?imageAddress=${image}`)
      .catch((error) => {
        console.log(error);
      });
    }
  };
  const serverOriginImageDelete = async (image) => {
    axios
      .delete(`${axiosUrl}/image/remove?imageAddress=${image}`)
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
          setThumbnail(res.data.data.fileName);
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
    if(e.target.value !== '난이도' && e.target.value !== '시간'){
      _recipeInfo[info] = e.target.value;
    } else _recipeInfo[info] = null;
    setRecipeInfo(_recipeInfo);
  }
  const handleCategoryChange = (e) => {
    let _category = [...category];
    if(e.target.value !== '전체' && _category.indexOf(e.target.value) === -1)
      _category.push(e.target.value);
    setCategory(_category);
  }
  const handleCategoryDelete = (index) => {
    let _category = [...category];
    _category.splice(index, 1);
    setCategory(_category);
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

  const submitRecipeWriting = async () => {
    const filteredMainIngredient = mainIngredient.filter(obj => obj['name'] && obj['name'].length > 0);
    const filteredSemiIngredient = semiIngredient.filter(obj => obj['name'] && obj['name'].length > 0);
    let filteredRecipeDetail = recipeDetail.filter(obj => obj['image'] || (obj['detail'] && obj['detail'].length > 0));
    // recipeDetail에 template이 없는 경우 -> 크롤링해서 가져온 데이터를 공유등록하는 경우에 한해
    filteredRecipeDetail = filteredRecipeDetail.map(obj => obj.template ? obj : { ...obj, template: [{}] });
    
    let paramsObject = {
      userId: user.id,
      thumbnail: thumbnail,
      recipeInfo: {...recipeInfo, category: category},
      mainIngredient: filteredMainIngredient,
      semiIngredient: filteredSemiIngredient,
      recipeDetail: filteredRecipeDetail,
      originRecipe: origin,
    };

    let confirm;
    if(filteredMainIngredient.length !== mainIngredient.length || filteredSemiIngredient.length !== semiIngredient.length){
      confirm = window.confirm('재료명이 입력되지 않은 재료는 등록되지 않습니다.\n레시피를 등록하시겠습니까?');
    } else if(recipeDetail.length !== filteredRecipeDetail.length){
      confirm = window.confirm('레시피 내용이 비어 있는 Step은 자동으로 사라집니다.\n레시피를 등록하시겠습니까?');
    } else {
      confirm = window.confirm('레시피를 등록하시겠습니까?');
    }
    if(confirm){
      if(paramsObject.thumbnail.length < 1){
        alert('썸네일 사진을 등록해주세요.');
      }
      else if(!paramsObject.recipeInfo.title){
        alert('레시피 제목을 입력해주세요.');
      }
      else if(paramsObject.recipeInfo.title.length > 255){
        alert('(레시피 제목) 최대 길이는 255자입니다.');
      }
      else if(paramsObject.recipeInfo.dishName.length > 255){
        alert('(음식 이름) 최대 길이는 255자입니다.');
      }
      else if(!paramsObject.recipeInfo.level){
        alert('레시피의 난이도를 설정해주세요.');
      }
      else if(!paramsObject.recipeInfo.time){
        alert('요리 시간을 설정해주세요.');
      }
      else if(paramsObject.recipeInfo.category.length < 1){
        alert('레시피의 카테고리를 설정해주세요.');
      }
      else if(!paramsObject.recipeInfo.explain){
        alert('요리를 소개 해주세요.');
      }
      else if(paramsObject.recipeInfo.explain.length > 255){
        alert('(요리 소개) 최대 길이는 255자입니다.');
      }
      else if(paramsObject.mainIngredient.length === 0 && paramsObject.semiIngredient.length === 0){
        alert('1개 이상의 재료가 필요합니다.');
      }
      else if(paramsObject.mainIngredient.filter(v => v['name']?.length > 255).length > 0){
        alert('(주재료) 최대 길이는 255자입니다.');
      }
      else if(paramsObject.mainIngredient.filter(v => v['size']?.length > 255).length > 0){
        alert('(주재료 크기) 최대 길이는 255자입니다.');
      }
      else if(paramsObject.semiIngredient.filter(v => v['name']?.length > 255).length > 0){
        alert('(부재료) 최대 길이는 255자입니다.');
      }
      else if(paramsObject.semiIngredient.filter(v => v['size']?.length > 255).length > 0){
        alert('(부재료 크기) 최대 길이는 255자입니다.');
      }
      else if(paramsObject.recipeDetail.length < 1){
        alert('레시피 내용을 입력해주세요.');
      }
      else{
        if(method === 'edit'){
          axios
            .post(`${axiosUrl}/recipe/update/details`, paramsObject)
            .then((res) => {
              let deletingImage = paramsObject.recipeDetail.map(order => order.image);
              deletingImage.push(paramsObject.thumbnail);
              console.log(deletingImage);
              deleteOriginImage(deletingImage);
              navigate(`/recipe/${res.data}`, { replace: true});
            })
            .catch((error) => {
              console.log(error);
            });
        } else{
          axios
            .post(`${axiosUrl}/recipe/save/details`, paramsObject)
            .then((res) => {
              navigate(`/recipe/${res.data}`, { replace: true});
            })
            .catch((error) => {
              console.log(error);
            });
        }
        
      }
    }
  }
  const cancelRecipeWriting = () => {
    let confirm = window.confirm('정말 취소하시겠습니까?');
    if(confirm){
      navigate(-1);
    }
  }

  const deleteOriginImage = (image) => {
    let _originImage = originImage.filter(v => image.indexOf(v) === -1);

    for(let i = 0; i < _originImage.length; i++){
      serverOriginImageDelete(_originImage[i]);
    }
  }

  return (
    <RecipeContents>
      <WritingTitle>레시피 작성</WritingTitle>
      <RecipeTitle>
        <Thumbnail onMouseEnter={() => handleThumbnailHover(true)} onMouseLeave={() => handleThumbnailHover(false)} onClick={handleThumbnailClick}>
          <input type="file" accept="image/*" style={{display: 'none'}} ref={thumbnailRef} onChange={handleThumbnailChange} />
          { thumbnail.length > 0 ? (
            <>
              <ThumbnailDeleteSvg xmlns="http://www.w3.org/2000/svg" $thumbnailhover={thumbnailHover} width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></ThumbnailDeleteSvg>
              <ThumbnailImg src={process.env.REACT_APP_IMG_URL + thumbnail} $thumbnailhover={thumbnailHover} />
            </>
          ) : (
              <ThumbnailSvg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></ThumbnailSvg>
          )}
        </Thumbnail>
        <Title>
          <input type='text' value={recipeInfo?.title || ''} placeholder='레시피 제목을 알려주세요.' onChange={(e) => handleInfoChange(e, 'title')}/>
        </Title>
        <DishName>
          <div>
            <SubTitleName>음식 이름</SubTitleName>
            <SubTitleContent>
              <input type='text' value={recipeInfo?.dishName || ''} placeholder='음식 이름' onChange={(e) => handleInfoChange(e, 'dishName')}/>
            </SubTitleContent>
          </div>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" style={{marginRight: '5px'}} width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            음식 이름을 입력하시면 해당 음식 이름으로 식당 조회가 가능해집니다.
          </p>
        </DishName>
        <SubTitleFirst>
          <div>
            <SubTitleName>난이도</SubTitleName>
            <SubTitleContent>
              <select value={recipeInfo?.level || '난이도'} onChange={(e) => handleInfoChange(e, 'level')}>
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
              <select value={recipeInfo?.time || '시간'} onChange={(e) => handleInfoChange(e, 'time')}>
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
        <SubTitleCategory>
          <SubTitleName>카테고리</SubTitleName>
          <SubTitleContent>
            <div>
              {
                category.map((c, i) => 
                  <p key={i}>
                    {c} <svg onClick={() => handleCategoryDelete(i)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF0000" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </p>
                )
              }
            </div>
            <select value="전체" onChange={(e) => handleCategoryChange(e)}>
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
        </SubTitleCategory>
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
            <ExplainTextArea value={recipeInfo?.explain || ''} rows={5} placeholder='요리를 소개해주세요.' onChange={(e) => handleInfoChange(e, 'explain')} />
            {referenceUser?.id ? (
              <div>
                <p>
                  Recipe by '{referenceUser.nickname}'의 레시피
               </p>
              </div>
            ) : (
              null
            )}
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
      <RecipeOrderWriting recipeDetail={recipeDetail} setRecipeDetail={setRecipeDetail} serverImageDelete={(image) => serverImageDelete(image)} />
      <ButtonBox>
        <button onClick={submitRecipeWriting}>저장</button>
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
const WritingTitle = styled.p`
  font-size: 24px;
  margin-bottom: 20px;
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
  margin-bottom: 10px;
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
  align-items: center;
  height: auto;
  margin: 15px 0;
  & > svg {
    padding: 10px 0;
  }
`;
const DishName = styled(SubTitle)`
  width: 100%;
  font-size: 14px;
  display: block;
  margin-bottom: 5px;
  & > div{
    display: flex;
    justify-content: start;
    align-items: center;
    & input{
      font-size: 14px;
    }
  }
  & > p{
    font-size: 12px;
    display: flex;
    align-items: center;
    color: #555555;
    stroke: #555555;
  }
`;
const SubTitleFirst = styled(SubTitle)`
  
  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: start;
    & > div:first-child{
      margin-bottom: 15px;
    }
  }
  & > div{
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: baseline;
    margin-right: 15px;
  }
`;
const SubTitleCategory = styled(SubTitle)`
  align-items: baseline;
`;
const SubTitleName = styled.p`
  margin-left: 20px;
  margin-right: 10px;
  padding: 5px 0;
  &:first-child {
    margin-left: 0px;
  }
`;
const SubTitleContent = styled.div`
  margin-right: 5px;
  margin-left: 5px;
  background-color: ${(props) => (props.$level ? "#FFA800" : "white")};
  color: ${(props) => (props.$level ? "white" : "#888888")};
  border-radius: 100%;
  /* padding: 10px; */
  /* height: 100%; */
  & > div > p{
    margin-bottom: 10px;
    display: flex;
    align-items: bottom;
    & > svg{
      margin-left: 10px;
      stroke-width: 2;
    }
    & > svg:hover{
      cursor: pointer;
      stroke-width: 4;
    }
  }

  & > select{
    font-size: 16px;
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
const ReferenceTitle = styled.div`
  font-size: 14px;
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

// const RecipeOrderBox = styled.div`
//   width: 100%;
//   border-top: ${props => props.$first ? 'none' : '1px solid #ffa80050'};
//   padding-top: 30px;
// `;
// const RecipeNav = styled.div`
//   width: 100%;
//   padding-bottom: 10px;
//   display: ${props => props.$only ? 'none' : 'block'};
// `;
// const RecipeOrder = styled.div`
//   width: 100%;
//   padding-bottom: 30px;

//   @media screen and (max-width: 767px) {
//     flex-direction: column;
//     justify-content: start;
//   }
// `;
// const RecipeOrderDetailArea = styled.div`
//   width: 60%;
//   box-sizing: border-box;
//   padding-right: 20px;

//   & > p {
//     font-size: 20px;
//     margin-bottom: 10px;
//     font-style: italic;
//     color: #ffa800;
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//   }
//   & > textarea{
//     font-size: 14px;
//     width: 100%;
//     outline: none;
//     resize: none;
//   }

//   @media screen and (max-width: 767px) {
//     width: 100%;
//     padding-right: 0;
//   }
// `;
// const RecipeOrderContents = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   & button{
//     &:hover{
//       cursor: pointer;
//     }
//   }
// `;
// const RecipeOrderImgArea = styled.div`
//   width: 40%;
//   & > div {
//     width: 100%;
//     height: 0;
//     padding-bottom: 100%;
//     position: relative;
//     border-radius: 10px;
//     border: 1px solid #dfdfdf;
//   }
//   & > div > img {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     border-radius: 10px;
//   }

//   @media screen and (max-width: 767px) {
//     width: 100%;
//     margin-top: 10px;
//   }
// `;
// const RecipePlusArea = styled.p`
//   text-align: center;
//   padding: 20px 0;
// `;

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
