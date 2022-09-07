import {Box, Divider, Drawer,IconButton, Toolbar, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HelpIcon from '@mui/icons-material/Help';
import MenuIcon from '@mui/icons-material/Menu';
import ChallengeRatingToolTip from '../ToolTips/ChallengeRatingToolTip';

interface InfoDrawerCompProps {
  open:boolean;
  color:string;
  toggleDrawer:() => void;
}

const InfoDrawerComp = ({open,color,toggleDrawer}:InfoDrawerCompProps) => {

  return (
    <Box>
      <IconButton onClick={toggleDrawer} aria-label="Explain App">
        <HelpIcon fontSize='large' sx={{color:`${color}`}}/>
      </IconButton>
      <Drawer 
        anchor={"right"} 
        open={open} 
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 300, bgcolor:'secondary.light' },
        }}
      >
        <Toolbar sx={{alignContent: 'center' }}>
          <IconButton onClick={toggleDrawer} sx={{padding:0,marginRight:1}}>
            <ChevronRightIcon sx={{ marginY: 'auto', display: 'block' }} />
          </IconButton>
          <Typography component={'h3'} variant={'h6'}>
            About the App
          </Typography>
        </Toolbar>
        <Box sx={{padding:2}}>
          <Typography component={'p'}>
            The purpose of the app is to help Dungeon Master's create combat encounters 
            for the board game Dungeons and Dragons without having to perform manual 
            calculations on making the encounter balanced. This <a target="_blank" href='https://www.dndbeyond.com/sources/basic-rules/building-combat-encounters' rel="noreferrer">article</a> provides a full 
            walkthrough of the manual process of building an encounter without the help 
            of this app performing the computations. 
          </Typography>
        </Box>
        <Divider/>
        <Box sx={{padding:2}}>
          <Typography component={'h3'} variant={'h6'}>
              How to use the App:
          </Typography>
          <Box sx={{paddingLeft:2}}>
            <ol style={{paddingLeft:0}}>
              <li className='d-none-mobile pb-1'>Click on the right "<MenuIcon fontSize='small' sx={{verticalAlign:'middle'}}/>" to open the “Add Players/Monsters” drawer.</li>
              <li className='pb-1'>First add your players by adding the name,class, and level the click add player.</li>
              <li className='pb-1'>
                After you have added all your players, add any monster you wish by clicking the “Monsters” 
                search bar and typing in a monster’s name. You can also sort monsters by their <ChallengeRatingToolTip/> or CR.
              </li>
              <li className="pb-1">When you add monsters to the encounter, the top Difficulty Display will automatically update showing how difficult it will be for the players.</li>
              <li className="pb-1">
                There are 4 difficulties.
                <ul style={{paddingLeft:5}}>
                  <li><b>Easy</b>: An easy encounter doesn’t tax the characters’ resources or put them in serious peril. They might lose a few hit points, but victory is pretty much guaranteed.</li>
                  <li><b>Medium</b>: A medium encounter usually has one or two scary moments for the players, but the characters should emerge victorious with no casualties. One or more of them might need to use healing resources.</li>
                  <li><b>Hard</b>: A hard encounter could go badly for the adventurers. Weaker characters might get taken out of the fight, and there’s a slim chance that one or more characters might die.</li>
                  <li><b>Deadly</b>: A deadly encounter could be lethal for one or more player characters. Survival often requires good tactics and quick thinking, and the party risks defeat.</li>
                </ul>
              </li>
              <li className="pb-1">
                Below the Difficulty is the “XP Thresholds for the Party”. Whichever number is closest to the total monster XP will determine the difficulty of the encounter. For example if we have adventuring party of four level 1 adventures then our XP Thresholds would be:
                <ul style={{paddingLeft:5,marginTop:10,marginBottom:10}}>
                  <li>Easy:100 XP</li>
                  <li>Medium:200 XP</li>
                  <li>Hard:300 XP</li>
                  <li>Deadly:400 XP</li>
                </ul>
                If these adventures are going against 3 Goblins with a total Monster XP value of 300 then the difficulty of the encounter would be Hard since our player Hard XP Threshold is 300.  
              </li>
              <li className="pb-1">You can also view a monster’s stat block by pressing the “View” button on the monster.</li>
            </ol>
          </Box>
        </Box>
        
      </Drawer>
    </Box>
  );
}

export default InfoDrawerComp;