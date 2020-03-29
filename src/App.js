import React from 'react';
import TrainList from '../src/components/TrainList/TrainList';
import { CookiesProvider } from 'react-cookie';
import './App.css';

function App() {
  return (
    <CookiesProvider>
      <div className="App">
        <TrainList />
      </div>
    </CookiesProvider>
  );
}

export default App;
