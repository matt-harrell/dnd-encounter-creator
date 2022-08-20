import { useState } from "react";

import SearchBarDrawerComp from "./SearchBarDrawerComp";



const SearchBarDrawerCont = () => {    
    const [mobileOpen, setMobileOpen] = useState(false);
      
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
        />
    );
}

export default SearchBarDrawerCont;