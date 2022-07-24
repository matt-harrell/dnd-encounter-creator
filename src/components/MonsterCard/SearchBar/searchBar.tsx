import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { 
    loadMonsterList,
    selectSearchMonsterList,
} from '../../../features/SearchMonsterListSlice';
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

    useEffect(()=>{
        dispatch(loadMonsterList())
    },[])

    
    

    return (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={searchMonsterList.monsterListState}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Monster" />}
      />
    );
  }

export default SearchBar;