import { Grid,Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";

import { selectListOfMonsters, selectEncounterExp, monsterType } from "../../features/encounterSlice";


const EcounterTable = () => {
    const monsterList = useSelector(selectListOfMonsters);
    const encounterExp = useSelector(selectEncounterExp);
    // console.log(monsterList);
    

    return (
    <>
    {monsterList.length !==0 && (
        <>
            {monsterList.map((monster,index) => (
                <Grid container spacing={2} key={index}>
                    <Grid item xs={12} sm={6}>{monster.name}</Grid>
                    <Grid item xs={6} sm={3}>{monster.xp}</Grid>
                    <Grid item xs={6} sm={3}>{monster.challenge_rating}</Grid>
                </Grid>
            ))}
        </>
    )}
    
        
    </>
    );
}

export default EcounterTable;