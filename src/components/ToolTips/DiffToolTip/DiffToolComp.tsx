import { Tooltip, Typography, Box } from '@mui/material';
import {DiffToolTipCompProps} from './DiffToolTip'


const DiffToolTipComp = ({word,content}:DiffToolTipCompProps) => {

    const contentValue = (
        <Box sx={{maxWidth:250}}>
            <Typography>
                {content}
            </Typography>
        </Box>
    )

    return (
        <Tooltip title={contentValue}>
            <Typography component={'span'} sx={{'&: hover':{cursor:'pointer'}}}>{word}: </Typography>
        </Tooltip>
    );
}

export default DiffToolTipComp;