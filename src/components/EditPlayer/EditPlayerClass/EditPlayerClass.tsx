//  need to use free solo version of this so can type in an class that may not be listed
import { createFilterOptions  } from "@mui/material";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { selectClassList } from "../../../features/classSearchSlice";
import { selectEditPlayerIndex, selectPlayers, setPlayerClass } from "../../../features/playersSlice";
import EditPlayerClassComp from "./EditPlayerClassComp";

const filter = createFilterOptions<string>();


const EditPlayerClass = () => {
    const dispatch = useDispatch<AppDispatch>();
    
    const searchClassList = useSelector(selectClassList);
    const listOfPlayers = useSelector(selectPlayers)
    const [inputValue, setInputValue] = useState('');
    const playerIndex = useSelector(selectEditPlayerIndex);
    const playerClass = listOfPlayers[playerIndex || 0].playerClass;


    const [options, setOptions] = useState<string[]>([]);
    const [open, setOpen] = useState(false);
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;
    
        if (!loading) {
          return undefined;
        }
    
        if (active) {            
          setOptions(searchClassList);
        }
       
    
        return () => {
          active = false;
        };
      }, [searchClassList,loading]);

    useEffect(() => {
      if (!open) {
        setOptions([]);
      }
    }, [open]);

  const handleChange = (e: any, searchClass: string | null) => {
    if (searchClass !== null) {
      dispatch(setPlayerClass(searchClass))
    }
  }

  const handleInputChange = (e: any, newInputValue: string) => {
    setInputValue(newInputValue);
  }

    const toggleOpen = () => {
      open ? setOpen(false) : setOpen(true);
    }

    
    return (
      <EditPlayerClassComp
        open={open}
        loading={loading}
        playerClass={playerClass}
        handleChange={handleChange}
        handleInputChange={handleInputChange}
        toggleOpen={toggleOpen}
        inputValue={inputValue}
        options={options}
        filter={filter}
      />
    );

}

export default EditPlayerClass;