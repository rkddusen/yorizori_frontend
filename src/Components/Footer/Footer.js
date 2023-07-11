import React from 'react';
import styled from 'styled-components';

function Footer() {
  return (
    <StyledFooter>
      <FooterContent>
        <img src={process.env.PUBLIC_URL + '/images/logo.png'}  height="42px" style={{opacity:"50%"}}/>
        <FooterExplain>
          <FooterP>본 웹사이트는 건국대학교 컴퓨터공학부 졸업 프로젝트로 제작된 사이트입니다.</FooterP>
          <FooterP>Copyright KKANG KU JUNG. All rights reserved.</FooterP>
        </FooterExplain>
      </FooterContent>
    </StyledFooter>
  );
}

const StyledFooter = styled.div`
  width: 100%;
  height: 200px;
  margin-top: 50px;
  box-sizing: border-box;
  background-color: #fafafa;
`;
const FooterContent = styled.div`
  width: 90%;
  max-width: 1200px;
  height: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 60px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 767px){
    max-width: 400px;
    flex-direction: column;
    padding: 20px 0;
  }
`;

const FooterExplain = styled.div`
  margin: 0 0 0 30px;
  @media screen and (max-width: 767px){
    margin: 10px 0 0 0;
  }
`;

const FooterP = styled.p`
  font-size: 14px;
  color: #808080;
  margin: 10px 0;
  @media screen and (max-width: 767px){
    font-size: 12px;
  }
`;

export default Footer;
