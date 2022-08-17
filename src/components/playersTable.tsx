import { Grid,Button,Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { selectEncounterExp } from "../features/encounterSlice";
import { 
    removePlayer,
    selectPlayers, 
    changedifficulty, 
    selectEasyThreshhold,
    setEasyThreshhold,
    selectMediumThreshhold,
    setMediumThreshhold,
    selectHardThreshhold,
    setHardThreshhold,
    selectDeadlyThreshhold,
    setDeadlyThreshhold,
    selectEncounterDifficulty,
} from "../features/playersSlice";
import { AppDispatch } from "../app/store";
import AddPlayerComp from "./AddPlayerComp";

const PlayerTable = () => {
    const dispatch = useDispatch<AppDispatch>();
    const listOfPlayers = useSelector(selectPlayers)
    const encounterExp = useSelector(selectEncounterExp);
    const easyThresholdXP = useSelector(selectEasyThreshhold);
    const mediumThresholdXP = useSelector(selectMediumThreshhold);
    const hardThresholdXP = useSelector(selectHardThreshhold);
    const deadlyThresholdXP = useSelector(selectDeadlyThreshhold);
    const encounterDifficulty = useSelector(selectEncounterDifficulty);
    
    useEffect(() => {
        // const calcDifficulty = () => {
        // if (encounterExp !== 0){
 
          const easyThresholds = listOfPlayers.map((player) => player.XPThreshhold.easy);
          const easyValue = 0;
          const calcEasyThreshhold = easyThresholds.reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          easyValue
          );
          dispatch(setEasyThreshhold(calcEasyThreshhold))
    
          const mediumThresholds = listOfPlayers.map((player) => player.XPThreshhold.medium);
          const mediumValue = 0;
          const calcMediumThreshhold = mediumThresholds.reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          mediumValue
          );
          dispatch(setMediumThreshhold(calcMediumThreshhold))
    
          const hardThresholds = listOfPlayers.map((player) => player.XPThreshhold.hard);
          const hardValue = 0;
          const calcHardThreshhold = hardThresholds.reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          hardValue
          );
          dispatch(setHardThreshhold(calcHardThreshhold))
    
          const deadlyThresholds = listOfPlayers.map((player) => player.XPThreshhold.deadly);
          const deadlyValue = 0;
          const calcDeadlyThreshhold = deadlyThresholds.reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          deadlyValue
          );
          dispatch(setDeadlyThreshhold(calcDeadlyThreshhold))
    
    
          if (encounterExp === 0) {
              dispatch(changedifficulty('No Monsters Added'));
          } else if ((encounterExp >= calcEasyThreshhold && encounterExp < calcMediumThreshhold) || encounterExp <= calcEasyThreshhold){
              dispatch(changedifficulty('Easy'));
          } else if (encounterExp >= calcMediumThreshhold && encounterExp < calcHardThreshhold){
              dispatch(changedifficulty('Medium'));
          } else if (encounterExp >= calcHardThreshhold && encounterExp < calcDeadlyThreshhold){
              dispatch(changedifficulty('Hard'));
          } else if (encounterExp >= calcDeadlyThreshhold){
              dispatch(changedifficulty('Deadly'));
          }
        // }
             
        // }
      },[encounterExp,dispatch,listOfPlayers])
    
    const handleRemoveClick = (index:number) => (e:any) =>{
        dispatch(removePlayer(index))
    }

    return(
        <>
            <Typography component={'h2'} variant={'h6'}>Difficulty: {encounterDifficulty}</Typography>
            <Typography component={'h2'} variant={'h6'}>XP Threshholds for the Party</Typography>
            <Grid container spacing={2} sx={{paddingY:1,marginBottom:5}}>
                <Grid item xs={6} sm={3}>
                    Easy: {easyThresholdXP}
                </Grid>
                <Grid item xs={6} sm={3}>
                    Medium: {mediumThresholdXP}
                </Grid>
                <Grid item xs={6} sm={3}>
                    Hard: {hardThresholdXP}
                </Grid>
                <Grid item xs={6} sm={3}>
                    Deadly: {deadlyThresholdXP}
                </Grid>
            </Grid>

            <AddPlayerComp/>

            {listOfPlayers.length !==0 && (
                <>
                    {listOfPlayers.map((player,index) => (
                        <Grid container key={index} spacing={2} sx={{paddingY:.5,alignItems:'center',marginTop:2}}>
                            <Grid item xs={4}>
                                <Typography component={'p'} variant={'body1'}>{player.name}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography component={'p'} variant={'body1'}>{player.playerClass}</Typography>   
                            </Grid>
                            <Grid item xs={2}>
                                <Typography component={'p'} variant={'body1'} >{player.level}</Typography>
                            </Grid>
                            <Grid item xs={2} sm={1}>
                                <Button  sx={{padding:'1px',minWidth:'fit-content'}} color="error" variant="contained" disableElevation onClick={handleRemoveClick(index)} >
                                    <CloseIcon/>
                                </Button>
                            </Grid>
                        </Grid>
                    ))}
                </>
            )}
        </>
    );
}

export default PlayerTable;