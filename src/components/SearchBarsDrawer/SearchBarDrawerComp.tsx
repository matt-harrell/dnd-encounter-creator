import { 
        Grid,
        AppBar,
        Box,
        CssBaseline,
        Divider,
        Drawer,
        IconButton,
        Typography,
        Toolbar,
        Stack,
       } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';

import PlayerTable from '../PlayersTable/PlayersTable';
import EcounterTable from '../encounterTable';
import MonsterCard from '../MonsterCard/MonsterCard';
import AddPlayerCont from '../AddPlayer/AddPlayerCont';
import DifficultyDisplay from '../DifficultyDisplay/DifficultyDisplay';
import MonsterSearch from '../MonsterSearch/MonsterSearch';
import { AppBarColor } from './SearchBarDrawerCont';
import InfoDrawer from '../InfoDrawer/InfoDrawer';

interface SearchBarDrawerCompProps {
  mobileOpen:boolean,
  handleDrawerToggle:() => void;
  handleDrawerClose:() => void;
  color:AppBarColor;
}

const drawerWidth = 300;

const SearchBarDrawerComp = ({color,mobileOpen,handleDrawerToggle, handleDrawerClose}:SearchBarDrawerCompProps) => {

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
          transition: "background-color .4s"
        }}
        color={color}
      >
        <Box sx={{display:'flex',paddingX:2,flexDirection:{xs:'column',sm:'row'}}}>
          <Stack direction={'row'} justifyContent={{xs:'space-between',sm:'flex-end'}} sx={{order:{xs:1,sm:2}}}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' },alignSelf:'start' }}
            >
              <MenuIcon fontSize='large' />
            </IconButton>
            <InfoDrawer/>
          </Stack>
          <Box sx={{order:{xs:2,sm:1},width:'100%',alignItem:'start'}}>
            <DifficultyDisplay/>
          </Box>
        </Box>
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
            marginTop:{xs:22,sm:15,md:12},
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