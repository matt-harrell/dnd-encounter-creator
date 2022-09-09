import { useSelector,useDispatch } from "react-redux";
import { selectEditPlayerIndex, selectPlayers, setPlayerName } from "../../../features/playersSlice";
import EditPlayerNameComp from "./EditPlayerNameComp";

const EditPlayerName = () => {

    const dispatch = useDispatch();

    const players = useSelector(selectPlayers);
    const playerIndex = useSelector(selectEditPlayerIndex);
    const playerName = players[playerIndex || 0].name;
    
    const handlePlayerNameChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPlayerName(event.target.value))
    }
    
    return (
        <EditPlayerNameComp
            playerName={playerName}
            handlePlayerNameChange={handlePlayerNameChange}
        />
    );
}
export default EditPlayerName; 