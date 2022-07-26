// need to handle MUI warning when state is set to empty string
//  need to handle handle empty call to API in SearchMonsterListSlice


import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { 
    loadMonsterList,
    selectSearchMonsterList,
} from '../../../features/SearchMonsterListSlice';
import { loadMonster } from '../../../features/MonsterCardSlice';


import { AppDispatch } from '../../../app/store';



// async function APIList(){
        
//     const response = await fetch('https://www.dnd5eapi.co/api/monsters')
//     const monsterListAPI = await response.json();
//     const monsterList = monsterListAPI.results.map((monster: { name: string; }) => monster.name)
//     console.log(monsterList);
// }
// APIList()


const SearchBar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const searchMonsterList = useSelector(selectSearchMonsterList);
    const [searchedMonster,setSearchedMonster] = useState<string | null>(searchMonsterList.monsterListState[0]|| null);
    const [inputValue, setInputValue] = useState('');


    const [options, setOptions] = useState<string[]>([]);
    const [open, setOpen] = useState(false);
    const loading = open && options.length === 0;

    useEffect(()=>{
      // if (loading) {
        dispatch(loadMonsterList())
        console.log('loaded api');
      // }   
    },[dispatch])


    useEffect(() => {
      let active = true;
  
      if (!loading) {
        return undefined;
      }
  
      if (active) {
        setOptions([...searchMonsterList.monsterListState]);
      }
     
  
      return () => {
        active = false;
      };
    }, [searchMonsterList.monsterListState,loading]);

    useEffect(() => {
      if (!open) {
        setOptions([]);
      }
    }, [open]);

    const handleChange = (e:any, searchedMonster:string | null) => {
      setSearchedMonster(searchedMonster);

      if (searchedMonster !== null) {
        dispatch(loadMonster(searchedMonster))
      }

    }

    
    

    return (
      <Autocomplete
        open={open}
        onOpen={() => {
          setOpen(true);
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
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Monster" />}
      />
    );
  }

export default SearchBar;