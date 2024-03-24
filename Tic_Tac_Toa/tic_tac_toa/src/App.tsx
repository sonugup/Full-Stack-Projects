import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Boxs from './components/Boxs';

function App() {
  const [state, setState]=useState(Array(9).fill(null));

  const [current, setCurrent]=useState("X")

  const checkWinner = (state: string[]) => {
    const win=[
      [0,1 , 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for(let i=0; i<win.length; i++){
      const [a, b, c]=win[i];
      if( state[a] !==null && state[a]===state[b] && state[a]===state[c]) return true
    };
    return false;
  }
  const handleBoxs=(index:number)=> {
    const findvalue=Array.from(state);

    if(findvalue[index] !== null) return;
    findvalue[index]=current;

    const win=checkWinner(findvalue);

    if(win){
      alert(`${current} Won The Game`);
    }
    setCurrent(current === "X"? "O":"X");
    setState(findvalue);
  }
  console.log(state)
  return (
    <div className="App">
      <h1>Tic Tac Toa</h1>
      <div className='Tic'>
        <Boxs onClick={() => handleBoxs(0)} value={state[0]} />
        <Boxs onClick={() => handleBoxs(1)} value={state[1]}/>
        <Boxs onClick={() => handleBoxs(2)} value={state[2]}/>
        <Boxs onClick={() => handleBoxs(3)} value={state[3]}/>
        <Boxs onClick={() => handleBoxs(4)} value={state[4]}/>
        <Boxs onClick={() => handleBoxs(5)} value={state[5]}/>
        <Boxs onClick={() => handleBoxs(6)} value={state[6]}/>
        <Boxs onClick={() => handleBoxs(7)} value={state[7]}/>
        <Boxs onClick={() => handleBoxs(8)} value={state[8]}/>

      </div>
    </div>
  );
}

export default App;
