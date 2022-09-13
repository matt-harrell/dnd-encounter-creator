import { useDispatch, useSelector } from "react-redux";
import { selectEditPlayerIndex, selectLevels, selectPlayers,setPlayerLevel, updateXPTheshholds } from "../../../features/playersSlice";
import EditPlayerLevelComp from "./EditPlayerLevelComp";


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
        <EditPlayerLevelComp
            editPlayerLevel={editPlayerLevel}
            handleLevelChange={handleLevelChange}
            inputLevels={inputLevels}
        />
    );

}

export default EditPlayerLevel;
