import "./App.css";
import React, { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { UserProvider } from "./contexts/UserContext";
import MainPage from "./Pages/MainPage";
import CategoryPage from "./Pages/CategoryPage";
import RankingPage from "./Pages/RankingPage";
import TipPage from "./Pages/TipPage";
import RecommendPage from "./Pages/RecommendPage";
import NeedLoginPage from "./Pages/NeedLoginPage";
import LoginPage from "./Pages/LoginPage";
import MyPage from './Pages/MyPage';
import RecipeReadPage from './Pages/RecipeReadPage';
import SearchPage from './Pages/SearchPage';
import WritingPage from './Pages/WritingPage';
import Redirection from './Components/Login/Redirection';
import TipReadPage from './Pages/TipReadPage';
import RestaurantPage from './Pages/RestaurantPage';
import NotFoundPage from './Pages/NotFountPage';

function App() {
  const [user, setUser] = useState({
    id: null,
    nickName: null,
    age: null,
    gender: null,
    profileImg: null,
  });
  const axiosUrl = process.env.REACT_APP_AXIOS_URL;

  const getUser = async () => {
    let _id = localStorage.getItem('user');
    if(_id){
      const res = await axios.get(`${axiosUrl}/user/get/${_id}`);
      try {
        let _user = { ...user };
        _user.id = res.data.userTokenId;
        _user.nickName = res.data.nickname;
        _user.age = res.data.age;
        _user.gender = res.data.gender;
        _user.profileImg = res.data.imageAddress;
        setUser(_user);
      } catch {
        console.log("오류");
      }
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <UserProvider value={{ user, setUser }}>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/ranking" element={<RankingPage />} />
            <Route path="/tip" element={<TipPage />} />
            <Route
              path="/recommend"
              element={
                user.id ? (
                  <RecommendPage />
                ) : (
                  <NeedLoginPage />
                )
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/recipe/:id" element={<RecipeReadPage />} />
            <Route path="/tip/:id" element={<TipReadPage />} />
            <Route path="/writing" element={<WritingPage />} />
            <Route exact path='/user/kakao/callback' element={<Redirection login="kakao" />} />
            <Route exact path='/user/naver/callback' element={<Redirection login="naver" />} />
            <Route exact path='/user/google/callback' element={<Redirection login="google" />} />
            <Route path='/restaurant' element={<RestaurantPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}
const GlobalStyles = createGlobalStyle`
  ${reset}
  body{
    font-family:'Noto Sans KR';
    color: #101010;
    overflow-y: scroll;
    overflow-x: hidden;
  }
`;

export default App;
