import { createTheme, ThemeProvider, Box } from '@mui/material';
import './App.css';
import SearchBarDrawerCont from './components/SearchBarsDrawer/SearchBarDrawerCont';

declare module '@mui/material/styles' {

  interface Palette {
    danger: Palette['primary'];
    DNDRed: Palette['primary'];
  }
  interface PaletteOptions {
    danger: PaletteOptions['primary'];
    DNDRed: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    danger: true;
  }
}

declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    DNDRed: true;
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
    },
    DNDRed:{
      main:'#b30220',
      contrastText:'#fff',
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
