import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Star } from './Evaluation';
import { useNavigate } from 'react-router-dom';

function RecipeView(props){
  //const { recipe } = props;
  const { id } = props;
  const [recipe, setRecipe] = useState({
    id: id,
    profileImg: "https://yorizori-s3.s3.ap-northeast-2.amazonaws.com/userImage/sample.png",
    nickname: "duyyaa",
    thumbnail: "https://yorizori-s3.s3.ap-northeast-2.amazonaws.com/src/8455f69d-6f83-4a85-9f95-a577c8d807bf.jpg",
    title: "제목",
    starRate: 4.5,
    starCount: 100,
    opinionCount: 100,
    viewCount: 100,
  })
  const [result, setResult] = useState('');
  const navigate = useNavigate();

  const movePage = (id) => {
    navigate(`/recipe/` + id);
  }

  return(
      <RecipeBox onClick={() => movePage(recipe.id)}>
        <Profile>
          <ProfileImg src={recipe.profileImg} />
          <NickName>{recipe.nickname}</NickName>
        </Profile>
        <Clickable>
          <Thumbnail>
            <ThumbnailImg src={recipe.thumbnail} />
          </Thumbnail>
          <div>
            <div>
              <Title>{recipe.title + recipe.id}</Title>
            </div>
            <Indicators>
              <Star />
              <StarRate>{recipe.starRate}</StarRate>
              <StarCount>({recipe.starCount})</StarCount>
              <p>조회수 {recipe.viewCount}</p>
            </Indicators>
          </div>
        </Clickable>
      </RecipeBox>
  );
}

const RecipeBox = styled.div`
  width: 100%;
  margin: 15px 0;
`;
const Profile = styled.div`
  width: 100%;
  margin: 8px 8px 8px 0;
  display: flex;
  justify-content: start;
  align-items: center;
`;
const ProfileImg = styled.img`
  width: 35px;
`;
const NickName = styled.p`
  font-size: 14px;
  margin-left: 8px;
  color: black;
`;
const Clickable = styled.div`
  &:hover{
    cursor: pointer;
    color: lightgray;
  }
  &:hover img{
    transform: scale(1.1);
  }
`;
const Thumbnail = styled.div`
  width: 100%;
  padding-bottom: 60%;
  position: relative;
  margin-bottom: 10px;
  border-radius: 15px;
  overflow: hidden;
`;
const ThumbnailImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  transition-duration: 0.2s;
  transition-delay: 0s;
`;
const Title = styled.p`
  color: inherit; // 부모의 색상 따라감
`;
const Indicators = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  font-size: 14px;
  color: #808080;
  margin-top: 10px;
  margin-bottom: 8px;
  @media screen and (max-width: 767px){
    font-size: 12px;
  }
`;
const StarRate = styled.p`
  margin-left: 5px;
`;
const StarCount = styled.p`
  margin-left: 2px;
  margin-right: 8px;
`;
// const ViewCount = styled.p`
//   font-size: 12px;
//   color: black;
//   @media screen and (max-width: 767px){
//     font-size: 10px;
//   }
// `;

export default RecipeView;
