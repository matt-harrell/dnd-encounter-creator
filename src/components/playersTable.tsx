// add players to table with name and level
// be able to adjust player name and level
import { FormControl, Grid,InputLabel,MenuItem,Select,SelectChangeEvent,Typography } from "@mui/material";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { selectLevels } from "../features/playersSlice";

const PlayerTable = () => {
    const inputLevels = useSelector(selectLevels);
    const [playerLevel, setPlayerLevel] = useState(''); 

    const handleLevelChange = (event: SelectChangeEvent) => {
        setPlayerLevel(event.target.value)
    } 

    return(
        <>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <FormControl sx={{minWidth:90}}>
                        <InputLabel id="player-level">Level</InputLabel>
                        <Select
                            labelId="player-level"
                            id="player-level-select"
                            value={playerLevel}
                            label="Level"
                            onChange={handleLevelChange}
                        >   
                            {inputLevels.map((level:number,index:number) => <MenuItem key={index} value={level}>{level}</MenuItem> )} 
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={2}>

            </Grid>
        </>
    );
}

export default PlayerTable;