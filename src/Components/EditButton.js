import React, { useRef, useEffect, useState } from "react";
import styled from 'styled-components';

const MoreVertical = ({size=22, color="#000000", handleModal}) => (<ModalOpenBtn onClick={handleModal} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></ModalOpenBtn>);
const ShareRegister = ({size=20, color="#000000"}) => (<TextSvg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><g fill="none" fillRule="evenodd"><path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8"/></g></TextSvg>);
const Edit = ({size=20, color="#000000"}) => (<TextSvg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></TextSvg>);
const Delete = ({size=20, color="#000000"}) => (<TextSvg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></TextSvg>);

const ModalOpenBtn = styled.svg`
  padding: 5px;
  border-radius: 100%;
  &:hover{
    cursor: pointer;
  }
`;
const TextSvg = styled.svg`
  margin-right: 5px ;
`;
const EditButton = (props) => {
  const { mode, isSelf, handleDelete } = props;
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  
  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  const onClickOutsideHandler = ({ target }) => {
    if (modalRef.current && isOpen === true && !modalRef.current.contains(target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", onClickOutsideHandler);
    return () => {
      window.removeEventListener("click", onClickOutsideHandler);
    };
  });

  return (
    <EditModalArea $isopen={isOpen} ref={modalRef}>
      <MoreVertical handleModal={handleModal} />
      {isOpen ? (
        <Modal>
          {mode === 'recipe' ? <p><ShareRegister />공유등록</p> : null}
          {isSelf ? <p><Edit />편집</p> : null}
          {isSelf ? <p onClick={handleDelete}><Delete />삭제</p> : null}
        </Modal>
      ) : (
        null
      )}
    </EditModalArea>
  );
}
const EditModalArea = styled.div`
  position: relative;
  border-radius: 100%;
  background-color: ${props => props.$isopen ? '#dfdfdf' : 'none'};
  &:hover{
    background-color: #dfdfdf;
  }
`;
const Modal = styled.div`
  background-color: white;
  position: absolute;
  padding: 10px 0;
  box-sizing: border-box;
  right: 0;
  margin-top: 5px;
  width: 150px;
  border-radius: 15px;
  box-shadow: 0px 4px 32px 0px rgba(0,0,0,0.2);

  & > p{
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 10px 20px;
    font-size: 14px;
    &:hover{
      cursor: pointer;
      background-color: #efefef;
    }
  }
`;


export default EditButton;