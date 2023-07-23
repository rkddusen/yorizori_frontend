import React, { useState } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import { styled } from 'styled-components';
import RecipeView from '../RecipeView'

const MyRecipe = () => {
  const { user } = useUserContext();
  const [recipe, setRecipe] = useState([
    { id: 1, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+'},
    { id: 2, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+'},
    { id: 3, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+'},
    { id: 4, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스스스스스스스스스스스', starRate: '5.0', starCount: '999+', opinionCount: '499+'},
    { id: 5, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+' },
    { id: 6, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+'},
    { id: 7, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+'},
    { id: 8, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+'},
    { id: 9, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+'},
    { id: 10, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+'},
    { id: 11, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+'},
    { id: 12, img: './images/recipe_thumbnail.jpg', title: '소세지 오므라이스', starRate: '5.0', starCount: '999+', opinionCount: '499+'},
  ]);

  return (
    <>
      <RecipeView recipe={recipe} />
    </>
  );
}

export default MyRecipe;