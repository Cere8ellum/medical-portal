import React, { useEffect, useRef, useState } from 'react';
import { getImageUrl } from '../utils/getUrl';
import styles from '../styles/adminka.module.css';
interface Props {
  title: string;
  index: number;
  handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const NavTag = ({ title, handleClick, index }: Props) => {
  return (
    <div
      className={`${styles['nav_tag']}`}
      onClick={handleClick}
      tabIndex={index}
    >
      <img src={getImageUrl(title)} />
      <h5>{title}</h5>
    </div>
  );
};

export default NavTag;
