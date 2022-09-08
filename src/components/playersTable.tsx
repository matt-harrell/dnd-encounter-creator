import { Grid,Button,Typography, Paper } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useSelector,useDispatch } from "react-redux";
import { 
    removePlayer,
    selectEditPlayerIndex,
    selectPlayers,
    setTargetEditPlayer, 
} from "../features/playersSlice";
import { AppDispatch } from "../app/store";
import EditPlayerLevel from "./editPlayerLevel/editPlayerLevel";

const PlayerTable = () => {
    const dispatch = useDispatch<AppDispatch>();
    const listOfPlayers = useSelector(selectPlayers);
    const editPlayerIndex = useSelector(selectEditPlayerIndex);
    
    
    const handleRemoveClick = (index:number) => (e:any) =>{
        dispatch(removePlayer(index))
    }

    const handleEditClick = (index:number) => (e:any) =>{
        if (index === editPlayerIndex) {
            dispatch(setTargetEditPlayer(null))
        } else {
            dispatch(setTargetEditPlayer(index))
        }
        
    }

    return(
        <>

            {listOfPlayers.length !==0 && (
                <>
                    {listOfPlayers.map((player,index) => (
                        <Paper elevation={4} sx={{marginY:2,padding:1,bgcolor:'primary.dark',color:'white'}} key={index}>
                            <Grid container spacing={1} sx={{alignItems:'center'}}>
                                <Grid item xs={6} md={4}>
                                    <Typography component={'p'} variant={'body1'}>{player.name}</Typography>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                     <Typography component={'p'} variant={'body1'}>{player.playerClass}</Typography> 
                                </Grid>
                                <Grid item xs={6} md={2}>
                                {editPlayerIndex === index ? <EditPlayerLevel/> : <Typography component={'p'} variant={'body1'}>Level: {player.level}</Typography>}
                                </Grid>
                                <Grid item xs={6} md={1} sx={{textAlign:'right'}}>
                                    <Button  sx={{padding:'6px',minWidth:'fit-content'}} color={editPlayerIndex === index ? 'success' : 'error'} variant="contained" disableElevation onClick={handleEditClick(index)} >
                                         {editPlayerIndex === index ?<TaskAltIcon/> : <EditIcon/>}
                                    </Button>
                                </Grid>
                                <Grid item xs={6} md={1} sx={{textAlign:'right'}}>
                                    <Button  sx={{padding:'6px',minWidth:'fit-content'}} color="error" variant="contained" disableElevation onClick={handleRemoveClick(index)} >
                                        <CloseIcon/>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))}
                </>
            )}
        </>
    );
}

export default PlayerTable;