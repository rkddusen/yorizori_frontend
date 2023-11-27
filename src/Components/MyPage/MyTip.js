import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import { styled } from 'styled-components';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import TipView from '../TipView'
import NoTip from '../NoTip';
import Paging from '../Paging';
import Error from '../Error';

const MyTip = () => {
  const { user } = useUserContext();
  const [result, setResult] = useState([]);
  const [totalTipCount, setTotalTipCount] = useState(0);
  const location = useLocation();
  const axiosUrl = process.env.REACT_APP_AXIOS_URL;
  const [getEnd, setGetEnd] = useState(false);
  const [getFail, setGetFail] = useState(false);

  useEffect(() => {
    if(user !== null){
      const search = new URLSearchParams(location.search);
      const _page = search.get("page") || 1;
    
      getTip(_page-1);
    }
  }, [user, location]);

  const getTip = async (page) => {
    setGetEnd(false);
    axios
      .get(`${axiosUrl}/user/get/${user.id}/tip?pageNo=${page}`)
      .then((res) => {
        let _result = [];
        for (let i = 0; i < res.data.content.length; i++) {
          _result.push(
            <TipView
              key={i}
              tip={
                {
                  id: res.data.content[i].tipId,
                  title: res.data.content[i].tipTitle,
                  thumbnail: res.data.content[i].tipThumbnail,
                  heartCount: res.data.content[i].tipHeartCount,
                  profileImg: res.data.content[i].profileImg,
                  nickname: res.data.content[i].nickname,
                  viewCount: res.data.content[i].tipViewCount,
                }
              }
            />
          );
        }
        
        setResult(_result);
        setTotalTipCount(res.data.totalElements);
        setGetEnd(true);
      })
      .catch((error) => {
        setGetEnd(true);
        setGetFail(true);
        console.log(error);
      })
  };

  return (
    <>
      { getEnd ? (
        <>
        {!getFail ? (
          <>
          {result.length ? (
            <>
              <TipList>{result}</TipList>
              <Paging pagingCount={Math.ceil(totalTipCount / 12)} />
            </>
          ) : (
            <NoTip />
          )}
          </>
        ) : (
          <Error />
        )}
      </>
      ) : (
        <>
          <Loading>
            <img src={process.env.REACT_APP_PUBLIC_URL + '/images/loading.svg'} />
          </Loading>
        </>
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


const Loading = styled.p`
  width: 15%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  & > img{
    width: 100%;
  }
  @media screen and (max-width: 767px) {
    width: 30%;
  }
`;

export default MyTip;