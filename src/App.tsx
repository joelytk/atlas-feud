import { useState } from 'react';

import Board from './components/Board';

import SplashScreen from './screens/SplashScreen';
import WinnerScreen from './screens/WinnerScreen';

const App = () => {
  const [winner, setWinner] = useState('');

  return (
    <>
      <SplashScreen />
      {winner && <WinnerScreen winner={winner} />}
      <Board setWinner={setWinner} />
    </>
  );
};

export default App;
