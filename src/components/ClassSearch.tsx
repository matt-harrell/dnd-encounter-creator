//  need to use free solo version of this so can type in an class that may not be listed
import { Autocomplete, TextField,createFilterOptions  } from "@mui/material";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import { addClass, loadClassList, selectClassList } from "../features/classSearchSlice";
import { selectPlayers } from "../features/playersSlice";

const filter = createFilterOptions<string>();


const ClassSearch = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(()=>{
        dispatch(loadClassList())
    },[dispatch])

    
    const searchClassList = useSelector(selectClassList);
    const [searchedClass,setSearchedClass] = useState<string | null>(searchClassList[0]||null);
    const listOfPlayers = useSelector(selectPlayers)
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
      setSearchedClass('');
    },[listOfPlayers])

    const handleChange = (e:any,searchClass:string|null) => {
        // console.log('')
        setSearchedClass(searchClass)
        if (searchClass !== null){ 
            dispatch(addClass(searchClass))
        }
    }

    
    

    return (
      <Autocomplete
        freeSolo
        open={open}
        onOpen={() => {
          setOpen(true);
          setSearchedClass('');
        }}
        onClose={() => {
          setOpen(false);
        }}
        loading={loading}
        value={searchedClass}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={options}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
  
          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some((option) => inputValue === option);
          if (inputValue !== '' && !isExisting) {
            filtered.push(inputValue);
          }
  
          return filtered;
        }}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option) {
            return option;
          }
          // Regular option
          return option;
        }}
        renderOption={(props, option) => <li {...props}>{option}</li>}
        sx={{ width:'100%',marginX:'auto', bgcolor:'white',padding:.3,borderRadius:1 }}
        renderInput={(params) => <TextField {...params} label="Classes" variant="standard" />}
      />
    );

}

export default ClassSearch;