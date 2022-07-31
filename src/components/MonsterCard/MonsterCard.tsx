import { useDispatch,useSelector } from "react-redux";
import {
  selectMonsterCard,
  loadMonster,
  isMonsterLoading,
  failedToLoadMonster,
  
} from "../../features/MonsterCardSlice";
import { AppDispatch } from "../../app/store";
import { Grid,Typography,Box } from "@mui/material";


const MonsterCard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const monsterCardContent = useSelector(selectMonsterCard);
  let speedString = '';


  // condioanl logic to render speed for testing needs to be deleted after done
  if (monsterCardContent.speed === undefined) {
  } else {
    let speedType:string[] = [];
    for (const moveType in monsterCardContent.speed)
    if (moveType === 'walk'){
      speedType.push(monsterCardContent.speed[moveType])
    } else{
      speedType.push(`${moveType} ${monsterCardContent.speed[moveType]}`)
    }
     speedString = speedType.join();
  }
  
  
  
  


    return (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} sx={{textAlign:'left'}}>
            <Typography component={'h2'} variant={'h3'}>Monster Name</Typography>
            <Typography component={'p'} variant={'body1'}>{`size`} {`type`} {`alighnment`}</Typography>
            <hr />
            <Box>
            <Typography component={'p'} variant={'body1'}>Armor Class{`armor_class`}</Typography>
            <Typography component={'p'} variant={'body1'}>Hit Points {`hit_points`} ({`hit_dice`})</Typography>
            <Typography>Speed:</Typography>
            </Box>
            <hr />
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <Typography>STR</Typography>
                <Typography>statMods[1]</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>DEX</Typography>
                <Typography>statMods[2]</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>CON</Typography>
                <Typography>statMods[3]</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>INT</Typography>
                <Typography>statMods[4]</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>WIS</Typography>
                <Typography>statMods[5]</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>CHA</Typography>
                <Typography>statMods[6]</Typography>
              </Grid>              
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} sx={{textAlign:'left'}}>
            <Typography>Monster Name</Typography>
            <Typography>Monster alinment</Typography>
          </Grid>
        </Grid>
    );
}

export default MonsterCard;