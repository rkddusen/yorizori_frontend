import React, { useEffect, useRef, useState } from 'react';
import styled, {css} from 'styled-components';

const Circle = ({size=12, color="#000000"}) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>);


const Template = (props) => {
  const { index, isTemplateOpen, setIsTemplateOpen, recipeTemplate, setRecipeTemplate, recipeDetail, setRecipeDetail } = props;
  const [newRecipeTemplate, setNewRecipeTemplate] = useState(null);
  const [savingRecipeTemplate, setSavingRecipeTemplate] = useState(null);
  const [checkedNum, setCheckedNum] = useState(0);
  const [sentence , setSentence] = useState(recipeDetail[index]['text'] || null);
  const inputRef = useRef([]);

  useEffect(() => {
    setNewRecipeTemplate(recipeTemplate);
    setSavingRecipeTemplate(recipeTemplate);
    console.log(recipeTemplate);
    getTemplate(recipeTemplate);
  },[]);

  useEffect(() => {
    if(newRecipeTemplate && newRecipeTemplate[index][checkedNum]){
      getTemplate(newRecipeTemplate);
    }
  },[checkedNum]);


  const initTemplate = () => {
    for(let i = 0; i < 6; i++){
      inputRef.current[i].value = '';
    }
  }
  const getTemplate = (_newRecipeTemplate) => {
    inputRef.current[0].value = _newRecipeTemplate[index][checkedNum].condition ? _newRecipeTemplate[index][checkedNum].condition : '';
    inputRef.current[1].value = _newRecipeTemplate[index][checkedNum].ingredient ? _newRecipeTemplate[index][checkedNum].ingredient : '';
    inputRef.current[2].value = _newRecipeTemplate[index][checkedNum].size ? _newRecipeTemplate[index][checkedNum].size : '';
    inputRef.current[3].value = _newRecipeTemplate[index][checkedNum].time ? _newRecipeTemplate[index][checkedNum].time : '';
    inputRef.current[4].value = _newRecipeTemplate[index][checkedNum].tool ? _newRecipeTemplate[index][checkedNum].tool : '';
    inputRef.current[5].value = _newRecipeTemplate[index][checkedNum].action ? _newRecipeTemplate[index][checkedNum].action : '';
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
    _newRecipeTemplate[index][checkedNum] = updated;
    // setNewRecipeTemplate(_newRecipeTemplate);
    return _newRecipeTemplate;
  }

  const isTemplateEmpty = (_newRecipeTemplate) => {
    for(let i = 0; i < _newRecipeTemplate[index].length; i++){
      let str = '';
      if(_newRecipeTemplate[index][i]){
        str = _newRecipeTemplate[index][i].condition + _newRecipeTemplate[index][i].ingredient + _newRecipeTemplate[index][i].size + _newRecipeTemplate[index][i].time + _newRecipeTemplate[index][i].tool + _newRecipeTemplate[index][i].action;
      }
      
      if(str.length === 0){
        return true;
      }
    }
    return false;
  }

  const handleCheckNum = (num) => {
    if(checkedNum !== num){
      let _newRecipeTemplate = setTemplate();
      setNewRecipeTemplate(_newRecipeTemplate);
      initTemplate();
      setCheckedNum(num);
    }
  }
  const handleMakingSentence = () => {
    // 문장 + 템플릿 서버에 보내고 문장 받기
    let _newRecipeTemplate = setTemplate();
    if(isTemplateEmpty(_newRecipeTemplate)){
      alert('비어 있는 템플릿이 존재합니다.');
    } else{
      //
      let _sentence = '';
      for(let i = 0; i < _newRecipeTemplate[index].length; i++){
        if(_newRecipeTemplate[index][i]){
          _sentence += _newRecipeTemplate[index][i].condition + _newRecipeTemplate[index][i].ingredient + _newRecipeTemplate[index][i].size + _newRecipeTemplate[index][i].time + _newRecipeTemplate[index][i].tool + _newRecipeTemplate[index][i].action;
        }
      }
      setSentence(_sentence);
      setNewRecipeTemplate(_newRecipeTemplate);
      setSavingRecipeTemplate(_newRecipeTemplate);
    }
  }
  const handleTemplateDelete = () => {
    const _newRecipeTemplate = JSON.parse(JSON.stringify(newRecipeTemplate));
    _newRecipeTemplate[index].splice(checkedNum, 1);
    setNewRecipeTemplate(_newRecipeTemplate);
    if(checkedNum >= _newRecipeTemplate[index].length){
      setCheckedNum(prev => prev - 1)
    } else{
      initTemplate();
      getTemplate(_newRecipeTemplate);
    }
  }
  const handleTemplatePlus = () => {
    let _newRecipeTemplate = setTemplate();
    _newRecipeTemplate[index].push({});
    setNewRecipeTemplate(_newRecipeTemplate);
    initTemplate();
    setCheckedNum(_newRecipeTemplate[index].length - 1);
  }


  const handleApplyTemplate = () => {
    if(sentence){
      let _recipeDetail = [...recipeDetail];
      _recipeDetail[index]['text'] = sentence;
      setRecipeDetail(_recipeDetail);
    }
    setRecipeTemplate(savingRecipeTemplate);
    
    handleTemplateClose();
  }
  const handleTemplateClose = () => {
    let _isTemplateOpen = [...isTemplateOpen];
    _isTemplateOpen[index] = false;
    setIsTemplateOpen(_isTemplateOpen);
  }

  return (
    <>
      <TemplateBox>
        <TemplateTitle>
          {
            newRecipeTemplate ? (
              newRecipeTemplate[index].map((_, i) => (
                <NumBox key={i} $checked={checkedNum === i} onClick={() => handleCheckNum(i)}>
                  {i+1}
                </NumBox>
              ))
            ) : (
              null
            )
          }
        </TemplateTitle>
        { newRecipeTemplate && newRecipeTemplate[index].length > 1 ? (
            <DeleteTemplate>
              <button onClick={handleTemplateDelete}>현재 템플릿 삭제</button>
            </DeleteTemplate>
          ) : (
            null
          )
        }
        <TemplateArea>
        <div>
          <Contents>
            <ContentsTitle><Circle color='#FF7171' /><p>조건</p></ContentsTitle>
            <div>
              <input type='text' ref={e => inputRef.current[0] = e} />
            </div>
          </Contents>
          <Contents>
            <ContentsTitle><Circle color='#FFB571' /><p>재료(양)</p></ContentsTitle>
            <div>
              <input type='text' ref={e => inputRef.current[1] = e} />
            </div>
          </Contents>
          <Contents>
            <ContentsTitle><Circle color='#FFE071' /><p>크기</p></ContentsTitle>
            <div>
              <input type='text' ref={e => inputRef.current[2] = e} />
            </div>
          </Contents>
          <Contents>
            <ContentsTitle><Circle color='#71FFA1' /><p>시간</p></ContentsTitle>
            <div>
              <input type='text' ref={e => inputRef.current[3] = e} />
            </div>
          </Contents>
          <Contents>
            <ContentsTitle><Circle color='#71B2FF' /><p>조리 도구</p></ContentsTitle>
            <div>
              <input type='text' ref={e => inputRef.current[4] = e} />
            </div>
          </Contents>
          <Contents>
            <ContentsTitle><Circle color='#C071FF' /><p>행동</p></ContentsTitle>
            <div>
              <input type='text' ref={e => inputRef.current[5] = e} />
            </div>
          </Contents>
        </div>
        <ConvertBtn>
           <button onClick={handleMakingSentence}>변환 ▶︎</button>
        </ConvertBtn>
        <Result>
          <textarea rows={5} value={sentence} />
          <button onClick={handleTemplatePlus}>이어붙이기 +</button>
        </Result>
        </TemplateArea>
        <ButtonBox>
          <button onClick={handleApplyTemplate}>적용</button>
          <button onClick={handleTemplateClose}>취소</button>
        </ButtonBox>
      </TemplateBox>
    </>
  );
}

const TemplateBox = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  margin: 10px;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.25);
  border-radius: 10px;
`;
const TemplateArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const TemplateTitle = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
  display: flex;
  justify-content: start;
  align-items: end;
`;
const NumBox = styled.div`
  width: 35px;
  height: 25px;
  border: 1px solid #dfdfdf;
  border-bottom: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  border-radius: 10px 10px 0 0;
  ${props => props.$checked && css`
    width: 50px;
    height: 30px;
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

  & input{
    font-size: 16px;
    padding: 5px;
  }
`;
const ContentsTitle = styled.div`
  width: 100px;
  display: flex;
  justify-content: start;
  align-items: center;
  & > svg{
    margin-right: 5px;
  }
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
    margin: 0 20px;
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

export default Template;