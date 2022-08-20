
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box,Button } from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { 
    loadMonsterList,
    selectSearchMonsterList,
} from '../../features/SearchMonsterListSlice';
import { loadMonster,setShowMonsterCard } from '../../features/MonsterCardSlice';
import { addMonster, calcEncoutnerXP } from '../../features/encounterSlice';

import { AppDispatch } from '../../app/store';


const SearchBar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const searchMonsterList = useSelector(selectSearchMonsterList);
    const [searchedMonster,setSearchedMonster] = useState<string | null>(searchMonsterList[0]|| null);
    const [inputValue, setInputValue] = useState('');


    const [options, setOptions] = useState<string[]>([]);
    const [open, setOpen] = useState(false);
    const loading = open && options.length === 0;

    // get the monster list
    useEffect(()=>{
        dispatch(loadMonsterList())
    },[dispatch])

    // 
    useEffect(() => {
      let active = true;
  
      if (!loading) {
        return undefined;
      }
  
      if (active) {
        setOptions([...searchMonsterList]);
      }
     
  
      return () => {
        active = false;
      };
    }, [searchMonsterList,loading]);

    useEffect(() => {
      if (!open) {
        setOptions([]);
      }
    }, [open]);

    const handleChange = (e:any, searchedMonster:string | null) => {
      setSearchedMonster(searchedMonster);
      

    }

    const handleAddMonsterClick = async () => {
      if (searchedMonster !== null){
        try {
          const monster = await dispatch(loadMonster(searchedMonster)).unwrap();
          dispatch(addMonster(monster)) 
          dispatch(calcEncoutnerXP())                  
          
        } catch (rejectedValueOrSerializedError) {
          console.log(rejectedValueOrSerializedError)
        }
      }
    }

    
    

    return (
      <Box sx={{paddingX:1, marginY:5}}>
        <Autocomplete
          open={open}
          onOpen={() => {
            setOpen(true);
            setSearchedMonster(null);
            dispatch(setShowMonsterCard(false))
          }}
          onClose={() => {
            setOpen(false);
          }}
          loading={loading}
          value={searchedMonster}
          onChange={handleChange}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          options={options}
          sx={{ width: '100%',marginX:'auto',marginBottom:2 }}
          renderInput={(params) => <TextField {...params} label="Monster" />}
        />
        <Button variant="contained" disableElevation onClick={handleAddMonsterClick}>
          Add Monster
        </Button>
      </Box>
      
    );
  }

export default SearchBar;