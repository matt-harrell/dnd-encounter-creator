import { Grid, Button, Paper, Typography, Grow } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from "react-redux";
import { scroller } from "react-scroll";

import { selectListOfMonsters, removeMonster, calcEncoutnerXP, selectEncounterExp } from "../features/encounterSlice";
import { setMonsterCardContent, setShowMonsterCard, showMonsterCard } from "../features/MonsterCardSlice";
import CRToolTip from "./ToolTips/CRToolTip";
import { selectPlayers } from "../features/playersSlice";
import { useState } from "react";


const EcounterTable = () => {
    const monsterList = useSelector(selectListOfMonsters);
    const showMonster = useSelector(showMonsterCard);
    const encounterExp = useSelector(selectEncounterExp);
    const players = useSelector(selectPlayers);
    const dispatch = useDispatch();
    const [mouseOnMonster,setMouseOnMonster] = useState<null | number>(null)

    const handleViewClick = (index:number) => async (e:any) =>{
        await dispatch(setMonsterCardContent(monsterList[index]));
        await dispatch(setShowMonsterCard(true));
        scroller.scrollTo('monsterCard', {
            duration: 500,
            delay: 100,
            smooth: true,
            offset: -150,
          })
    }
    const handleRemoveClick = (index:number) => (e:any) =>{
        if(showMonster){
            dispatch(setShowMonsterCard(false))
        }
        dispatch(removeMonster(index))
        dispatch(calcEncoutnerXP(players.length))
    }
    const handleMouseEnter = (monsterIndex:number) => (e:any) => {
        setMouseOnMonster(monsterIndex);
    }
    const handleMouseLeave = (e:any) => {
        setMouseOnMonster(null);
    }
    
    return (
    <>
    {monsterList.length !==0 && (
        <>
        <Grid container spacing={1} sx={{marginTop:2}}>
            <Grid item xs={12} sm={'auto'}>
                <Typography component={'h2'} variant={'h5'}>Monsters <Typography sx={{display:{xs:'none',sm:'inline'}}} component={'span'} variant={'h5'}>|</Typography></Typography>
            </Grid>
            <Grid item xs={12} sm={'auto'}>
                <Typography component={'h2'} variant={'h5'}>Total Encoutner XP:{encounterExp}</Typography>
            </Grid>
        </Grid>
        
            {monsterList.map((monster,index) => (
                <Paper elevation={mouseOnMonster === index ? 4 : 0} sx={{marginY:2,padding:1,bgcolor:'danger.main',maxWidth:'40em'}} key={index} onMouseEnter={handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
                    <Grid container spacing={1}  sx={{alignItems:'center'}} color={'white'}>
                        <Grid item xs={12} lg={mouseOnMonster === index ? 4 : 5}>
                            <Typography>{monster.name}</Typography>
                        </Grid>
                        <Grid item xs={6} lg={mouseOnMonster === index ? 3 : 4}>
                            <Typography>XP: {monster.xp}</Typography>
                        </Grid>
                        <Grid item xs={6} lg={mouseOnMonster === index ? 2 : 3} sx={{textAlign:{xs:'right',md:mouseOnMonster === index ? 'left' : 'right'}}}>
                            <Typography><CRToolTip/> {monster.challenge_rating}</Typography>
                        </Grid>
                        <Grid item xs={6} lg={2} sx={{display:mouseOnMonster === index ? 'block' : 'none'}}>
                            <Grow in={mouseOnMonster === index}>
                                <Button variant="contained" disableElevation onClick={handleViewClick(index)}>
                                    View
                                </Button>
                            </Grow>
                        </Grid>
                        <Grid item xs={6} lg={1} sx={{textAlign:'right',display:mouseOnMonster === index ? 'block' : 'none'}}>
                            <Grow in={mouseOnMonster === index}>
                                <Button  sx={{padding:'6px',minWidth:'fit-content'}} color="error" variant="contained" disableElevation onClick={handleRemoveClick(index)} >
                                    <CloseIcon/>
                                </Button>
                            </Grow>
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