import React from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';

const WritingBox = (props) => {
  const { writingBoxOpen, setWritingBoxOpen } = props;
  const navigate = useNavigate();

  const movePage = (mode) => {
    setWritingBoxOpen(false);
    navigate(`/writing?mode=${mode}`);
  }

  return (
    <StyledWritingBox $writingBoxOpen={writingBoxOpen}>
      <MainArea>
        <VisitArea>
          <Visit onClick={() => movePage('recipe')}>
            <StyledSvg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></StyledSvg>
            레시피 작성
          </Visit>
          <Visit onClick={() => movePage('tip')}>
            <StyledSvg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></StyledSvg>
            팁 작성
          </Visit>
        </VisitArea>
      </MainArea>
    </StyledWritingBox>
  );
}
const StyledWritingBox = styled.div`
  position: absolute;
  right: 0;
  top: 90px;
  width: 250px;
  z-index: 99;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.25);
  border: 1px solid #dfdfdf;
  display: ${props => props.$writingBoxOpen ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
  cursor: auto;
  @media screen and (max-width: 767px){
    top: 50px;
    right: 0;
  }
`;

const MainArea = styled.div`
  width: 100%;
  background-color: white;
`;
const VisitArea = styled.div`
  width: 100%;
`;
const Visit = styled.p`
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #dfdfdf;
  stroke: black;
  &:last-child{
    border: none;
  }
  &:hover{
    color: #FFA800;
    cursor: pointer;
    stroke: #FFA800;
  }
`;
const StyledSvg = styled.svg`
  margin-right: 5px;
`;


export default WritingBox;