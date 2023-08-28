import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import { styled } from 'styled-components';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import TipView from '../TipView'
import NoRecipe from '../NoRecipe';
import Paging from '../Paging';

const MyTip = () => {
  const { user } = useUserContext();
  const [result, setResult] = useState([]);
  const [totalTipCount, setTotalTipCount] = useState(0);
  const location = useLocation();
  const axiosUrl = process.env.REACT_APP_AXIOS_URL;

  useEffect(() => {
    if(user !== null){
      const search = new URLSearchParams(location.search);
      const _page = search.get("page") || 1;
    
      getTip(_page-1);
    }
  }, [user, location]);

  const getTip = async (page) => {
    const res = await axios.get(
      `${axiosUrl}/user/get/${user.id}/tip?pageNo=${page}`
    );
    try {
      let _result = [];
      for (let i = 0; i < res.data.content.length; i++) {
        _result.push(
          <TipView
            key={i}
            recipe={
              {
                id: res.data.content[i].id,
                title: res.data.content[i].title,
                thumbnail: res.data.content[i].thumbnail,
                heartCount: res.data.content[i].heartCount,
                profileImg: res.data.content[i].profileImg,
                nickname: res.data.content[i].nickname,
                viewCount: res.data.content[i].viewCount,
              }
            }
          />
        );
      }
      
      setResult(_result);
      setTotalTipCount(res.data.totalElements);
    } catch {
      console.log("오류");
    }
  };

  return (
    <>
      {result.length ? (
        <>
          <TipList>
            {result}
          </TipList>
          <Paging pagingCount={Math.ceil(totalTipCount / 12)} />
        </>
      ) : (
        <NoRecipe />
      )}
    </>
  );
}

const TipList = styled.div`
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

export default MyTip;