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
import SearchBar from '../SearchBar/searchBar';

interface SearchBarDrawerCompProps {
  mobileOpen:boolean,
  handleDrawerToggle:() => void;
  handleDrawerClose:() => void;
}

const drawerWidth = 300;

const SearchBarDrawerComp = ({mobileOpen,handleDrawerToggle, handleDrawerClose}:SearchBarDrawerCompProps) => {

  const drawer = (
    <div>
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
      <SearchBar/>
    </div>
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
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
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
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Grid container spacing={2} paddingX={2}>
            <Grid item xs={12}>
            <Grid container spacing={2} sx={{paddingY:5}}>
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