import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  const moveHome = () => {
    navigate(`/`);
  }

  const kakaoLogin = () => {
    const client_id = process.env.REACT_APP_KAKAO_CLIENT_ID;
    const redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    window.location.href =`https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;
  }
  const naverLogin = () => {
    const client_id = process.env.REACT_APP_NAVER_CLIENT_ID;
    const redirect_uri = process.env.REACT_APP_NAVER_REDIRECT_URI;
    window.location.href =`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&state=test`;
  }
  const googleLogin = () => {
    const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const redirect_uri = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
    window.location.href =`https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=profile`;
  }
  return (
    <StyledLogin>
      <Content>
        <Logo src="./images/logo.png" width="150px" onClick={moveHome} />
        <Explain>소셜 로그인으로 로그인/회원가입</Explain>
        <LoginApi>

          <LoginButton onClick={kakaoLogin} $sns="kakao">카카오로 시작하기</LoginButton>
          <LoginButton onClick={naverLogin} $sns="naver">네이버로 시작하기</LoginButton>
          <LoginButton onClick={googleLogin} $sns="google">구글로 시작하기</LoginButton>
        </LoginApi>
        <CopyRight>Copyright KKANG KU JUNG. All rights reserved.</CopyRight>
      </Content>
    </StyledLogin>
  );
}

const StyledLogin = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 150px;
`;
const Content = styled.div`
  text-align: center;
  width: 400px;
  @media screen and (max-width: 767px) {
    width: 90%;
    max-width: 400px;    
  }
`;
const Logo = styled.img`
  width: 150px;
  cursor: pointer;
`;
const Explain = styled.p`
  margin-top: 30px;
`;
const LoginApi = styled.div`
  width: 100%;
  margin-bottom: 50px;
`;

const LoginButton = styled.div`
  width: 400px;
  @media screen and (max-width: 767px) {
    width: 100%;
    max-width: 400px;    
  }
  height: 56px;
  line-height: 56px;
  font-size: 16px;
  border-radius: 12px;
  margin-top: 10px;
  box-sizing: border-box;
  background-size: 20px;
  background-position: 12px 49%;
  background-repeat: no-repeat;
  text-align: center;
  ${props => {
    switch (props.$sns){
      case 'kakao':
        return `
          background-color: #FEE500;
          background-image: url('./images/kakao_icon.png');
        `;
        case 'naver':
        return `
          background-color: #03C75A;
          background-image: url('./images/naver_icon.png');
          color: #FFFFFF;
        `;
        case 'google':
        return `
          background-color: #FFFFFF;
          background-image: url('./images/google_icon.png');
          border: 1px solid rgb(204, 204, 204);
        `;
    }
  }}
  &:hover{
    box-shadow: 2px 2px 10px 0px rgb(0,0,0,0.2);
    cursor: pointer;
  }
`;

const CopyRight = styled.p`
  font-size: 12px;
  color: #808080;
  margin: 20px;
`;
export default LoginPage;
