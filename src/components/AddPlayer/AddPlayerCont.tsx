import { SelectChangeEvent } from "@mui/material";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { addClassToClassList, selectClassList, selectSelectedClass } from "../../features/classSearchSlice";
import { calcEncoutnerXP } from "../../features/encounterSlice";
import { addPlayer,selectLevels, selectPlayers,selectHighestPlayerLevel,changeHighestPlayerLevel } from "../../features/playersSlice";
import { changePlayerName, selectInputPlayerName, selectIsPlayerClassEmtpy, selectIsPlayerLevelEmtpy, selectIsPlayerNameEmtpy, togglePlayerClassEmtpy, togglePlayerLevelEmtpy, togglePlayerNameEmpty } from "../../features/searchBarsDrawerSlice";
import AddPlayerComp from "./AddPlayerComp";

const AddPlayerCont = () =>{

    const dispatch = useDispatch<AppDispatch>();

    const inputLevels = useSelector(selectLevels);
    const playerClass = useSelector(selectSelectedClass);
    const playerClassList = useSelector(selectClassList);
    const IsPlayerClassEmtpy = useSelector(selectIsPlayerClassEmtpy);

    const [playerLevel, setPlayerLevel] = useState('');
    const IsPlayerLevelEmtpy = useSelector(selectIsPlayerLevelEmtpy);
    const playerName = useSelector(selectInputPlayerName);
    const IsPlayerNameEmtpy = useSelector(selectIsPlayerNameEmtpy);
    const highestPlayerLevel = useSelector(selectHighestPlayerLevel);

    const players = useSelector(selectPlayers);


    useEffect(() =>{
        dispatch(calcEncoutnerXP(players.length))
    },[players.length,dispatch])

    useEffect(() =>{
        if (playerName !== ''){
            dispatch(togglePlayerNameEmpty(false))
        }
    },[playerName,dispatch])

    useEffect(() =>{
        if (playerClass !== '' || playerClass !== null){
            dispatch(togglePlayerClassEmtpy(false))
        }
    },[playerClass,dispatch])

    useEffect(() =>{
        if (playerLevel !== ''){
            dispatch(togglePlayerLevelEmtpy(false))
        }
    },[playerLevel,dispatch])

    const handleLevelChange = (event: SelectChangeEvent) => {
        setPlayerLevel(event.target.value)
    }
    
    const handlePlayerNameChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changePlayerName(event.target.value));
    }

    const handleAddPlayerClick = () => {
        if (playerName === '' || playerClass === ('' || null) || playerLevel === ''){
            if(playerName === ''){
                dispatch(togglePlayerNameEmpty(true))
            }else if(IsPlayerNameEmtpy){
                dispatch(togglePlayerNameEmpty(false))
            }
            if(playerClass === '' || playerClass === null){
                dispatch(togglePlayerClassEmtpy(true))
            } else if(IsPlayerClassEmtpy){
                dispatch(togglePlayerClassEmtpy(false))
            }
            if(playerLevel === ''){
                dispatch(togglePlayerLevelEmtpy(true))
            } else if(IsPlayerLevelEmtpy){
                dispatch(togglePlayerLevelEmtpy(false))
            }
        } else {
            if(IsPlayerNameEmtpy){
                dispatch(togglePlayerNameEmpty(false));
            }
            if(IsPlayerClassEmtpy){
                dispatch(togglePlayerClassEmtpy(false))
            }
            if(IsPlayerLevelEmtpy){
                dispatch(togglePlayerLevelEmtpy(false))
            }

            dispatch(addPlayer({ name: playerName, playerClass: playerClass, level: Number(playerLevel), XPThreshhold: { easy: 0, medium: 0, hard: 0, deadly: 0 },UIElements:{elevation:0,showEditX:false}}));
            const isExisting = playerClassList.some((option: string) => playerClass === option);
            if (!isExisting) {
                dispatch(addClassToClassList(playerClass))
            }

            if (Number(playerLevel) > highestPlayerLevel){
                dispatch(changeHighestPlayerLevel(Number(playerLevel)))
            }
            
            dispatch(changePlayerName(''));
            setPlayerLevel('');
        }
        
    }

    
        
    
    return(
        <AddPlayerComp
            inputLevels = {inputLevels}
            playerLevel = {playerLevel}
            playerName = {playerName}
            playerClass={playerClass}
            IsPlayerLevelEmtpy={IsPlayerLevelEmtpy}
            IsPlayerNameEmtpy={IsPlayerNameEmtpy}
            handleLevelChange = {handleLevelChange}
            handlePlayerNameChange = {handlePlayerNameChange}
            handleAddPlayerClick = {handleAddPlayerClick}

        />
    );
}

export default AddPlayerCont;