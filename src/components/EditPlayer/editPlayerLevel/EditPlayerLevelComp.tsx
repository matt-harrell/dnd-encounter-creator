import { FormControl, Select, MenuItem } from "@mui/material";

interface EditPlayerLevelCompProps {
    editPlayerLevel:number;
    handleLevelChange:(e:any) => void;
    inputLevels:number[];
}

const EditPlayerLevelComp = ({editPlayerLevel,handleLevelChange,inputLevels}:EditPlayerLevelCompProps) => {

    return (
        <FormControl sx={{ maxWidth: '5em' }}>
            <Select
                labelId="playerLevel"
                id="playerLevelSelect"
                value={editPlayerLevel}
                label=""
                onChange={handleLevelChange}
                sx={{ bgcolor: 'white', borderRadius: 1 }}
            >
                {inputLevels.map((level: number, index: number) => <MenuItem key={index} value={level}>{level}</MenuItem>)}
            </Select>
        </FormControl>
    );
}

export default EditPlayerLevelComp;