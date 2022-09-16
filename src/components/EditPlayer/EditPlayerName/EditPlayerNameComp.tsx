import { TextField } from "@mui/material";

interface EditPlayerNameCompProps {
    playerName:string;
    handlePlayerNameChange: (event:React.ChangeEvent<HTMLInputElement>) =>  void;
}

const EditPlayerNameComp = ({playerName,handlePlayerNameChange}:EditPlayerNameCompProps) => {
    return(
        <TextField
            id="playerName"
            label="Player Name"
            variant="standard"
            value={playerName}
            onChange={handlePlayerNameChange}
            sx={{ width: '100%', bgcolor: 'white', padding: .3, borderRadius: 1 }}
        />
    );
}

export default EditPlayerNameComp;