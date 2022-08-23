import { Grid, Button, Paper, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from "react-redux";

import { selectListOfMonsters, removeMonster, calcEncoutnerXP, selectEncounterExp } from "../features/encounterSlice";
import { setMonsterCardContent, setShowMonsterCard, showMonsterCard } from "../features/MonsterCardSlice";


const EcounterTable = () => {
    const monsterList = useSelector(selectListOfMonsters);
    const showMonster = useSelector(showMonsterCard);
    const encounterExp = useSelector(selectEncounterExp);
    const dispatch = useDispatch();

    const handleViewClick = (index:number) => (e:any) =>{
        dispatch(setShowMonsterCard(true))
        dispatch(setMonsterCardContent(monsterList[index]))
    }
    const handleRemoveClick = (index:number) => (e:any) =>{
        if(showMonster){
            dispatch(setShowMonsterCard(false))
        }
        dispatch(removeMonster(index))
        dispatch(calcEncoutnerXP()) // possibly refactor to use useeffect like in playersTable 
    }
    
    return (
    <>
    {monsterList.length !==0 && (
        <>
        <Grid container spacing={1}>
            <Grid item xs={12} sm={'auto'}>
                <Typography component={'h2'} variant={'h5'}>Monsters <Typography sx={{display:{xs:'none',sm:'inline'}}} variant={'h5'}>|</Typography></Typography>
            </Grid>
            <Grid item xs={12} sm={'auto'}>
                <Typography component={'h2'} variant={'h5'}>Total Encoutner XP:{encounterExp}</Typography>
            </Grid>
        </Grid>
        
            {monsterList.map((monster,index) => (
                <Paper elevation={4} sx={{marginY:2,padding:1,bgcolor:'danger.main'}} key={index}>
                    <Grid container spacing={1}  sx={{alignItems:'center'}} color={'white'}>
                        <Grid item xs={12} md={4}>
                            <Typography>{monster.name}</Typography>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Typography>XP: {monster.xp}</Typography>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <Typography>CR: {monster.challenge_rating}</Typography>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <Button variant="contained" disableElevation onClick={handleViewClick(index)}>
                                View
                            </Button>
                        </Grid>
                        <Grid item xs={1}>
                            <Button  sx={{padding:'6px',minWidth:'fit-content'}} color="error" variant="contained" disableElevation onClick={handleRemoveClick(index)} >
                                <CloseIcon/>
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            ))}
        </>
    )}
    
        
    </>
    );
}

export default EcounterTable;