import { Grid,Button,Typography } from "@mui/material";
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
                        <Grid container key={index} spacing={2} sx={{paddingY:.5,alignItems:'center',marginTop:2}}>
                            <Grid item xs={4}>
                                <Typography component={'p'} variant={'body1'}>{player.name}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography component={'p'} variant={'body1'}>{player.playerClass}</Typography>   
                            </Grid>
                            <Grid item xs={2}>
                                <Typography component={'p'} variant={'body1'} >{player.level}</Typography>
                            </Grid>
                            <Grid item xs={2} sm={1}>
                                <Button  sx={{padding:'1px',minWidth:'fit-content'}} color="error" variant="contained" disableElevation onClick={handleRemoveClick(index)} >
                                    <CloseIcon/>
                                </Button>
                            </Grid>
                        </Grid>
                    ))}
                </>
            )}
        </>
    );
}

export default PlayerTable;