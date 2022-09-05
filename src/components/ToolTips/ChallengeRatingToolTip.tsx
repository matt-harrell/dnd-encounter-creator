import { Tooltip, Typography, Box } from '@mui/material';

const ChallengeRatingToolTip = () => {

    const content = (
        <Box sx={{maxWidth:250}}>
            <Typography>
                the numerical system used to determine a party of four players’ difficulty in defeating an enemy.
            </Typography>
        </Box>
    )

    return (
        <Tooltip title={content}>
            <Typography component={'span'} sx={{textDecoration:'underline','&: hover':{cursor:'pointer'}}}>challenge rating</Typography>
        </Tooltip>
    );
}

export default ChallengeRatingToolTip;