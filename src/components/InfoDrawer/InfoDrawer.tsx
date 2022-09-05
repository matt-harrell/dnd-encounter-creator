import { useState,useEffect } from 'react';

import { selectEncounterDifficulty } from '../../features/playersSlice';
import { useSelector } from 'react-redux';

import InfoDrawerComp from "./InfoDrawerComp";

const InfoDrawer = () => {

    const [open, setOpen] = useState(false);
    const [color, setColor] = useState<string>("white");
    const encounterDifficulty = useSelector(selectEncounterDifficulty);

    useEffect(() => {
        if (encounterDifficulty === 'Medium') {
            setColor('#000000')
        } else {
            setColor('#fff')
        }
    }, [encounterDifficulty]);

    const toggleDrawer = () => {
        setOpen(open ? false : true);
    };
    
    return(
        <InfoDrawerComp
            open={open}
            color={color}
            toggleDrawer={toggleDrawer}
        />
    );
}

export default InfoDrawer;