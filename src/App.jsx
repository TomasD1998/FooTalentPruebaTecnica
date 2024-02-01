import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import Header from './components/Header';
import './styles/global.scss';

const App  = () => {
  return (
    <Router>
      <Header/>
      <div className='app'>
        <Routes>
          <Route path = "/" element = {<PokemonList />} />
          <Route path = "/pokemon/:id" element = {<PokemonDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
