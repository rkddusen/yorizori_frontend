import React, { useState } from "react";
import styled from "styled-components";
import Category from "./Category"

function CategoryList(props) {
  const { clicked } = props;
  const [category, setCategory] = useState([
    '전체', '한식', '중식', '일식', '양식', '아시안', '분식', '안주', '퓨전', '카페', '편의점', '기타'
  ]);

  return (
    <>
      <CategoryContent>
        <Categories>
          {category.slice(0,6).map((title, index) => (
            <Category key={index} title={title} clicked={clicked === title ? 1 : 0} />
          ))}
        </Categories>
        <Categories>
        {category.slice(6,12).map((title, index) => (
            <Category key={index} title={title} clicked={clicked === title ? 1 : 0} />
          ))}
        </Categories>
      </CategoryContent>
      <CategoryContentMoblie>
        <Categories>
        {category.slice(0,4).map((title, index) => (
            <Category key={index} title={title} clicked={clicked === title ? 1 : 0} />
          ))}
        </Categories>
        <Categories>
        {category.slice(4,8).map((title, index) => (
            <Category key={index} title={title} clicked={clicked === title ? 1 : 0} />
          ))}
        </Categories>
        <Categories>
        {category.slice(8,12).map((title, index) => (
            <Category key={index} title={title} clicked={clicked === title ? 1 : 0} />
          ))}
        </Categories>
      </CategoryContentMoblie>
    </>
  );
}

const CategoryContent = styled.div`
  width: 90%;
  padding: 0 5%;
  display: block;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;
const CategoryContentMoblie = styled.div`
  width: 100%;
  display: none;
  @media screen and (max-width: 767px) {
    display: block;
  }
`;

const Categories = styled.div`
  box-sizing: border-box;
  padding: 0 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media screen and (max-width: 767px) {
    padding: 0 10px;
  }
`;

export default CategoryList;
