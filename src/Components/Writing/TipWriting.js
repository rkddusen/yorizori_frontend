import React, { useEffect, useMemo, useRef, useState } from "react";
import { styled } from "styled-components";
import axios from 'axios';
import ReactQuill from "react-quill";
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';

const TipWriting = () => {
  const { user } = useUserContext();
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState('');
  const [thumbnailHover, setThumbnailHover] = useState(false);
  const [tipContents, setTipContents] = useState('');
  const thumbnailRef = useRef(null);
  const titleRef = useRef(null);
  const quillRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosUrl = process.env.REACT_APP_AXIOS_URL;

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const _updateId = search.get('updateId');
    if(_updateId){
      handleEditWriting(_updateId)
    }
  },[]);

  const handleEditWriting = async (_updateId) => {
    const res = await axios.get(`${axiosUrl}/tip/get/edit/${_updateId}`);
    try {
      setThumbnail(process.env.REACT_APP_IMG_URL + res.data.tipThumbnail);
      titleRef.current.value = res.data.tipTitle;
      setTipContents(res.data.tipDetail);
    } catch {
      console.log("오류");
      }
  }

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
      formData.append('tipImage', _recipeImg);
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      axios.post(`${axiosUrl}/image/upload/tip`, formData, { headers })
        .then((res) => {
          setThumbnail(res.data.data.url);
          console.log(res.data.data.url)
          setThumbnailHover(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else{
      alert('jpg, png 형식의 파일만 첨부하실 수 있습니다.');
    }
  }

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", async () => {
      const _image = input.files?.[0];
      const fileExtension = _image.name.split('.').pop();
      if(fileExtension.toLowerCase() === 'jpg' || fileExtension.toLowerCase() === 'jpeg' || fileExtension.toLowerCase() === 'png' ){
        const formData = new FormData();
        formData.append('tipImage', _image);
        const headers = {
          "Content-Type": "multipart/form-data",
        };
        axios.post(`${axiosUrl}/image/upload/tip`, formData, { headers })
          .then((res) => {
            const editor = quillRef.current.getEditor();
            const range = editor.getSelection();
            editor.insertEmbed(range.index, "image", res.data.data.url);
            editor.insertText(range.index + 1, '\n');
            editor.setSelection(range.index + 2);
            setImages(prevImages => [...prevImages, res.data.data.url]);
          })
          .catch((error) => {
            console.log(error);
          });
      } else{
        alert('jpg, png 형식의 파일만 첨부하실 수 있습니다.');
      }
    });
    
  }

  const handleOnChange = (contents) => {
    setTipContents(contents);
  }
  const handleOnSubmit = () => {

    let confirm = window.confirm('팁을 등록하시겠습니까?');
    if(confirm){
      // 적용할 때 전송되는 이미지
      let submitImages = seperateImage(tipContents);
      // 이미지를 등록했지만 적용할 때 삭제된 이미지
      let deletedImages = images.filter(v => submitImages.indexOf(v) < 0);
      const deleteObject = {
        images: deletedImages,
      }
      axios
        .post(`${axiosUrl}/image/remove/all`, deleteObject)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });


      let paramsObject = {
        userId: user.id,
        tipThumbnail: thumbnail,
        tipTitle: titleRef.current.value,
        tipDetail: tipContents,
      }
      
      const search = new URLSearchParams(location.search);
      const _updateId = search.get('updateId');
      if(_updateId){
        axios
          .post(`${axiosUrl}/tip/update/details?tipId=${_updateId}`, paramsObject)
          .then((res) => {
            console.log(res);
            navigate(`/tip/${_updateId}`);
          })
         .catch((error) => {
          console.log(error);
        });
      }
      else{
        axios
          .post(`${axiosUrl}/tip/save/details`, paramsObject)
          .then((res) => {
            navigate(`/tip/${res.data}`, { replace: true});
          })
          .catch((error) => {
            console.log(error);
          });
      }
      
    }
  }
  // 본문에서 이미지 url만 분리
  const seperateImage = (str) => {
    const match1 = /<img src="(https:\/\/yorizori-s3.s3.ap-northeast-2.amazonaws.com\/tip\/\d{8}\/[a-zA-Z0-9\-\.]+)">/g;
    const match2 = /https:\/\/yorizori-s3.s3.ap-northeast-2.amazonaws.com\/tip\/\d{8}\/[a-zA-Z0-9\-\.]+/g;

    const matchesFromMatch1 = str.match(match1) || [];

    const matchesFromMatch2 = matchesFromMatch1.reduce((acc, match) => {
      const innerMatches = match.match(match2);
      if (innerMatches) {
        return [...acc, ...innerMatches];
      }
      return acc;
    }, []);

    if (matchesFromMatch2.length > 0) {
      return (matchesFromMatch2);
    } else {
      return ([]);
    }
  }

  const handleOnCancel = () => {
    let confirm = window.confirm('정말 취소하시겠습니까?');
    if(confirm){
      navigate(-1);
    }
  }

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ["bold", "italic", "underline", "strike", "link", "image", 'blockquote', 'code-block'],
          // [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
        ],
        handlers: {
          image: handleImageUpload,
        },
      },
    }
  }, []);

  return (
    <TipContents>
      <WritingTitle>팁 작성</WritingTitle>
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
      <input type='text' placeholder='제목을 입력하세요.' ref={titleRef} />
      <TextEditor>
        <ReactQuill
          modules={modules}
          ref={quillRef}
          onChange={handleOnChange}
          value={tipContents}
        />
      </TextEditor>
      
      <ButtonBox>
        <button onClick={handleOnSubmit}>적용</button>
        <button onClick={handleOnCancel}>취소</button>
      </ButtonBox>
    </TipContents>
  );
};

const TipContents = styled.div`
  width: 70%;
  margin: 0 auto;
  @media screen and (max-width: 1023px) {
    width: 70%;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
  }
  & > input{
    width: 100%;
    font-size: 20px;
    box-sizing: border-box;
    border: 1px solid rgb(204, 204, 204);
    padding: 10px;
    margin: 20px 0;
  }
`;
const WritingTitle = styled.p`
  font-size: 24px;
  margin-bottom: 20px;
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
const TextEditor = styled.div`
  width: 100%;
  & > div{
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    & > div:last-child{
      height: 400px;
    }
    & strong{
      font-weight: bold;
    }
    & em{
      font-style: italic;
    }
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

export default TipWriting;
