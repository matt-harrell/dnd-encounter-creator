import { 
        Grid,
        AppBar,
        Box,
        CssBaseline,
        Divider,
        Drawer,
        IconButton,
        Typography,
        Toolbar
       } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';

import PlayerTable from '../playersTable';
import EcounterTable from '../encounterTable';
import MonsterCard from '../MonsterCard/MonsterCard';
import AddPlayerCont from '../AddPlayer/AddPlayerCont';
import DifficultyDisplay from '../DifficultyDisplay/DifficultyDisplay';
import MonsterSearch from '../SearchBar/MonsterSearch';

interface SearchBarDrawerCompProps {
  mobileOpen:boolean,
  handleDrawerToggle:() => void;
  handleDrawerClose:() => void;
}

const drawerWidth = 300;

const SearchBarDrawerComp = ({mobileOpen,handleDrawerToggle, handleDrawerClose}:SearchBarDrawerCompProps) => {

  const drawer = (
    <Box>
      <Toolbar sx={{justifyContent:'space-between',alignContent:'center'}}>
        <Typography component={'h3'} variant={'h6'}>
            Add Players/Monsters
        </Typography>
        <IconButton onClick={handleDrawerClose} sx={{display:{xs:'block',sm:'none'},padding:0}}>
            <ChevronLeftIcon sx={{marginY:'auto',display:'block'}} />
        </IconButton>  
      </Toolbar>
      <Divider />
      <AddPlayerCont/>
      <Divider />
      <MonsterSearch/>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        color='DNDRed'
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' },alignSelf:'start' }}
          >
            <MenuIcon />
          </IconButton>
          <DifficultyDisplay/>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor:'secondary.light' },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor:'secondary.light' },
            bgcolor:'secondary.main'
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ 
            flexGrow: 1, 
            p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` },
            marginTop:{xs:16,sm:15,md:12},
            bgcolor:'secondary.main'
          }}
      >
        <Grid container spacing={2} paddingX={2}>
            <Grid item xs={12}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <PlayerTable/>
                </Grid>
            </Grid>
            </Grid>

            <Grid item xs={12}>
            <Grid container spacing={2} sx={{paddingY:5}}>
                <Grid item xs={12}>
                <EcounterTable/>
                </Grid>
                <Grid item xs={12}>
                <MonsterCard/>
                </Grid>
            </Grid>
            </Grid>     

        </Grid>
      </Box>
    </Box>
  );
}


export default SearchBarDrawerComp;