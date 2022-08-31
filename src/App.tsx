import {  ThemeProvider, Box } from '@mui/material';
import './App.css';

import theme from './app/theme';
import SearchBarDrawerCont from './components/SearchBarsDrawer/SearchBarDrawerCont';



function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{bgcolor:'secondary.main',height:'100%'}}>
        <SearchBarDrawerCont/>
      </Box>
    </ThemeProvider>
  );
}

export default App;
