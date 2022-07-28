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
  console.log(monsterCardContent);
  
  
  


    return (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} sx={{textAlign:'left'}}>
            <Typography component={'h2'} variant={'h3'}>Monster Name</Typography>
            <Typography component={'p'} variant={'body1'}>{`size`} {`type`} {`alighnment`}</Typography>
            <hr />
            <Grid container spacing={1}>
              {/* need to make a function to calc bonuses in monstercardslice some sort of conditional will work */}
              <Grid item xs={2}>
                <Typography>STR</Typography>
                <Typography>{`statMods[1]`}</Typography>
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