import React from 'react';
import styled from 'styled-components';
import { Star } from './Evaluation';
import { useNavigate } from 'react-router-dom';
import { ProfileImg } from './ProfileImg';

function RecipeView(props){
  const { recipe } = props;
  const navigate = useNavigate();

  const movePage = (id) => {
    navigate(`/recipe/` + id);
  }

  return(
      <RecipeBox onClick={() => movePage(recipe.id)}>
        <Profile>
          <ProfileImg src={recipe?.profileImg} style={{width: '35px', heigth: '35px'}}/>
          <NickName>{recipe?.nickname}</NickName>
        </Profile>
        <Clickable>
          <Thumbnail>
            <ThumbnailImg src={process.env.REACT_APP_IMG_URL + recipe?.thumbnail} />
          </Thumbnail>
          <div>
            <div>
              <Title>{recipe?.title}</Title>
            </div>
            <Indicators>
              <Star />
              <StarRate>{recipe?.starRate}</StarRate>
              <StarCount>({recipe?.starCount})</StarCount>
              <p>조회수 {recipe?.viewCount}</p>
            </Indicators>
          </div>
        </Clickable>
      </RecipeBox>
  );
}

const RecipeBox = styled.div`
  width: 100%;
  margin: 0 0 30px 0;
`;
const Profile = styled.div`
  width: 100%;
  margin: 8px 8px 8px 0;
  display: flex;
  justify-content: start;
  align-items: center;
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
  @media screen and (max-width: 1023px){
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
