import React, { useState } from 'react';
import styled from 'styled-components';
import MainCategory from './MainCategory';
import Ranking from './Ranking';
import Recommend from './Recommend';
import CookingTip from './CookingTip';

const Body = () => {
  const [tip, setTip] = useState([
    { id: 1, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
    { id: 2, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
    { id: 3, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
    { id: 4, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
    { id: 5, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
    { id: 6, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
    { id: 7, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
    { id: 8, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
  ]);
  return(
    <StyledBody>
      <Contents>
        <MainCategory />
        <Ranking />
        <Recommend />
        <CookingTip tip={tip}/>
      </Contents>
    </StyledBody>
  );
}

const StyledBody = styled.div`
  width: 100%;
`;
const Contents = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  @media screen and (max-width: 767px){
    max-width: 400px;
  }
`;

export default Body;