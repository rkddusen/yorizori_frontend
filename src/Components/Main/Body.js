import React, { useState } from 'react';
import styled from 'styled-components';
import MainCategory from './MainCategory';
import Ranking from './Ranking';
import Recommend from './Recommend';
import CookingTip from './CookingTip';

function Body(props){
  const { user } = props;
  const [rankRecipe, setRankRecipe] = useState([
    { id: 1, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+', rank: 1 },
    { id: 2, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+', rank: 2 },
    { id: 3, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+', rank: 3 },
    { id: 4, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스스스스스스스스스스스', starRate: '5.0', starCount: '999+', opinionCount: '499+', rank: 4 },
    { id: 5, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+', rank: 5 },
    { id: 6, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+', rank: 6 },
    { id: 7, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+', rank: 7 },
    { id: 8, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+', rank: 8 },
    { id: 9, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+', rank: 9 },
    { id: 10, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+', rank: 10 },
    { id: 11, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+', rank: 11 },
  ]);
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
        <Ranking rankRecipe={rankRecipe} />
        <Recommend user={user} />
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