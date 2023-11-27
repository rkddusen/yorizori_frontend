import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import TipView from '../TipView';

function CookingTip(){
  const [result, setResult] = useState([]);
  const navigate = useNavigate();
  const axiosUrl = process.env.REACT_APP_AXIOS_URL;

  const getTip = async () => {
    axios
      .get(`${axiosUrl}/tip/get/part`)
      .then((res) => {
        let _result = [];
        for(let i = 0; i < res.data.length; i++){
            _result.push(
              <TipView
                key={i}
                tip={
                  {
                    id: res.data[i].tipId,
                    title: res.data[i].tipTitle,
                    thumbnail: res.data[i].tipThumbnail,
                    heartCount: res.data[i].tipHeartCount,
                    profileImg: res.data[i].profileImg,
                    nickname: res.data[i].nickname,
                    viewCount: res.data[i].tipViewCount,
                  }
                }
              />
            )
          }
        setResult(_result);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  useEffect(() => {
    getTip();
  }, []);


  const moveTipPage = () => {
    navigate(`/tip`);
  }

  return(
    <StyledCookingTip>
      <CookingTipNav>
        <CookingTipTitle>쿠킹 <CookingTipRed>팁</CookingTipRed></CookingTipTitle>
        <CookingTipMore onClick={moveTipPage}>더보기 {'>'}</CookingTipMore>
      </CookingTipNav>
      <TipList>
        {result}
      </TipList>
    </StyledCookingTip>
  );
}

const StyledCookingTip = styled.div`
  margin-top: 50px;
`;

const CookingTipNav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;
const CookingTipTitle = styled.p`
  font-size: 20px;
`;

const CookingTipRed = styled.span`
  color: #FFA800;
`;
const CookingTipMore = styled.p`
  font-size: 16px;
  color: #FFA800;
  &:hover{
    opacity: 50%;
    cursor: pointer;
  }
`;

const TipList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: left;
  column-gap: 2%;
  word-wrap: normal;
  word-break: break-all;
  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;


export default CookingTip;