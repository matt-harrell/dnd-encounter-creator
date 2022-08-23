import { createTheme, ThemeProvider, Box } from '@mui/material';
import './App.css';
import SearchBarDrawerCont from './components/SearchBarsDrawer/SearchBarDrawerCont';

declare module '@mui/material/styles' {

  interface Palette {
    danger: Palette['primary'];
  }
  interface PaletteOptions {
    danger: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    danger: true;
  }
}


const theme = createTheme({
  palette:{
    secondary:{
      main:'#D2B48C',
      light:'#ebd3b4'
    },
    danger:{
      main:'#660000',
      dark:'#390101',
      contrastText: '#fff',
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
