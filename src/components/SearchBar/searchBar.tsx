
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box,Button,FormControl,Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { 
    loadMonsterList,
    loadMonstersEqualToCR,
    selectSearchMonsterList,
} from '../../features/SearchMonsterListSlice';
import { loadMonster,setShowMonsterCard } from '../../features/MonsterCardSlice';
import { addMonster, calcEncoutnerXP } from '../../features/encounterSlice';

import { AppDispatch } from '../../app/store';


const challegeRatingsList = ['any',0,0.125,0.25,0.5,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

const SearchBar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const searchMonsterList = useSelector(selectSearchMonsterList);
    const [searchedMonster,setSearchedMonster] = useState<string | null>(searchMonsterList[0]|| null);
    const [inputValue, setInputValue] = useState('');
    const [cRInpit, setCRInput] = useState('');


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

    useEffect(() => {
      dispatch(loadMonstersEqualToCR(cRInpit))
    },[dispatch,cRInpit])

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

    const handleCRChange = (event:SelectChangeEvent) =>{
      setSearchedMonster(null);
      setCRInput(event.target.value);
    }
    
    

    return (
      <Box sx={{paddingX:1, marginY:5}}>
        <Grid container spacing={1}>
          <Grid item xs={8}>
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
              sx={{ width: '100%', marginX: 'auto', marginBottom: 2, bgcolor: 'white', padding: .3, borderRadius: 1 }}
              renderInput={(params) => <TextField variant='standard' {...params} label="Monster" />}
            />
          </Grid>
          <Grid item xs={4}>
              <FormControl sx={{width:'100%'}}>
                  <InputLabel id="challegeRating">CR</InputLabel>
                  <Select
                      labelId="challegeRating"
                      id="challegeRatingSelect"
                      value={cRInpit}
                      label="CR"
                      onChange={handleCRChange}
                      sx={{bgcolor:'white',borderRadius:1}}
                  >   
                      {challegeRatingsList.map((CR:number | string,index:number) => <MenuItem key={index} value={CR}>{CR}</MenuItem> )} 
                  </Select>
              </FormControl>
          </Grid>
        </Grid>
        
        <Button variant="contained" color='danger' disableElevation onClick={handleAddMonsterClick}>
          Add Monster
        </Button>
      </Box>
      
    );
  }

export default SearchBar;