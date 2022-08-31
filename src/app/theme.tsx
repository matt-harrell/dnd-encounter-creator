import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {

    interface Palette {
      danger: Palette['primary'];
      DNDRed: Palette['primary'];
      DNDGreen: Palette['primary'];
      DNDYellow: Palette['primary'];
      DNDOrange: Palette['primary'];
    }
    interface PaletteOptions {
      danger: PaletteOptions['primary'];
      DNDRed: PaletteOptions['primary'];
      DNDGreen: PaletteOptions['primary'];
      DNDYellow: PaletteOptions['primary'];
      DNDOrange: PaletteOptions['primary'];
    }
  }
  
  declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
      danger: true;
    }
  }
  
  declare module '@mui/material/AppBar' {
    interface AppBarPropsColorOverrides {
      danger: true;
      DNDRed: true;
      DNDGreen: true;
      DNDYellow: true;
      DNDOrange: true;
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
      },
      DNDGreen:{
        main:'#43a047',
        contrastText:'#fff',
      },
      DNDYellow:{
        main:'#ffeb3b',
        contrastText:'#000000',
      },
      DNDOrange:{
        main:'#ef6c00',
        contrastText:'#fff',
      },
      
    }
  })

  export default theme;