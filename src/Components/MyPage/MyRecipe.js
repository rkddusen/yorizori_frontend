import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import { styled } from 'styled-components';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import RecipeView from '../RecipeView';
import NoRecipe from '../NoRecipe';
import Paging from '../Paging';

const MyRecipe = () => {
  const { user } = useUserContext();
  const [result, setResult] = useState([]);
  const [totalRecipeCount, setTotalRecipeCount] = useState(0);
  const location = useLocation();
  const axiosUrl = process.env.REACT_APP_AXIOS_URL;

  const getRecipe = async (page) => {
    const res = await axios.get(
      `${axiosUrl}/user/get/${user.id}/recipe?pageNo=${page}`
    );
    try {
      let _result = [];
      for (let i = 0; i < res.data.content.length; i++) {
        _result.push(
          <RecipeView
            key={i}
            recipe={
              {
                id: res.data.content[i].id,
                title: res.data.content[i].title,
                thumbnail: res.data.content[i].thumbnail,
                starRate: res.data.content[i].starRate,
                starCount: res.data.content[i].starCount,
                profileImg: res.data.content[i].profileImg,
                nickname: res.data.content[i].nickname,
                viewCount: res.data.content[i].viewCount,
              }
            }
          />
        );
      }
      
      setResult(_result);
      setTotalRecipeCount(res.data.totalElements);
    } catch {
      console.log("오류");
    }
  };
  useEffect(() => {
    if(user !== null){
      const search = new URLSearchParams(location.search);
      const _page = search.get("page") || 1;
      getRecipe(_page-1);
    }
  }, [user, location]);


  return (
    <>
      {result.length ? (
        <>
          <RecipeList>
            {result}
          </RecipeList>
          <Paging pagingCount={Math.ceil(totalRecipeCount / 12)} />
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