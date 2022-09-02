import { useState,useEffect } from 'react';
import {Box, Drawer,IconButton, Toolbar, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


import InfoIcon from '@mui/icons-material/Info';
import { selectEncounterDifficulty } from '../../features/playersSlice';
import { useSelector } from 'react-redux';


const InfoDrawerComp = () => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState<string>("white");
  const encounterDifficulty = useSelector(selectEncounterDifficulty);

  useEffect(() => {
    if(encounterDifficulty === 'Medium'){
      setColor('#000000')
    }else{
      setColor('#fff')
    }
  }, [encounterDifficulty]);

  const toggleDrawer = () => {
    setOpen(open ? false : true);
  };

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