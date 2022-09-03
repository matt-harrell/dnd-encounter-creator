import {Box, Drawer,IconButton, Toolbar, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InfoIcon from '@mui/icons-material/Info';

interface InfoDrawerCompProps {
  open:boolean;
  color:string;
  toggleDrawer:() => void;
}

const InfoDrawerComp = ({open,color,toggleDrawer}:InfoDrawerCompProps) => {

  return (
    <Box>
      <IconButton onClick={toggleDrawer} aria-label="Explain App">
        <InfoIcon sx={{color:`${color}`}}/>
      </IconButton>
      <Drawer 
        anchor={"right"} 
        open={open} 
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 300, bgcolor:'secondary.light' },
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', alignContent: 'center' }}>
          <IconButton onClick={toggleDrawer} sx={{padding: 0 }}>
            <ChevronRightIcon sx={{ marginY: 'auto', display: 'block' }} />
          </IconButton>
        </Toolbar>
        test
      </Drawer>
    </Box>
  );
}

export default InfoDrawerComp;