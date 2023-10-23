import React, { useEffect, useRef, useState } from 'react';
import styled, {css} from 'styled-components';
import axios from 'axios';

const Circle = ({size=10, color="#000000"}) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>);


const Template = (props) => {
  const { index, handleTemplateClose, thisRecipeDetail, handleSavingRecipeDetail } = props;
  const [newRecipeTemplate, setNewRecipeTemplate] = useState(thisRecipeDetail['template'] || [{}]);
  const [savingRecipeTemplate, setSavingRecipeTemplate] = useState(thisRecipeDetail['template'] || [{}]);
  const [checkedNum, setCheckedNum] = useState(0);
  const [sentence , setSentence] = useState(thisRecipeDetail['detail'] || '');
  const inputRef = useRef([]);
  const textareaRef = useRef(null);
  const axiosUrl = process.env.REACT_APP_AI_AXIOS_URL;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initTemplate();
    // 기존 데이터가 있는 경우
    if(newRecipeTemplate)
      getTemplate(newRecipeTemplate[checkedNum]);
  },[checkedNum]);

  const initTemplate = () => {
    for(let i = 0; i < 6; i++){
      inputRef.current[i].value = '';
    }
  }
  const getTemplate = (template) => {
    inputRef.current[0].value = template.condition ? template.condition : '';
    inputRef.current[1].value = template.ingredient ? template.ingredient : '';
    inputRef.current[2].value = template.size ? template.size : '';
    inputRef.current[3].value = template.time ? template.time : '';
    inputRef.current[4].value = template.tool ? template.tool : '';
    inputRef.current[5].value = template.action ? template.action : '';
  }

  const handleCheckNum = (num) => {
    if(checkedNum !== num){
      let _newRecipeTemplate = setTemplate();
      setNewRecipeTemplate( _newRecipeTemplate);
      initTemplate();
      setCheckedNum(num);
    }
  }

  const setTemplate = () => {
    const _newRecipeTemplate = JSON.parse(JSON.stringify(newRecipeTemplate));
    const updated = {
      condition: inputRef.current[0].value,
      ingredient: inputRef.current[1].value,
      size: inputRef.current[2].value,
      time: inputRef.current[3].value,
      tool: inputRef.current[4].value,
      action: inputRef.current[5].value,
    }
    _newRecipeTemplate[checkedNum] = updated;
    return _newRecipeTemplate;
  }

  const isTemplateEmpty = (template) => {
    for(let i = 0; i < template.length; i++){
      if(!(template[i].condition || template[i].ingredient || template[i].size || template[i].time || template[i].tool || template[i].action))
        return true;
    }
    return false;
  }

  // 문장 + 템플릿 서버에 보내고 문장 받기
  const handleMakingSentence = async () => {
    setLoading(true);
    let _newRecipeTemplate = setTemplate();
    if(isTemplateEmpty(_newRecipeTemplate)){
      alert('비어 있는 템플릿이 존재합니다.');
    } else{
      let paramsObject = {template: _newRecipeTemplate}
      axios.post(`${axiosUrl}/template`, paramsObject)
        .then((res) => {
          let _sentence = res.data.response;
          setSentence(_sentence);
          setNewRecipeTemplate(_newRecipeTemplate);
          setSavingRecipeTemplate(_newRecipeTemplate);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        })
    }
  }
  const handleTemplateDelete = () => {
    const _newRecipeTemplate = [...newRecipeTemplate];
    _newRecipeTemplate.splice(checkedNum, 1);
    setNewRecipeTemplate(_newRecipeTemplate);
    if(checkedNum >= _newRecipeTemplate.length){
      setCheckedNum(prev => prev - 1)
    } else{
      initTemplate();
      getTemplate(_newRecipeTemplate[checkedNum]);
    }
  }
  const handleTemplatePlus = () => {
    let _newRecipeTemplate = setTemplate();
    _newRecipeTemplate.splice(checkedNum+1, 0, {});
    setNewRecipeTemplate(_newRecipeTemplate);
    setCheckedNum(prev => prev + 1);
  }
  const handleTemplateMove = (direction) => {
    let _newRecipeTemplate = setTemplate();
    if(checkedNum + direction >= 0 && checkedNum + direction <= _newRecipeTemplate.length - 1){
      let temp = _newRecipeTemplate[checkedNum + direction];
      _newRecipeTemplate[checkedNum + direction] = _newRecipeTemplate[checkedNum];
      _newRecipeTemplate[checkedNum] = temp;
      setNewRecipeTemplate(_newRecipeTemplate);

      setCheckedNum(prev => prev + direction);
    }
  }



  const handleDirectWriting = () => {
    if(newRecipeTemplate && textareaRef.current?.value !== sentence){
      setNewRecipeTemplate([{}]);
      setSavingRecipeTemplate([{}]);
    }
    initTemplate();
    setCheckedNum(0);
    setSentence(textareaRef.current?.value);
  }


  const handleApplyTemplate = () => {
    let _thisRecipeDetail = {...thisRecipeDetail};
    _thisRecipeDetail['detail'] = sentence;
    _thisRecipeDetail['template'] = savingRecipeTemplate;
    handleSavingRecipeDetail(index, _thisRecipeDetail);
    handleTemplateClose(index);
  }

  return (
    <>
      <TemplateBox>
        <TemplateTitle>
          {
            newRecipeTemplate ? (
              newRecipeTemplate.map((_, i) => (
                <TemplateNumBox key={i} $checked={checkedNum === i}>
                  <TemplateNum $checked={checkedNum === i} onClick={() => handleCheckNum(i)}>
                    {i+1}
                  </TemplateNum>
                  {
                    checkedNum === i ? (
                      <HandleNumBox> 
                        <svg onClick={() => handleTemplateMove(-1)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/></svg>
                        { newRecipeTemplate.length < 3 ? (
                          <svg onClick={handleTemplatePlus} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        ) : (
                          null
                        )}
                        { newRecipeTemplate.length > 1 ? (
                          <svg onClick={handleTemplateDelete} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        ) : (
                          null
                        )}
                        <svg onClick={() => handleTemplateMove(1)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M13 17l5-5-5-5M6 17l5-5-5-5"/></svg>
                      </HandleNumBox>
                    ) : (
                      null
                    )
                  }
                </TemplateNumBox>
              ))
            ) : (
              null
            )
          }
        </TemplateTitle>
        {/* { newRecipeTemplate && newRecipeTemplate.length > 1 ? (
            <DeleteTemplate>
              <button onClick={handleTemplateDelete}>현재 템플릿 삭제</button>
            </DeleteTemplate>
          ) : (
            null
          )
        } */}
        <TemplateArea>
        <div>
          <Contents>
            <ContentsTitle><Circle color='#FF7171' /><p>조건</p></ContentsTitle>
            <ContentsInput>
              <input type='text' ref={e => inputRef.current[0] = e} />
            </ContentsInput>
          </Contents>
          <Contents>
            <ContentsTitle><Circle color='#FFB571' /><p>재료</p></ContentsTitle>
            <ContentsInput>
              <input type='text' ref={e => inputRef.current[1] = e} />
            </ContentsInput>
          </Contents>
          <Contents>
            <ContentsTitle><Circle color='#FFE071' /><p>크기</p></ContentsTitle>
            <ContentsInput>
              <input type='text' ref={e => inputRef.current[2] = e} />
            </ContentsInput>
          </Contents>
          <Contents>
            <ContentsTitle><Circle color='#71FFA1' /><p>시간</p></ContentsTitle>
            <ContentsInput>
              <input type='text' ref={e => inputRef.current[3] = e} />
            </ContentsInput>
          </Contents>
          <Contents>
            <ContentsTitle><Circle color='#71B2FF' /><p>조리 도구</p></ContentsTitle>
            <ContentsInput>
              <input type='text' ref={e => inputRef.current[4] = e} />
            </ContentsInput>
          </Contents>
          <Contents>
            <ContentsTitle><Circle color='#C071FF' /><p>행동</p></ContentsTitle>
            <ContentsInput>
              <input type='text' ref={e => inputRef.current[5] = e} />
            </ContentsInput>
          </Contents>
        </div>
        <ConvertBtnArea>
          {loading ? (
            <Loading>
              <img src={process.env.REACT_APP_PUBLIC_URL + '/images/loading.svg'} />
            </Loading>
          ) : (
            <ConvertBtn>
              <button onClick={handleMakingSentence}>변환 ▼</button>
            </ConvertBtn>
          )}
        </ConvertBtnArea>
        <Result>
          <textarea rows={5} ref={textareaRef} value={sentence || ""} onChange={handleDirectWriting} />
          {/* <button onClick={handleTemplatePlus}>이어붙이기 +</button> */}
        </Result>
        </TemplateArea>
        <ButtonBox>
          <button onClick={handleApplyTemplate}>적용</button>
          <button onClick={() => handleTemplateClose(index)}>취소</button>
        </ButtonBox>
      </TemplateBox>
    </>
  );
}

const TemplateBox = styled.div`
  width: calc(100% - 20px);
  padding: 20px;
  box-sizing: border-box;
  margin: 10px;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.25);
  border-radius: 10px;
  @media screen and (max-width: 767px) {
    padding: 10px;
  }
`;
const TemplateArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > div:first-child{
    width: auto;
  }
  @media screen and (max-width: 767px) {
    & > div{
      width: 100%;
    }
  }
`;
const TemplateTitle = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
  display: flex;
  justify-content: start;
  align-items: start;
`;

const TemplateNumBox = styled.div`
  width: 35px;
  ${props => props.$checked && css`
    width: 90px;
  `}
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
`;
const HandleNumBox = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 8px;

  & > svg{
    width: 20px;
    height: 20px;
    margin: 0 2px;
    stroke: #000;
    stroke-width: 1.5px;
    &:hover{
      cursor: pointer;
      stroke: #FFA800;
    }
  }

  @media screen and (max-width: 767px) {
    & > svg{
      stroke-width: 1px;
    }
  }
`;
const TemplateNum = styled.div`
  height: 25px;
  box-sizing: border-box;
  border: 1px solid #dfdfdf;
  border-bottom: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  border-radius: 10px 10px 0 0;
  ${props => props.$checked && css`
    border: 2px solid #FFA800;
    border-bottom: none;
    color: #FFA800;
  `}
  &:hover{
    cursor: pointer;
  }
`;
const DeleteTemplate = styled.div`
  margin: 10px 0;
`;
const Contents = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  width: 100%;
`;
const ContentsInput = styled.div`
  width: 100%;
  & input{
    box-sizing: border-box;
    font-size: 16px;
    padding: 5px;
    width: 250px;
  }
  
  @media screen and (max-width: 767px) {
    & input{
      width: 100%;
      font-size: 14px;
    }
  }
`;
const ContentsTitle = styled.div`
  min-width: 100px;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 16px;
  margin-right: 5px;
  & > svg{
    margin-right: 5px;
  }

  @media screen and (max-width: 767px) {
    min-width: 80px;
    font-size: 14px;
  }
`;

const ConvertBtnArea = styled.div`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ConvertBtn = styled.div`
  text-align: center;
  flex-shrink: 0;
  & > button {
    background-color: white;
    border: 1px solid black;
    color: black;
    padding: 5px 20px;
    font-size: 14px;
    border-radius: 15px;
    &:hover {
      cursor: pointer;
      color: #aaaaaa;
    }
  }
`;
const Result = styled.div`
  text-align: center;
  margin: 10px 0;
  width: 100%;
  & > textarea{
    width: 100%;
    font-size: 16px;
    padding: 5px;
    box-sizing: border-box;
    outline: none;
    resize: none;
  }
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

const Loading = styled.p`
  height: 50%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  & > img{
    height: 100%;
  }
`;

export default Template;