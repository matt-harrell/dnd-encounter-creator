import { Grid, TextField, FormControl, InputLabel, Select, Button, SelectChangeEvent, MenuItem } from "@mui/material";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { addClassToClassList, selectClassList, selectSelectedClass } from "../features/classSearchSlice";
import { addPlayer, selectLevels } from "../features/playersSlice";

import ClassSearch from "./ClassSearch";


const AddPlayerComp = () =>{
    const dispatch = useDispatch<AppDispatch>();

    const inputLevels = useSelector(selectLevels);
    const playerClass = useSelector(selectSelectedClass);
    const playerClassList = useSelector(selectClassList);

    const [playerLevel, setPlayerLevel] = useState('');
    const [playerName, setPlayerName] = useState('');

    const handleLevelChange = (event: SelectChangeEvent) => {
        setPlayerLevel(event.target.value)
    }
    
    const handlePlayerNameChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setPlayerName(event.target.value)
    }

    const handleAddPlayerClick = () => {
        dispatch(addPlayer({name:playerName,playerClass:playerClass,level:Number(playerLevel),XPThreshhold:{easy:0,medium:0,hard:0,deadly:0}}));
        const isExisting = playerClassList.some((option:string) => playerClass === option);
          if (!isExisting) {
            dispatch(addClassToClassList(playerClass))
          }
        setPlayerName('');
        setPlayerLevel('');
    }

    return (

        <Grid container spacing={2}>
                <Grid item xs={12} sm={5}>
                    <TextField 
                        id="playerName" 
                        label="Player Name" 
                        variant="outlined"
                        value={playerName}
                        onChange={handlePlayerNameChange}
                        sx={{width:'100%'}} 
                    />
                </Grid>
                <Grid item xs={8} sm={5}>
                    <ClassSearch/>
                </Grid>
                <Grid item xs={4} sm={2}>
                    <FormControl sx={{width:'100%'}}>
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

    );
}

export default AddPlayerComp;