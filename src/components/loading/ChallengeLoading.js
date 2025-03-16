import React from 'react';
import { Box } from '@mui/material';
import Lottie from 'lottie-react';
import LoadingEmoji from '../../image/challenge_loading.json';

const ChallengeLoading = () => {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.3)',
                zIndex: 999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Lottie animationData={LoadingEmoji} loop={true}/>
        </Box>
    );
};

export default ChallengeLoading;
