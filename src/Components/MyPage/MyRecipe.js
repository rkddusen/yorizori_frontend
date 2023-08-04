import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import { styled } from 'styled-components';
import RecipeView from '../RecipeView';
import NoRecipe from '../NoRecipe';

const MyRecipe = () => {
  const { user } = useUserContext();
  const [result, setResult] = useState([]);

  useEffect(() => {
    let _result = [];
    for(let i = 0; i < 0; i++){
      _result.push(
        <RecipeView
          key={i}
          recipe={
            {
              id: i+1,
              profileImg: "https://yorizori-s3.s3.ap-northeast-2.amazonaws.com/userImage/sample.png",
              nickname: "duyyaa",
              thumbnail: "https://yorizori-s3.s3.ap-northeast-2.amazonaws.com/src/8455f69d-6f83-4a85-9f95-a577c8d807bf.jpg",
              title: "제목",
              starRate: 4.5,
              starCount: 100,
              viewCount: 100,
            }
          }
        />
      )
    }
    setResult(_result);
  },[]);

  return (
    <>
      {result.length ? (
        <>
          <RecipeList>
            {result}
          </RecipeList>
        </>
      ) : (
        <NoRecipe />
      )}
    </>
  );
}

const RecipeList = styled.div`
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

export default MyRecipe;