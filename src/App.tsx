import { createTheme, ThemeProvider, Box } from '@mui/material';
import './App.css';
import SearchBarDrawerCont from './components/SearchBarsDrawer/SearchBarDrawerCont';

const theme = createTheme({
  palette:{
    secondary:{
      main:'#D2B48C',
      light:'#ebd3b4'
    }
  }
})

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
