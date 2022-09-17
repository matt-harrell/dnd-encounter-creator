import { SelectChangeEvent } from "@mui/material";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { addClassToClassList, selectClassList, selectSelectedClass } from "../../features/classSearchSlice";
import { calcEncoutnerXP } from "../../features/encounterSlice";
import { addPlayer, selectLevels, selectPlayers } from "../../features/playersSlice";
import AddPlayerComp from "./AddPlayerComp";

const AddPlayerCont = () =>{

    const dispatch = useDispatch<AppDispatch>();

    const inputLevels = useSelector(selectLevels);
    const playerClass = useSelector(selectSelectedClass);
    const playerClassList = useSelector(selectClassList);

    const [playerLevel, setPlayerLevel] = useState('');
    const [playerName, setPlayerName] = useState('');

    const players = useSelector(selectPlayers);


    useEffect(() =>{
        dispatch(calcEncoutnerXP(players.length))
    },[players.length,dispatch])

    const handleLevelChange = (event: SelectChangeEvent) => {
        setPlayerLevel(event.target.value)
    }
    
    const handlePlayerNameChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setPlayerName(event.target.value)
    }

    const handleAddPlayerClick = () => {
        dispatch(addPlayer({name:playerName,playerClass:playerClass,level:Number(playerLevel),XPThreshhold:{easy:0,medium:0,hard:0,deadly:0}}));
        const isExisting = playerClassList.some((option:string) => playerClass === option);
          if (!isExisting) {
            dispatch(addClassToClassList(playerClass))
          }
        setPlayerName('');
        setPlayerLevel('');
    }

    
        
    
    return(
        <AddPlayerComp
        // need to make interface in AddPlayerComp
            inputLevels = {inputLevels}
            playerLevel = {playerLevel}
            playerName = {playerName}
            handleLevelChange = {handleLevelChange}
            handlePlayerNameChange = {handlePlayerNameChange}
            handleAddPlayerClick = {handleAddPlayerClick}

        />
    );
}

export default AddPlayerCont;