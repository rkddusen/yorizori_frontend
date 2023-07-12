import './App.css';
import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import CategoryPage from './Pages/CategoryPage';
import RankingPage from './Pages/RankingPage';
import TipPage from './Pages/TipPage';

function App() {
  const [user, setUser] = useState({
    id: null,
    nickName: null,
    age: null,
    gender: null,
    profileImg: null,
  })
  return (
    <div>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage user={user} />} />
          <Route path="/category" element={<CategoryPage user={user} />} />
          <Route path="/ranking" element={<RankingPage user={user} />} />
          <Route path="/tip" element={<TipPage user={user} />} />
        </Routes>
      </BrowserRouter>
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
