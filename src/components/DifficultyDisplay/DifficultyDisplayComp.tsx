import { Grid,Typography,Box } from "@mui/material";

interface DifficultyDisplayCompProps {
    easyThresholdXP:number;
    mediumThresholdXP:number;
    hardThresholdXP:number;
    deadlyThresholdXP:number;
    encounterDifficulty:string;
}



const DifficultyDisplayComp = ({easyThresholdXP,mediumThresholdXP, hardThresholdXP, deadlyThresholdXP, encounterDifficulty}:DifficultyDisplayCompProps) => {


      return(
        <Box sx={{width:'100%',marginY:1}}>
            <Typography component={'h2'} variant={'h6'}>Difficulty: {encounterDifficulty}</Typography>
            <Typography component={'h2'} variant={'h6'}>XP Threshholds for the Party</Typography>
            <Grid container spacing={1} sx={{paddingY:1}}>
                <Grid item xs={6} sm={3}>
                    Easy: {easyThresholdXP}
                </Grid>
                <Grid item xs={6} sm={3}>
                    Medium: {mediumThresholdXP}
                </Grid>
                <Grid item xs={6} sm={3}>
                    Hard: {hardThresholdXP}
                </Grid>
                <Grid item xs={6} sm={3}>
                    Deadly: {deadlyThresholdXP}
                </Grid>
            </Grid>
        </Box>
      );

}

export default DifficultyDisplayComp;