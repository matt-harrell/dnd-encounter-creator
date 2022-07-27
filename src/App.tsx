import React from 'react';
import logo from './logo.svg';
import MonsterCard from './components/MonsterCard/MonsterCard';
import SearchBar from './components/MonsterCard/SearchBar/searchBar';
import './App.css';
import { Grid, } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Grid container spacing={2} sx={{paddingY:5}}>
        <Grid item xs={12}>
          <SearchBar />
        </Grid>
        <Grid item xs={12}>
          <MonsterCard />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
