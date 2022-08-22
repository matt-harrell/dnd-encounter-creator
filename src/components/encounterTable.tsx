import { Grid, Button, Paper } from "@mui/material";
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
        <Grid container spacing={2} sx={{paddingBottom:5}}>
            <Grid item xs={12} sm={12}>Total Encoutner XP:{encounterExp}</Grid>
        </Grid>
            {monsterList.map((monster,index) => (
                <Paper elevation={4} sx={{marginY:2,padding:1,bgcolor:'secondary.light'}} key={index}>
                    <Grid container spacing={1}  sx={{alignItems:'center'}} >
                        <Grid item xs={12} md={4}>{monster.name}</Grid>
                        <Grid item xs={6} md={3}>XP: {monster.xp}</Grid>
                        <Grid item xs={6} md={2}>CR: {monster.challenge_rating}</Grid>
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