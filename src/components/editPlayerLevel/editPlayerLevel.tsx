import { FormControl, Select, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectEditPlayerIndex, selectLevels, selectPlayers,setPlayerLevel, updateXPTheshholds } from "../../features/playersSlice";


const EditPlayerLevel = () => {

    const dispatch = useDispatch();

    const players = useSelector(selectPlayers);
    const playerIndex = useSelector(selectEditPlayerIndex);
    const editPlayerLevel = players[playerIndex || 0].level;

    const inputLevels = useSelector(selectLevels);

    const handleLevelChange = (event: any) => {
        dispatch(setPlayerLevel(event.target.value));
        dispatch(updateXPTheshholds());
    }


    return (
        <FormControl sx={{ width: '5em' }}>
            <Select
                labelId="playerLevel"
                id="playerLevelSelect"
                value={editPlayerLevel}
                label="##"
                onChange={handleLevelChange}
                sx={{ bgcolor: 'white', borderRadius: 1 }}
            >
                {inputLevels.map((level: number, index: number) => <MenuItem key={index} value={level}>{level}</MenuItem>)}
            </Select>
        </FormControl>
    );

}

export default EditPlayerLevel;
