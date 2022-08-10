
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
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

    const handleChange = async (e:any, searchedMonster:string | null) => {
      setSearchedMonster(searchedMonster);
      if (searchedMonster !== null){
        try {
          const monster = await dispatch(loadMonster(searchedMonster)).unwrap();
          dispatch(addMonster(monster)) 
          dispatch(calcEncoutnerXP())        
          
        } catch (rejectedValueOrSerializedError) {
          console.log(rejectedValueOrSerializedError)
        }
      }


      // this is old logic when trying to pull up just monster card
      // if (searchedMonster !== null) {
      //   try {
      //     dispatch(loadMonster(searchedMonster)).unwrap()
      //   } catch (rejectedValueOrSerializedError) {
      //     console.log(rejectedValueOrSerializedError)
      //   }        
      // }else {
      //   dispatch(setShowMonsterCard(false))
      // }

    }

    
    

    return (
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
        sx={{ width: 300,marginX:'auto' }}
        renderInput={(params) => <TextField {...params} label="Monster" />}
      />
    );
  }

export default SearchBar;