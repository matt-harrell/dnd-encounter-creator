import React from 'react';
import MonsterCard from './components/MonsterCard/MonsterCard';
import SearchBar from './components/MonsterCard/SearchBar/searchBar';
import './App.css';
import { Grid, } from '@mui/material';
import EcounterTable from './components/MonsterCard/encounterTable';

function App() {
  return (
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
  );
}

export default App;
