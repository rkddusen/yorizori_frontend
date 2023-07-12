import React, { useState } from "react";
import styled from "styled-components";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import TipView from "../Components/TipView"
import Paging from '../Components/Paging'
import PageExplain from '../Components/PageExplain';

function TipPage(props) {
  const { user } = props;
  const [tip, setTip] = useState([
    { id: 1, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
    { id: 2, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
    { id: 3, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
    { id: 4, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
    { id: 5, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
    { id: 6, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
    { id: 7, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
    { id: 8, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
    { id: 9, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
    { id: 10, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
    { id: 11, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
    { id: 12, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
  ]);
  const [totalTipCount, SetTotalTipCount] = useState(200);

  return (
    <div>
      <Wrap>
      <Header user={user} />
      <StyledBody>
        <Contents>
          <PageExplain title="COOKING TIP" explain="요리에 도움이 될 팁을 살펴보세요!"/>
          <TipView tip={tip} />
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

export default TipPage;
