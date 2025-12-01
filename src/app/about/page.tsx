import { COPY } from '@/constants';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function AboutPage(){
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
            }}
        >
            <Typography 
                variant="body1"
            >
                {COPY.about.bio.jc}
            </Typography>
            <Typography 
                variant="body1"
            >
                {COPY.about.bio.as}
            </Typography>
        </Box>
    )
}
