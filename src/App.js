import './App.css';
import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage';

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
