import { Grid, TextField, FormControl, InputLabel, Select, Button, SelectChangeEvent, MenuItem } from "@mui/material";


import ClassSearch from "../ClassSearch";

interface AddPlayerCompProps {
    inputLevels:number[];
    playerLevel:string;
    playerName:string;
    handleLevelChange: (event: SelectChangeEvent) => void;
    handlePlayerNameChange: (event:React.ChangeEvent<HTMLInputElement>) => void;
    handleAddPlayerClick: () => void;

    
}



const AddPlayerComp = ({inputLevels, playerLevel, playerName, handleLevelChange, handlePlayerNameChange, handleAddPlayerClick  }:AddPlayerCompProps) =>{

    return (

        <Grid container spacing={2} padding={1} marginBottom={5}>
                <Grid item xs={12}>
                    <TextField 
                        id="playerName" 
                        label="Player Name" 
                        variant="outlined"
                        value={playerName}
                        onChange={handlePlayerNameChange}
                        sx={{width:'100%'}} 
                    />
                </Grid>
                <Grid item xs={8}>
                    <ClassSearch/>
                </Grid>
                <Grid item xs={4}>
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