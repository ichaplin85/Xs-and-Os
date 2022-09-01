import React from 'react';
import './board.css';
import BoardItem from './BoardItem';

const Board = ({squares, handleClick, square}) => {
  console.log(square);
  return (
    <div className={ `board__wrapper${square === '5' ? '-5' : ''}`}>
      {
        squares.map((item, index) => (
          <BoardItem key={index} value={item} onClick={()=>{handleClick(index)}} square={square}/>
        ))
      }
    </div>
  );
};

export default Board;
