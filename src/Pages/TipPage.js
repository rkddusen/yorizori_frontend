import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import TipView from "../Components/TipView"
import Paging from '../Components/Paging'
import PageExplain from '../Components/PageExplain';

function TipPage() {
  const [result, setResult] = useState([]);
  const [totalTipCount, setTotalTipCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    let _result = [];
    for(let i = 0; i < 12; i++){
      _result.push(
        <TipView
          key={i}
          tip={
            {
              id: i+1,
              profileImg: "https://yorizori-s3.s3.ap-northeast-2.amazonaws.com/userImage/sample.png",
              nickname: "duyyaa",
              thumbnail: "https://yorizori-s3.s3.ap-northeast-2.amazonaws.com/src/8455f69d-6f83-4a85-9f95-a577c8d807bf.jpg",
              title: "제목",
              heartCount: 100,
              viewCount: 100,
            }
          }
        />
      )
    }
    let _count = 200;
    setResult(_result);
    if(_count !== totalTipCount) setTotalTipCount(_count);
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
