// add players to table with name and level
// be able to adjust player name and level
import { FormControl, Grid,InputLabel,MenuItem,Select,SelectChangeEvent,TextField,Button,Typography } from "@mui/material";
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { selectEncounterExp } from "../features/encounterSlice";
import { 
    selectLevels,
    addPlayer, 
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
    selectEncounterDifficulty
} from "../features/playersSlice";

const PlayerTable = () => {
    const dispatch = useDispatch();

    const inputLevels = useSelector(selectLevels);
    const listOfPlayers = useSelector(selectPlayers)
    const encounterExp = useSelector(selectEncounterExp);
    const easyThresholdXP = useSelector(selectEasyThreshhold);
    const mediumThresholdXP = useSelector(selectMediumThreshhold);
    const hardThresholdXP = useSelector(selectHardThreshhold);
    const deadlyThresholdXP = useSelector(selectDeadlyThreshhold);
    const encounterDifficulty = useSelector(selectEncounterDifficulty);

    const [playerLevel, setPlayerLevel] = useState('');
    const [playerName, setPlayerName] = useState('');
    
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

    const handleLevelChange = (event: SelectChangeEvent) => {
        setPlayerLevel(event.target.value)
    }
    
    const handlePlayerNameChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setPlayerName(event.target.value)
    }

    const handleAddPlayerClick = () => {
        dispatch(addPlayer({name:playerName,level:Number(playerLevel),XPThreshhold:{easy:0,medium:0,hard:0,deadly:0}}));
        setPlayerName('');
        setPlayerLevel('');
    }
    
    

    return(
        <>
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <TextField 
                        id="playerName" 
                        label="Player Name" 
                        variant="outlined"
                        value={playerName}
                        onChange={handlePlayerNameChange}
                        sx={{width:'100%'}} 
                    />
                </Grid>
                <Grid item xs={2}>
                    <FormControl sx={{minWidth:90}}>
                        <InputLabel id="playerLevel">Level</InputLabel>
                        <Select
                            labelId="playerLevel"
                            id="playerLevelSelect"
                            value={playerLevel}
                            label="Level"
                            onChange={handleLevelChange}
                        >   
                            {inputLevels.map((level:number,index:number) => <MenuItem key={index} value={level}>{level}</MenuItem> )} 
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" disableElevation onClick={handleAddPlayerClick}>
                        Add Player
                    </Button>
                </Grid>
            </Grid>
            <Typography component={'h2'} variant={'h6'}>The Ecounter is curretly: {encounterDifficulty}</Typography>
            <Typography component={'h2'} variant={'h6'}>XP Threshholds for the Party</Typography>
            <Grid container spacing={2} sx={{paddingY:1}}>
                <Grid item xs={12} sm={3}>
                    Easy: {easyThresholdXP}
                </Grid>
                <Grid item xs={12} sm={3}>
                    Medium: {mediumThresholdXP}
                </Grid>
                <Grid item xs={12} sm={3}>
                    Hard: {hardThresholdXP}
                </Grid>
                <Grid item xs={12} sm={3}>
                    Deadly: {deadlyThresholdXP}
                </Grid>
            </Grid>
            {listOfPlayers.length !==0 && (
                <>
                    {listOfPlayers.map((player,index) => (
                        <Grid container key={index} spacing={2} sx={{paddingY:.5,alignItems:'center'}}>
                            <Grid item xs={8}>{player.name}</Grid>
                            <Grid item xs={4}>{player.level}</Grid>
                        </Grid>
                    ))}
                </>
            )}
        </>
    );
}

export default PlayerTable;