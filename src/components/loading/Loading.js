import React from 'react';
import { SyncLoader } from 'react-spinners';
import { Box } from '@mui/material';

const Loading = () => {
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
            <SyncLoader color="#FAFAFA"></SyncLoader>
        </Box>
    );
};

export default Loading;
