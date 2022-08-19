import SearchBar from "../SearchBar/searchBar";
import AddPlayerCont from "../AddPlayer/AddPlayerCont";
import { Button } from "@mui/material";

interface ChangeSearchCompProps {
    showMonsterSearch:boolean;
    handleSwitchInputClick: () => void;
}

const ChangeSearchComp = ({showMonsterSearch, handleSwitchInputClick}: ChangeSearchCompProps) => {

    
    
    return (
        <>
            <Button variant="contained" disableElevation onClick={handleSwitchInputClick}>
                {showMonsterSearch ? "Add Player?" : "Add Monster?"}
            </Button>
            {showMonsterSearch ? <SearchBar/> : <AddPlayerCont/> }  
        </>
    );
}

export default ChangeSearchComp;