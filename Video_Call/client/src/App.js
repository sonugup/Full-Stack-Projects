import { Route, Routes } from 'react-router-dom';
import './App.css';
import LobScreen from './screen/LobScreen';
import Rooms from './screen/Rooms';

function App() {
  return (
    <div className="App">
     <h1>Video Call App</h1>
     <Routes>
      <Route path='/' element={<LobScreen/>} />
      <Route path='/rooms/:roomId' element={<Rooms/>} />

     </Routes>
    </div>
  );
}

export default App;
