import MonsterSearchComp from "./MonsterSearchComp";
import { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { 
    loadMonsterList,
    loadMonstersEqualToCR,
    selectSearchMonsterList,
} from '../../features/SearchMonsterListSlice';
import { loadMonster,setShowMonsterCard } from '../../features/MonsterCardSlice';
import { addMonster, calcEncoutnerXP } from '../../features/encounterSlice';

import { AppDispatch } from '../../app/store';
import { SelectChangeEvent } from "@mui/material";
import { selectHighestPlayerLevel, selectPlayers } from "../../features/playersSlice";



const MonsterSearch = () => {

    const dispatch = useDispatch<AppDispatch>();
    const searchMonsterList = useSelector(selectSearchMonsterList);
    const [searchedMonster, setSearchedMonster] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [cRInpit, setCRInput] = useState('');
    const [options, setOptions] = useState<string[]>([]);
    const [open, setOpen] = useState(false);
    const loading = open && options.length === 0;
    const [disabled, setDisabled] = useState(false);
    const [label,setLabel] = useState('Monster');
    const highestPlayerLevel = useSelector(selectHighestPlayerLevel); 

    const players = useSelector(selectPlayers);

    useEffect(() => {
        dispatch(loadMonsterList())
    }, [dispatch])

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        if (active) {
            const justMonsterNames = searchMonsterList.map(monster => monster.name)
            setOptions([...justMonsterNames]);
        }


        return () => {
            active = false;
        };
    }, [searchMonsterList, loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    useEffect(() => {
        if(cRInpit !== ''){
            dispatch(loadMonstersEqualToCR(cRInpit))
        }  
    }, [dispatch, cRInpit])
    
    useEffect(() =>{
        if (searchMonsterList.length === 0){
            setDisabled(true);
            setLabel('No Options')
        } else{
            setDisabled(false);
            setLabel('Monsters')
        }
    },[searchMonsterList.length])

    useEffect(() => {
        if(highestPlayerLevel === 0){
            setCRInput('');
        } else{
            setCRInput(String(highestPlayerLevel));
        }
    },[highestPlayerLevel])

    

    const handleChange = (e: any,searchedMonster: string | null) => {
        setSearchedMonster(searchedMonster);
    }

    const handleAddMonsterClick = async () => {
        const monsterIndex = searchMonsterList.find(monster => monster.name === searchedMonster)
        if (monsterIndex !== undefined) {
            try {
                const monster = await dispatch(loadMonster(monsterIndex.index)).unwrap();
                dispatch(addMonster(monster))
                dispatch(calcEncoutnerXP(players.length))

            } catch (rejectedValueOrSerializedError) {
                console.log(rejectedValueOrSerializedError)
            }
        }
    }

    const handleCRChange = (event: SelectChangeEvent) => {
        setSearchedMonster(null);
        setCRInput(event.target.value);
    }

    const handleOpen = () => {
        setOpen(true);
        setSearchedMonster(null);
        dispatch(setShowMonsterCard(false));
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleInputChange = (newInputValue:string) => {
        setInputValue(newInputValue);
    }

    return(
        <MonsterSearchComp
            searchedMonster={searchedMonster}
            cRInpit={cRInpit}
            options={options}
            open={open}
            loading={loading}
            handleChange={handleChange}
            handleAddMonsterClick={handleAddMonsterClick}
            handleCRChange={handleCRChange}
            inputValue={inputValue}
            handleInputChange={handleInputChange}
            handleOpen={handleOpen}
            handleClose={handleClose}
            disabled={disabled}
            label={label}
        />
    );

    
}

export default MonsterSearch;