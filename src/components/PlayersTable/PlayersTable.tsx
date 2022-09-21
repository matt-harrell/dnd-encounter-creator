import { useSelector,useDispatch } from "react-redux";
import { 
    changeElevation,
    findNextHighestPlayer,
    removePlayer,
    selectEditPlayerIndex,
    selectHighestPlayerLevel,
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
    const highestPlayerLevel = useSelector(selectHighestPlayerLevel);

    // when edtting a player
    const playerIndex = useSelector(selectEditPlayerIndex);
    const edittingPlayerClass = listOfPlayers[playerIndex || 0]?.playerClass;    

    const handleMouseEnter = (index:number) => (e:any) => {
        dispatch(changeElevation(index))
    }

    const handleMouseLeave = (index:number) => (e:any) => {
        dispatch(changeElevation(index))
    }


    const handleRemoveClick = (index:number) => (e:any) =>{
        const playerTobeRemoved = listOfPlayers[index];
        if(playerTobeRemoved.level === highestPlayerLevel){
            dispatch(removePlayer(index))
            dispatch(findNextHighestPlayer())
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
            
            dispatch(setTargetEditPlayer(null))
            
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