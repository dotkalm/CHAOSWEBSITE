import { COPY } from '@/constants';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styles } from '@/styles/styles';

export default function AboutPage(){
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                ...styles.main
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
