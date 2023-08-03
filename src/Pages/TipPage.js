import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import axios from 'axios';
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import TipView from "../Components/TipView"
import Paging from '../Components/Paging'
import PageExplain from '../Components/PageExplain';

function TipPage() {
  const [result, setResult] = useState([]);
  const [totalTipCount, setTotalTipCount] = useState(0);
  const location = useLocation();

  const axiosUrl = process.env.REACT_APP_AXIOS_URL;

  const getTip = async () => {
      const res = await axios.get(`${axiosUrl}/tip/get/all/paging`);
      try {
        let _result = [];
        for (let i = 0; i < 12; i++) {
          _result.push(
            <TipView
              key={i}
              tip={
                {
                  id: res.data.content[i].id,
                  title: res.data.content[i].tipTitle,
                  viewCount: res.data.content[i].tipHits,
                  thumbnail: res.data.content[i].tipThumbnail,
                  heartCount: 0,
                  profileImg: '',
                  nickname: 'ㅇㅇ',
                }
              }
            />
          )
        }
        setTotalTipCount(res.data.content.length);
        setResult(_result);
      } catch {
        console.log("오류");
      }
    };

  useEffect(() => {
    getTip();
  }, [location]);

  return (
    <div>
      <Wrap>
      <Header />
      <StyledBody>
        <Contents>
          <PageExplain title="COOKING TIP" explain="요리에 도움이 될 팁을 살펴보세요!"/>
          <TipList>
            {result}
          </TipList>
          <Paging pagingCount={Math.ceil(totalTipCount/12)} />
        </Contents>
      </StyledBody>
      </Wrap>
      <Footer />
    </div>
  );
}

const Wrap = styled.div`
  width: 100%;
  height: auto;
  min-height: calc(100vh - 250px - 170px);
`;
const StyledBody = styled.div`
  width: 100%;
`;
const Contents = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 170px;
  @media screen and (max-width: 767px) {
    max-width: 400px;
    margin-top: 130px;
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
  @media screen and (max-width: 1023px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default TipPage;
