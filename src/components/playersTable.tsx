import { Grid,Button,Typography, Paper } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useSelector,useDispatch } from "react-redux";
import { 
    removePlayer,
    selectPlayers, 
} from "../features/playersSlice";
import { AppDispatch } from "../app/store";

const PlayerTable = () => {
    const dispatch = useDispatch<AppDispatch>();
    const listOfPlayers = useSelector(selectPlayers)
    
    
    
    const handleRemoveClick = (index:number) => (e:any) =>{
        dispatch(removePlayer(index))
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
                                    <Typography component={'p'} variant={'body1'} >{player.level}</Typography>
                                </Grid>
                                <Grid item xs={2} sx={{display:{xs:'none',md:'block'}}}/>
                                <Grid item xs={2} md={1}>
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