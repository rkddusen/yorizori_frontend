import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';

function NotFoundPage() {
  const navigate = useNavigate();

  const moveHome = () => {
    navigate(`/`);
  }
  
  const moveBack = () => {
    navigate(-1);
  }
  return (
    <div>
      <Wrap>
        <Header />
        <Contents>
          <img src={process.env.REACT_APP_PUBLIC_URL + '/images/404.png'}/>
          <button onClick={moveHome}>홈으로 돌아가기</button>
        </Contents>
      </Wrap>
      <Footer />
    </div>
  );
}

const Wrap = styled.div`
  width: 100%;
  height: auto;
  min-height: calc(100vh - 250px - 170px);
`;
const Contents = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 170px;
  text-align: center;

  & > img{
    margin: 0 auto;
    margin-top: 10px;
    @media screen and (max-width: 767px) {
      max-width: 60%;
    }
  }
  & > button{
    margin: 0 auto;
    margin-top: 40px;
    display: block;
    background-color: #FFA800;
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 16px;
    padding: 15px 25px;

    @media screen and (max-width: 767px) {
      margin-top: 30px;
      font-size: 14px;
      padding: 15px 20px;
    }

    &:hover{
      cursor: pointer;
    }
  }

  @media screen and (max-width: 767px) {
    max-width: 400px;
    margin-top: 130px;
  }
`;

export default NotFoundPage;
