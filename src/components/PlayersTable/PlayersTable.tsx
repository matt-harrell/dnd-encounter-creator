import { useSelector,useDispatch } from "react-redux";
import { 
    makePlayerEditable,
    makePlayerNOTEditable,
    findNextHighestPlayer,
    removePlayer,
    selectEditPlayerIndex,
    selectHighestPlayerLevel,
    selectPlayers,
    setTargetEditPlayer,
    selectEasyThreshhold, 
} from "../../features/playersSlice";
import { AppDispatch } from "../../app/store";
import { addClassToClassList, selectClassList } from "../../features/classSearchSlice";
import PlayerTableComp from "./PlayersTableComp";
import { useEffect } from "react";

const PlayerTable = () => {
    const dispatch = useDispatch<AppDispatch>();
    const listOfPlayers = useSelector(selectPlayers);
    const editPlayerIndex = useSelector(selectEditPlayerIndex);
    const playerClassList = useSelector(selectClassList);
    const highestPlayerLevel = useSelector(selectHighestPlayerLevel);
    const easyThreshhold = useSelector(selectEasyThreshhold);

    // when edtting a player
    const playerIndex = useSelector(selectEditPlayerIndex);
    const edittingPlayerClass = listOfPlayers[playerIndex || 0]?.playerClass;
    
    useEffect(() => {
        dispatch(findNextHighestPlayer())
    },[dispatch, easyThreshhold])

    const handleMouseEnter = (index:number) => (e:any) => {
        dispatch(makePlayerEditable(index))
    }

    const handleMouseLeave = (index:number) => (e:any) => {
        dispatch(makePlayerNOTEditable(index))
    }

    const handleRemoveClick = (index:number) => (e:any) =>{
        const playerTobeRemoved = listOfPlayers[index];
        if(playerTobeRemoved.level === highestPlayerLevel){
            dispatch(removePlayer(index))
        } else{
            dispatch(removePlayer(index))
        }
    }

    const handleEditClick = (index:number) => (e:any) =>{
        if (index === editPlayerIndex) {
            const isExisting = playerClassList.some((option: string) => edittingPlayerClass === option);
            
            if (!isExisting) {
                 dispatch(addClassToClassList(edittingPlayerClass));
            }
            
            dispatch(setTargetEditPlayer(null));
            dispatch(makePlayerNOTEditable(index))
            
        } else {
            dispatch(setTargetEditPlayer(index))
        }
        
    }

    return(
        <PlayerTableComp
            listOfPlayers={listOfPlayers}
            editPlayerIndex={editPlayerIndex}
            highestPlayerLevel={highestPlayerLevel}
            handleRemoveClick={handleRemoveClick}
            handleEditClick={handleEditClick}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
        />
    );
}

export default PlayerTable;