import { Grid,Typography,Box } from "@mui/material";
import InfoDrawer from "../InfoDrawer/InfoDrawer";
import DiffTool from "../ToolTips/DiffToolTip/DiffToolTip";

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
            <Grid container spacing={1}>
                <Grid item xs={10}>
                    <Typography component={'h2'} variant={'h6'}>Difficulty: {encounterDifficulty}</Typography>
                </Grid>
                <Grid item xs={2} sx={{textAlign:'right'}}>
                    <InfoDrawer/> 
                </Grid>
            </Grid>
            <Typography component={'h2'} variant={'h6'}>XP Threshholds for the Party</Typography>
            <Grid container spacing={1} sx={{paddingY:1}}>
                <Grid item xs={6} sm={3}>
                    <DiffTool
                        content="An easy encounter doesn’t tax the characters’ resources or put them in serious peril. They might lose a few hit points, but victory is pretty much guaranteed."
                        word="Easy"
                    /> 
                    {easyThresholdXP}
                </Grid>
                <Grid item xs={6} sm={3}>
                    <DiffTool
                        content="A medium encounter usually has one or two scary moments for the players, but the characters should emerge victorious with no casualties. One or more of them might need to use healing resources."
                        word="Medium"
                    /> 
                    {mediumThresholdXP}
                </Grid>
                <Grid item xs={6} sm={3}>
                    <DiffTool
                        content="A hard encounter could go badly for the adventurers. Weaker characters might get taken out of the fight, and there’s a slim chance that one or more characters might die."
                        word="Hard"
                    /> 
                    {hardThresholdXP}
                </Grid>
                <Grid item xs={6} sm={3}>
                    <DiffTool
                        content="A deadly encounter could be lethal for one or more player characters. Survival often requires good tactics and quick thinking, and the party risks defeat."
                        word="Deadly"
                    /> 
                    {deadlyThresholdXP}
                </Grid>
            </Grid>
        </Box>
      );

}

export default DifficultyDisplayComp;