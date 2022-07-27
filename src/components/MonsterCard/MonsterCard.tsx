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

  


    return (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} sx={{textAlign:'left'}}>
            <Typography>Monster Name</Typography>
            <Typography>Monster alinment</Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{textAlign:'left'}}>
            <Typography>Monster Name</Typography>
            <Typography>Monster alinment</Typography>
          </Grid>
        </Grid>
    );
}

export default MonsterCard;