import React, {useCallback, useState} from 'react';
import './app.css'
import Game from './Game';

function App() {
  const [xName, setxName] = useState({name: '',wins: 0});
  const [oName, setoName] = useState({name: '',wins: 0});
  const [startGame, setStartGame] = useState(false);
  const [square, setSquare] = useState(3);

  // const resetGameNames = () => {
  //   setStartGame(false);
  //   setoName('');
  //   setxName('');
  // }

  const addWinsStatic = useCallback((name) => {
    if (name === 'X') {
      setxName(prev => ({...prev, wins: xName.wins + 1}))
    } else {
      setoName(prev => ({...prev, wins: oName.wins + 1}))
    }
  }, [oName.wins, xName.wins])

  const handleClick = (e) => {
    if (e.target.closest('[data-value]')) {
      setSquare(e.target.dataset.value);
      console.log(square);
    }
  }

  const inputs = () => {
    return (
      <>
        <input 
          required 
          type="text" 
          placeholder='Enter X name' 
          value={xName.name} 
          onChange={(e) => setxName(prev => ({...prev, name: e.target.value}))} 
          className="wrapper__input"
        />
        <input 
          required 
          type="text" 
          placeholder='Enter O name' 
          value={oName.name} 
          onChange={(e) => setoName(prev => ({...prev, name: e.target.value}))}
          className="wrapper__input"
        />
        <div className='wrapper-pole' onClick={handleClick}>
          <div className='pole' data-value="3">3x3</div>
          <div className='pole' data-value="5">5x5</div>
          <div className='pole' data-value="10">10x10</div>
        </div>
        <button className='btn' onClick={() => setStartGame(true)}>start game</button>
      </>
    )
  }
  
  return (
    <div className="App">
      {!startGame ? inputs() : <Game square={square} xName={xName} oName ={oName} addWinsStatic={addWinsStatic}/>}
    </div>
  );
}

export default App;
