import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';

const Redirection = () => {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosUrl = process.env.REACT_APP_AXIOS_URL;

  const saveUser = async (code) => {
    axios.get(`${axiosUrl}/login/kakao?code=${code}`)
      .then((res) => {
        let _user = { ...user };
        _user.id = res.data.user.userTokenId;
        _user.nickName = res.data.user.nickname;
        _user.age = res.data.user.age;
        _user.gender = res.data.user.gender;
        _user.profileImg = res.data.user.imageAddress;
        setUser(_user);
        localStorage.setItem('user', _user.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    saveUser(code);
  },[]);


  return (
    <></>
  );
}

export default Redirection;