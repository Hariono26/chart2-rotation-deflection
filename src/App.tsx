import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Deflection from './Deflection';
import DeflectionSingle from './DeflectionSingle';
import Rotation from './Rotation';
import RotationSingle from './RotationSingle';

function App() {
  return (
    <div className="App">
      {/* <Deflection/>
      <Rotation/> */}
      <DeflectionSingle/>
      <RotationSingle/>
    </div>
  );
}

export default App;
