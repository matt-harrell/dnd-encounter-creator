import { Grid, Button } from "@mui/material";
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
        dispatch(calcEncoutnerXP()) 
    }
    
    return (
    <>
    {monsterList.length !==0 && (
        <>
        <Grid container spacing={2} sx={{paddingBottom:5}}>
            <Grid item xs={12} sm={12}>Total Encoutner XP:{encounterExp}</Grid>
        </Grid>
            {monsterList.map((monster,index) => (
                <Grid container spacing={2} key={index} sx={{paddingY:.5,alignItems:'center'}} >
                    <Grid item xs={12} sm={4}>{monster.name}</Grid>
                    <Grid item xs={6} sm={3}>XP: {monster.xp}</Grid>
                    <Grid item xs={6} sm={1}>CR: {monster.challenge_rating}</Grid>
                    <Grid item xs={6} sm={3}>
                        <Button variant="contained" disableElevation onClick={handleViewClick(index)}>
                            View Monster
                        </Button>
                    </Grid>
                    <Grid item xs={1} sm={1}>
                        <Button  sx={{padding:'6px',minWidth:'fit-content'}} color="error" variant="contained" disableElevation onClick={handleRemoveClick(index)} >
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

export default EcounterTable;