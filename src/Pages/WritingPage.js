import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import RecipeWriting from '../Components/Writing/RecipeWriting';
import TipWriting from '../Components/Writing/TipWriting';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import NeedLoginPage from './NeedLoginPage';

function WritingPage() {
  const { user } = useUserContext();
  const [mode, setMode] = useState('recipe');
  const location = useLocation();
  const navigate = useNavigate();

  const changeWriting = (str) => {
    navigate(`/writing?mode=${str}`);
  };

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const _mode = search.get('mode') || 'recipe';
    setMode(_mode);
  },[location]);

  return (
    <>
      {user.id ? (
        <div>
          <Wrap>
            <Header />
            <StyledBody>
              <Contents>
                {mode === 'recipe' ? (
                    <RecipeWriting />
                  ) : (
                    <TipWriting />
                  )}
              </Contents>
            </StyledBody>
          </Wrap>
          <Footer />
        </div>
      ) : (
        <NeedLoginPage />
      )}
    </>
    
  );
}

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
  margin-top: 170px;
  @media screen and (max-width: 767px) {
    max-width: 400px;
    margin-top: 130px;
  }
`;

const SearchNavUl = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 50px;
  margin-top: 50px;
`;
const SearchNavLi = styled.li`
  width: 110px;
  font-size: 18px;
  text-align: center;
  padding: 10px 0;
  margin: 0 20px;
  border-bottom: ${props => props.checked ? '2px solid #FFA800' : 'none'};
  color: ${props => props.checked ? '#FFA800' : 'black'};
  &:hover{
    cursor: pointer;
  }
  @media screen and (max-width: 767px) {
    width: 90px;
    font-size: 14px;
    margin: 0 15px;
  }
`;

const RecipeList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: left;
  column-gap: 2%;
  word-wrap: normal;
  word-break: break-all;
  @media screen and (max-width: 1023px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default WritingPage;
