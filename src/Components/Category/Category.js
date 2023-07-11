import React from "react";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Category(props) {
  const { title, clicked } = props;
  const navigate = useNavigate();

  const movePage = ({title}) => {
    navigate(`/category?category=${title}`);
  }
  return (
    <StyledCategory onClick={() => movePage({title})}>
      <CategoryImage>
        <CategoryImg style={{borderRadius:'15px'}} src={''} />
      </CategoryImage>
      <CategoryTitle clicked={clicked === 1 ? true : false}>{title}</CategoryTitle>
    </StyledCategory>
  );
}

const StyledCategory = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 20px;
  width: 50px;
  cursor: pointer;
`;

const CategoryImage = styled.div`
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
  border-radius: 15px;
  border: 1px solid #dddddd;
  min-width: 40px;
  flex-shrink: 1;
  &:hover{
    box-shadow: 2px 2px 10px 0px rgb(0,0,0,0.1);
  }
  @media screen and (max-width: 767px){
    width: 40px;
    height: 40px;
  }
`;
const CategoryImg = styled.img`
  width: 50px;
  height: 50px;
  @media screen and (max-width: 767px){
    width: 40px;
    height: 40px;
  }
`;
const CategoryTitle = styled.p`
  font-size: 16px;
  color: ${props => props.clicked ? '#FFA800' : 'reset'};
  font-weight: ${props => props.clicked ? 'bold' : 'regular'};
  @media screen and (max-width: 767px){
    font-size: 12px;
  }
`;

export default Category;
