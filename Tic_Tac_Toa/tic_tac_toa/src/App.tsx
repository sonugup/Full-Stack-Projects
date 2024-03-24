import React from 'react';
import logo from './logo.svg';
import './App.css';
import Boxs from './components/Boxs';

function App() {
  return (
    <div className="App">
      <h1>Tic Tac Toa</h1>
      <div className='Tic'>
        <Boxs/>
        <Boxs/>
        <Boxs/>
        <Boxs/>
        <Boxs/>
        <Boxs/>
        <Boxs/>
        <Boxs/>
        <Boxs/>

      </div>
    </div>
  );
}

export default App;
