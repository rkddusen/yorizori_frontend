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

function App() {
  const [user, setUser] = useState({
    id: null,
    nickName: null,
    age: null,
    gender: null,
    profileImg: null,
  });

  const getUser = async () => {
    const res = await axios.get("http://172.30.1.32:8080/user/get/all");
    try {
      let _user = { ...user };
      _user.id = res.data[0].userTokenId;
      _user.nickName = res.data[0].nickname;
      _user.age = res.data[0].age;
      _user.gender = res.data[0].gender;
      _user.profileImg = res.data[0].imageAddress;
      setUser(_user);
    } catch {
      console.log("오류");
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
            <Route path="/" element={<MainPage user={user} />} />
            <Route path="/category" element={<CategoryPage user={user} />} />
            <Route path="/ranking" element={<RankingPage user={user} />} />
            <Route path="/tip" element={<TipPage user={user} />} />
            <Route
              path="/recommend"
              element={
                user.id ? (
                  <RecommendPage user={user} />
                ) : (
                  <NeedLoginPage user={user} />
                )
              }
            />
            <Route path="/login" element={<LoginPage />} />
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
  }
`;

export default App;
