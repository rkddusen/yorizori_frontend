import React from 'react';
import { styled } from 'styled-components';

export const ProfileImg = (props) => {
  const { style, src } = props;
  return (
    <StyledProfileImg style={style} src={src} />
  );
}

const StyledProfileImg = styled.img`
  border-radius: 100%;
  border: 1px solid #dfdfdf;
  object-fit: cover;
`;

export const ProfileImgClickable = (props) => {
    const { style, src, onClick } = props;
    return (
      <StyledProfileImgClickable style={style} src={src} onClick={onClick} />
    );
  }
  
  const StyledProfileImgClickable = styled.img`
    border-radius: 100%;
    border: 1px solid #dfdfdf;
    object-fit: cover;
    &:hover{
        cursor: pointer;
    }
  `;
  
  