import { Autocomplete, TextField,createFilterOptions, Typography  } from "@mui/material";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import { addClass, loadClassList, selectClassList, selectSelectedClass } from "../features/classSearchSlice";
import { selectPlayers } from "../features/playersSlice";
import { selectIsPlayerClassEmtpy } from "../features/searchBarsDrawerSlice";

const filter = createFilterOptions<string>();


const ClassSearch = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(()=>{
        dispatch(loadClassList())
    },[dispatch])

    
    const searchClassList = useSelector(selectClassList);
    const playerClass = useSelector(selectSelectedClass);
    const IsPlayerClassEmtpy = useSelector(selectIsPlayerClassEmtpy);
    const listOfPlayers = useSelector(selectPlayers);
    const [inputValue, setInputValue] = useState('');


    const [options, setOptions] = useState<string[]>([]);
    const [open, setOpen] = useState(false);
    const loading = open && options.length === 0;

   
    useEffect(() => {
        let active = true;
    
        if (!loading) {
          return undefined;
        }
    
        if (active) {            
          setOptions([...searchClassList]);
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

    useEffect(() =>{
       dispatch(addClass(''));
    },[listOfPlayers,dispatch])

    const handleChange = (e:any,searchClass:string|null) => {
        dispatch(addClass(searchClass))
        if (searchClass !== null){ 
            dispatch(addClass(searchClass))
        }
    }

    
    

    return (
      <>
        <Autocomplete
          freeSolo
          open={open}
          onOpen={() => {
            setOpen(true);
            dispatch(addClass(''));
          }}
          onClose={() => {
            setOpen(false);
          }}
          loading={loading}
          value={playerClass}
          onChange={handleChange}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          options={options}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
    
            const { inputValue } = params;
            const isExisting = options.some((option) => inputValue === option);
            if (inputValue !== '' && !isExisting) {
              filtered.push(inputValue);
            }
    
            return filtered;
          }}
          getOptionLabel={(option) => {
            if (typeof option === 'string') {
              return option;
            }
            if (option) {
              return option;
            }
            return option;
          }}
          renderOption={(props, option) => <li {...props}>{option}</li>}
          sx={{ width:'100%',marginX:'auto', bgcolor:'white',padding:.3,borderRadius:1 }}
          renderInput={(params) => <TextField {...params} label="Classes" variant="standard" />}
        />
        {IsPlayerClassEmtpy && <Typography component='p' variant='caption' color='error'>Player Class required</Typography>}
      </>
    );

}

export default ClassSearch;