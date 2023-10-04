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
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }
  const handleTemplateDelete = () => {
    const _newRecipeTemplate = JSON.parse(JSON.stringify(newRecipeTemplate));
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
    _newRecipeTemplate.push({});
    setNewRecipeTemplate(_newRecipeTemplate);
    setCheckedNum(_newRecipeTemplate.length - 1);
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
                <NumBox key={i} $checked={checkedNum === i} onClick={() => handleCheckNum(i)}>
                  {i+1}
                </NumBox>
              ))
            ) : (
              null
            )
          }
        </TemplateTitle>
        { newRecipeTemplate && newRecipeTemplate.length > 1 ? (
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
            <ContentsTitle><Circle color='#FFB571' /><p>재료</p></ContentsTitle>
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
          <textarea rows={5} ref={textareaRef} value={sentence || ""} onChange={handleDirectWriting} />
          <button onClick={handleTemplatePlus}>이어붙이기 +</button>
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