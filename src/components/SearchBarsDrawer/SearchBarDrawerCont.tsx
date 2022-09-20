import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import SearchBarDrawerComp from "./SearchBarDrawerComp";
import { selectEncounterDifficulty } from "../../features/playersSlice";

export type AppBarColor = "primary" |"danger" | "DNDRed" | "DNDGreen" | "DNDYellow" | "DNDOrange";

const SearchBarDrawerCont = () => {    
    const [mobileOpen, setMobileOpen] = useState(false);
    const [color,setColor] = useState<AppBarColor>("primary");
    const encounterDifficulty = useSelector(selectEncounterDifficulty);

    useEffect(()=>{
        switch (encounterDifficulty) {
            case "No Monsters":
                setColor("primary")
                break;
            case "Easy":
                setColor("DNDGreen")
                break;
            case "Medium":
                setColor("DNDYellow")
                break;
            case "Hard":
                setColor("DNDRed")
                break;
            case "Deadly":
                setColor("danger")
                break;
        
            default:
                break;
        }
    },[encounterDifficulty])
      
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
      
    const handleDrawerClose = () => {
        setMobileOpen(false);
    }
    
    
    return(
        <SearchBarDrawerComp
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            handleDrawerClose={handleDrawerClose}
            color={color}
        />
    );
}

export default SearchBarDrawerCont;