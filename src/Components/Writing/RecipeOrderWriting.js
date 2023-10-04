import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Template from './Template';

const PlusCircle = ({size=16, color="#000000", clickEvent}) => (<Svg onClick={clickEvent} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></Svg>);
const Trash = ({size=16, color="#000000", clickEvent}) => (<Svg onClick={clickEvent} style={{flexShrink: '0'}} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></Svg>);
const Svg = styled.svg`
  cursor: pointer;
`;


const RecipeOrderWriting = (props) => {
  const {recipeDetail, setRecipeDetail} = props;
  const [isTemplateOpen, setIsTemplateOpen] = useState([false]);
  const recipeImageRef = useRef([]);
  
  const axiosUrl = process.env.REACT_APP_AXIOS_URL;

  const serverImageDelete = async (image) => {
    axios
      .get(`${axiosUrl}/image/remove?imageAddress=${image}`)
      .catch((error) => {
        console.log(error);
      });
  };
  const handleRecipeDetailDelete = (index) => {
    let _recipeDetail = [...recipeDetail].filter((_, i) => i !== index);
    setRecipeDetail(_recipeDetail);
    let _isTemplateOpen = [...isTemplateOpen].filter((_, i) => i !== index);
    setIsTemplateOpen(_isTemplateOpen);
  }

  const handleRecipeImageClick = (index) => {
    recipeImageRef.current[index].click();
  }
  const handleRecipeImageDelete = (index) => {
    let _recipeDetail = [...recipeDetail];
    serverImageDelete(_recipeDetail[index]['image']);
    delete _recipeDetail[index]['image'];
    setRecipeDetail(_recipeDetail);
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
          if(_recipeDetail[index]['image']){
            serverImageDelete(_recipeDetail[index]['image']);
            delete _recipeDetail[index]['image'];
          }
          _recipeDetail[index]['image'] = res.data.data.url;
          setRecipeDetail(_recipeDetail);
          
          recipeImageRef.current[index].value = null;
        })
        .catch((error) => {
          console.log(error);
        });
    } else{
      alert('jpg, png 형식의 파일만 첨부하실 수 있습니다.');
    }
  }

  const handleRecipeDetailPlus = () => {
    setRecipeDetail(prev => [...prev, {}]);
  }

  const handleTemplateOpen = (index) => {
    let _isTemplateOpen = [...isTemplateOpen];
    _isTemplateOpen[index] = true;
    setIsTemplateOpen(_isTemplateOpen);
  }
  const handleTemplateClose = (index) => {
    let _isTemplateOpen = [...isTemplateOpen];
    _isTemplateOpen[index] = false;
    setIsTemplateOpen(_isTemplateOpen);
  }

  const handleSavingRecipeDetail = (index, newRecipeDetail) => {
    let _recipeDetail = [...recipeDetail];
    _recipeDetail[index] = newRecipeDetail;
    setRecipeDetail(_recipeDetail);
  }

  return (
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
              </RecipeOrderDetailArea>
              {
                isTemplateOpen[index] ? (
                  <Template
                    index={index}
                    handleTemplateClose={handleTemplateClose}
                    thisRecipeDetail={value}
                    handleSavingRecipeDetail={handleSavingRecipeDetail} />
                ) : (
                  <>
                    <RecipeOrderButton>
                      <button onClick={() => handleTemplateOpen(index)}>작성하기</button>
                      {value['image'] ? (
                        <>
                          <button onClick={() => handleRecipeImageClick(index)}>사진 수정하기</button>
                          <button onClick={() => handleRecipeImageDelete(index)}>사진 삭제하기</button>
                        </>
                      ) : (
                        <button onClick={() => handleRecipeImageClick(index)}>사진 추가하기</button>
                      )}
                    </RecipeOrderButton>
                    <input type="file" accept="image/*" style={{display: 'none'}} ref={e => recipeImageRef.current[index] = e} onChange={(e) => handleRecipeImageChange(index, e)} />
                    <RecipeOrderDetail>
                      {value['detail'] ? (
                        <p>{value['detail']}</p>
                      ) : (
                        null
                      )}
                      {value['image'] ? (
                        <div>
                          <div>
                            <img src={value['image']} />
                          </div>
                        </div>
                      ) : (
                        null
                      )}
                    </RecipeOrderDetail>
                  </>
                )
              }
              
              
            </RecipeOrder>
          </RecipeOrderBox>
        ))}
        <RecipePlusArea>
          <PlusCircle size={25} clickEvent={handleRecipeDetailPlus}/>
        </RecipePlusArea>
      </RecipeDetailBox>
      
  );
};

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
  width: 100%;
  padding-bottom: 30px;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    justify-content: start;
  }
`;
const RecipeOrderDetailArea = styled.div`
  margin-bottom: 20px;

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

const RecipeOrderButton = styled.div`
  & button{
    border: 1px solid #aaaaaa;
    border-radius: 5px;
    background-color: white;
    color: black;
    font-size: 14px;
    padding: 8px 25px;
    margin-right: 10px;
    &:hover{
      background-color: #efefef;
      cursor: pointer;
    }
  }
`;
const RecipeOrderDetail = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  & > div{
    width: 40%;
  }
  & > div > div{
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    position: relative;
  }
  & > div > div > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
`;

const RecipePlusArea = styled.p`
  text-align: center;
  padding: 20px 0;
`;

export default RecipeOrderWriting;
