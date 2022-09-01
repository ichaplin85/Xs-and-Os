import React from 'react';
import './boarditem.css';

const BoardItem = ({value, onClick, square}) => {
  return (
    <div className={`board__item${square === '5' ? '-5' : ''}`} onClick={onClick}>
     {value}

    </div>
  );
};

export default BoardItem;
