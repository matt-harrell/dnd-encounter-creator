import { useSelector,useDispatch } from "react-redux";
import { 
    removePlayer,
    selectEditPlayerIndex,
    selectPlayers,
    setTargetEditPlayer, 
} from "../../features/playersSlice";
import { AppDispatch } from "../../app/store";
import { addClassToClassList, selectClassList } from "../../features/classSearchSlice";
import PlayerTableComp from "./PlayersTableComp";

const PlayerTable = () => {
    const dispatch = useDispatch<AppDispatch>();
    const listOfPlayers = useSelector(selectPlayers);
    const editPlayerIndex = useSelector(selectEditPlayerIndex);
    const playerClassList = useSelector(selectClassList);

    // when edtting a player
    const playerIndex = useSelector(selectEditPlayerIndex);
    const edittingPlayerClass = listOfPlayers[playerIndex || 0]?.playerClass;

    const handleRemoveClick = (index:number) => (e:any) =>{
        dispatch(removePlayer(index))
    }

    const handleEditClick = (index:number) => (e:any) =>{
        if (index === editPlayerIndex) {
            const isExisting = playerClassList.some((option: string) => edittingPlayerClass === option);
            
            if (!isExisting) {
                 dispatch(addClassToClassList(edittingPlayerClass));
            }
            
            dispatch(setTargetEditPlayer(null))
            
        } else {
            dispatch(setTargetEditPlayer(index))
        }
        
    }

    return(
        <PlayerTableComp
            listOfPlayers={listOfPlayers}
            editPlayerIndex={editPlayerIndex}
            handleRemoveClick={handleRemoveClick}
            handleEditClick={handleEditClick}
        />
    );
}

export default PlayerTable;