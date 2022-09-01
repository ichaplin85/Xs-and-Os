import React, {useEffect, useState} from 'react';
import Board from './Board';
import './game.css'

const Game = ({xName, oName, addWinsStatic, square = 3}) => {
  const [board, setBoard] = useState(Array(square**2).fill(null));
  const [xNext, setxNext] = useState(true);
  const [winner, setWinner] = useState('');
  const [boardIndex, setBoardIndex] = useState()


  useEffect(() => {
    const lines3 = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const lines5 = [
      // gorizontal
      [0, 1, 2, 3],
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [6, 7, 8, 9],
      [10, 11, 12, 13],
      [11, 12, 13, 14],
      [15, 16, 17, 18],
      [16, 17, 18, 19],
      [20, 21, 22, 23],
      [21, 22, 23, 24],
      // diagonal
      [0, 6, 12, 18],
      [6, 12, 18, 24],
      [5, 11, 17, 23],
      [1, 7, 13, 19],
      [3, 7, 11, 15],
      [4, 8, 12, 16],
      [8, 12, 16, 20],
      [9, 13, 17, 21],
      // vertikal
      [0, 5, 10, 15],
      [5, 10, 15, 20],
      [1, 6, 11, 16],
      [6, 11, 16, 21],
      [2, 7, 12, 17],
      [7, 12, 17, 21],
      [3, 8, 13, 18],
      [8, 13, 18, 23],
      [4, 9, 14, 19],
      [9, 14, 19, 24]
    ]

    const lines = square === 3 ? lines3 : lines5;

    let winingPosInd = 0;
    let newWinner = '';

    while(winingPosInd < lines.length && !newWinner) {
      const boardPositionToCheck = lines[winingPosInd];

      const boardValueToCheck = boardPositionToCheck.map(index => board[index]);

      const checkingValue = boardValueToCheck[0];
      const isFinished = boardValueToCheck.every((value) => value === checkingValue && checkingValue);
      newWinner = isFinished ? checkingValue : null;
      winingPosInd++;
    }

    if (newWinner) {
      setWinner(newWinner)
      addWinsStatic(newWinner);
    }

  }, [board])

  const statitics = () => {
    return (
      <div className='wrapper__statisctics'>
        <h3 className='wrapper__statisctics-title'>Статистика:</h3>
        <div className='wrapper__statisctics-item'>{xName.name + ': ' + xName.wins}</div>
        <div className='wrapper__statisctics-item'>{oName.name + ': ' + oName.wins}</div>
      </div>
    )
  }

  const handleClick = (index) => {
    const boardCopy = [...board];

    if (winner || boardCopy[index]) return;

    boardCopy[index] = xNext ? 'X' : '0';
    setBoard(boardCopy);
    setxNext(!xNext);
    setBoardIndex(index);
  }

  const resetGames = () => {
    setBoard(Array(square**2).fill(null))
    setxNext(true);
    setWinner('')
  }

  const newGame = () => {
    return (
      <button className='btn' onClick={() => {resetGames()}}>Reset Game</button>
    )
  }

  const winnerGame = () => {
    return (
      <div className='wrapper__winner'> {winner ? 'Победитель ' + (winner === 'X' ? xName.name : oName.name) : 'Сейчас ход ' + (xNext ? xName.name : oName.name)}</div>
    )
  }

  const declineHandler = () => {
    if (winner) return;
    if (!boardIndex) return;
    const boardCopy = [...board];

    boardCopy[boardIndex] = null;
    setBoard(boardCopy);
    setxNext(!xNext);
    setBoardIndex(null);
  }

  return (
    <div className='wrapper'>
      {statitics()}
      {newGame()}
      <Board squares={board} handleClick={handleClick} square={square}/>
      {winnerGame()}
      <button className='btn' onClick={declineHandler}>Отмена хода</button>
    </div>
  );
};

export default Game;
