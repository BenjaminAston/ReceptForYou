import React from 'react';
import Home from '../pages/Home';
import '../styles/global.css';

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>ReceptForYou Test</h1>
      </header>
      <main className="container">
        <Home />
      </main>
    </div>
  );
}

export default App;
