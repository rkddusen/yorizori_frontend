import React, { useState } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import { styled } from 'styled-components';
import TipView from '../TipView'

const MyTip = () => {
  const { user } = useUserContext();
  const [tip, setTip] = useState([
    { id: 1, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
    { id: 2, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
    { id: 3, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
    { id: 4, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
    { id: 5, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
    { id: 6, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
    { id: 7, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
    { id: 8, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
    { id: 9, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
    { id: 10, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
    { id: 11, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
    { id: 12, img: './images/tip_thumbnail.jpg', title: '팁 제목', heartCount: '999+', opinionCount: '499+' },
  ]);
  
  return (
    <>
      <TipView tip={tip} />
    </>
  );
}

export default MyTip;