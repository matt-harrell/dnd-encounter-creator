import React from 'react';
import logo from './logo.svg';
import MonsterCard from './components/MonsterCard/MonsterCard';
import SearchBar from './components/MonsterCard/SearchBar/searchBar';
import './App.css';

function App() {
  return (
    <div className="App">
      <SearchBar/>
      <MonsterCard/>
    </div>
  );
}

export default App;
