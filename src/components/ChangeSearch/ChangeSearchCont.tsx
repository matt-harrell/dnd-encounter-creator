import { useDispatch,useSelector } from "react-redux";

import { selectShowMonsterSearch, toggleShowMonsterSearch } from "../../features/changeSearchBarSlice";
import ChangeSearchComp from "./ChangeSearchComp";


const ChangeSearchCont = () => {
    const dispatch = useDispatch();
    const showMonsterSearch = useSelector(selectShowMonsterSearch)

    const handleSwitchInputClick = () =>{
        dispatch(toggleShowMonsterSearch(showMonsterSearch ? false : true))
    }

    return(
        <ChangeSearchComp
            showMonsterSearch={showMonsterSearch}
            handleSwitchInputClick = {handleSwitchInputClick}
        />
    );
}

export default ChangeSearchCont;