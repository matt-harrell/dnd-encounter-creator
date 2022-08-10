import React from 'react';
import MonsterCard from './components/MonsterCard/MonsterCard';
import SearchBar from './components/SearchBar/searchBar';
import './App.css';
import { Grid, } from '@mui/material';
import EcounterTable from './components/encounterTable';
import PlayerTable from './components/playersTable';

function App() {
  return (
    <Grid container spacing={2} paddingX={2}>

      <Grid item xs={12} sm={6}>
        <Grid container spacing={2} sx={{paddingY:5}}>
          <Grid item xs={12}>
            <PlayerTable/>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Grid container spacing={2} sx={{paddingY:5}}>
          <Grid item xs={12}>
            <SearchBar />
          </Grid>
          <Grid item xs={12}>
            <EcounterTable/>
          </Grid>
          <Grid item xs={12}>
            <MonsterCard/>
          </Grid>
        </Grid>
      </Grid>     

    </Grid>
    
  );
}

export default App;
