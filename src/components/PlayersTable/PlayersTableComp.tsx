import { Grid,Button,Typography, Paper } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import { player } from "../../features/playersSlice";
import EditPlayerName from "../EditPlayer/EditPlayerName/editPlayerName";
import EditPlayerClass from "../EditPlayer/EditPlayerClass/EditPlayerClass";
import EditPlayerLevel from "../EditPlayer/editPlayerLevel/editPlayerLevel";

interface PlayerTableCompProps{
    listOfPlayers:player[];
    editPlayerIndex: number | null;
    highestPlayerLevel:number;
    handleRemoveClick:(index: number) => (e: any) => void;
    handleEditClick:(index: number) => (e: any) => void;

}


const PlayerTableComp = ({listOfPlayers,editPlayerIndex,highestPlayerLevel,handleRemoveClick,handleEditClick}:PlayerTableCompProps) => {


    return (
        <>

            {listOfPlayers.length !== 0 && (
                <>
                    <Grid container spacing={1} sx={{marginTop:2}}>
                        <Grid item xs={12} sm={'auto'}>
                            <Typography component={'h2'} variant={'h5'}>Players <Typography sx={{ display: { xs: 'none', sm: 'inline' } }} component={'span'} variant={'h5'}>|</Typography></Typography>
                        </Grid>
                        <Grid item xs={12} sm={'auto'}>
                            <Typography component={'h2'} variant={'h5'}>Highest Level: {highestPlayerLevel}</Typography>
                        </Grid>
                    </Grid>
                    {listOfPlayers.map((player, index) => (
                        <Paper elevation={4} sx={{ marginY: 2, padding: 1, bgcolor: 'primary.dark', color: 'white' }} key={index}>
                            <Grid container spacing={1} sx={{ alignItems: 'center' }}>
                                <Grid item xs={12} md={4}>
                                    {editPlayerIndex === index ? <EditPlayerName /> : <Typography component={'p'} variant={'body1'}>{player.name}</Typography>}
                                </Grid>
                                <Grid item xs={8} md={4}>
                                    {editPlayerIndex === index ? <EditPlayerClass /> : <Typography component={'p'} variant={'body1'}>{player.playerClass}</Typography>}
                                </Grid>
                                <Grid item xs={4} md={2}>
                                    {editPlayerIndex === index ? <EditPlayerLevel /> : <Typography component={'p'} variant={'body1'}>Level: {player.level}</Typography>}
                                </Grid>
                                <Grid item xs={6} md={1} sx={{ textAlign: {xs:'left',md:'right'} }}>
                                    <Button sx={{ padding: '6px', minWidth: 'fit-content' }} color={editPlayerIndex === index ? 'success' : 'warning'} variant="contained" disableElevation onClick={handleEditClick(index)} >
                                        {editPlayerIndex === index ? <TaskAltIcon /> : <EditIcon />}
                                    </Button>
                                </Grid>
                                <Grid item xs={6} md={1} sx={{ textAlign: 'right' }}>
                                    <Button sx={{ padding: '6px', minWidth: 'fit-content' }} color="error" variant="contained" disableElevation onClick={handleRemoveClick(index)} >
                                        <CloseIcon />
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

export default PlayerTableComp