import { Grid,Button,Typography, Paper, Grow } from "@mui/material";
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
    handleMouseEnter:(index: number) => (e: any) => void;
    handleMouseLeave:(index: number) => (e: any) => void;

}


const PlayerTableComp = ({listOfPlayers,editPlayerIndex,highestPlayerLevel,handleRemoveClick,handleEditClick,handleMouseEnter,handleMouseLeave}:PlayerTableCompProps) => {


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
                        <Paper elevation={player.UIElements.elevation} sx={{ marginY: 2, padding: 1, bgcolor: 'primary.dark', color: 'white',maxWidth:'40em' }} key={index} onMouseEnter={editPlayerIndex === index ? undefined : handleMouseEnter(index)} onMouseLeave={editPlayerIndex === index ? undefined : handleMouseLeave(index)}>
                            <Grid container spacing={1} sx={{ alignItems: 'center' }}>
                                <Grid item xs={12} lg={4}>
                                    {editPlayerIndex === index ? <EditPlayerName /> : <Typography component={'p'} variant={'body1'}>{player.name}</Typography>}
                                </Grid>
                                <Grid item xs={8} lg={4} sx={{textAlign:{xs:'left',lg:'center'}}}>
                                    {editPlayerIndex === index ? <EditPlayerClass /> : <Typography component={'p'} variant={'body1'}>{player.playerClass}</Typography>}
                                </Grid>
                                <Grid item xs={4} lg={player.UIElements.showEditX ? 2 : 4} sx={{textAlign:'right'}}>
                                    {editPlayerIndex === index ? <EditPlayerLevel /> : <Typography component={'p'} variant={'body1'}>Level: {player.level}</Typography>}
                                </Grid>
                                <Grid item xs={6} lg={1} sx={{ textAlign: {xs:'left',lg:'right'},display:player.UIElements.showEditX ? 'block' : 'none' }}>
                                    <Grow in={player.UIElements.showEditX}>
                                        <Button sx={{ padding: '6px', minWidth: 'fit-content' }} color={editPlayerIndex === index ? 'success' : 'warning'} variant="contained" disableElevation onClick={handleEditClick(index)} >
                                            {editPlayerIndex === index ? <TaskAltIcon /> : <EditIcon />}
                                        </Button>
                                    </Grow>
                                </Grid>
                                <Grid item xs={6} lg={1} sx={{ textAlign: 'right', display:player.UIElements.showEditX ? 'block' : 'none' }}>
                                    <Grow in={player.UIElements.showEditX}>
                                        <Button sx={{ padding: '6px',minWidth: 'fit-content' }} color="error" variant="contained" disableElevation onClick={handleRemoveClick(index)}>
                                            <CloseIcon />
                                        </Button>
                                    </Grow>
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