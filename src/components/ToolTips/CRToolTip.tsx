import { Tooltip, Typography, Box } from '@mui/material';

const CRToolTip = () => {

    const content = (
        <Box sx={{maxWidth:250}}>
            <Typography>
                the numerical system used to determine a party of four players’ difficulty in defeating an enemy.
            </Typography>
        </Box>
    )

    return (
        <Tooltip title={content}>
            <Typography component={'span'} sx={{'&: hover':{cursor:'pointer'}}}>CR:</Typography>
        </Tooltip>
    );
}

export default CRToolTip;