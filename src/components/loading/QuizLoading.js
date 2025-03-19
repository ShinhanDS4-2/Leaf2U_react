import React from 'react';
import { Box, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import RobotAnimation from '../../image/RobotAnimation.json';
import Content from '../content/Content';
import { Margin } from '@mui/icons-material';

const QuizLoading = () => {
    return (
        <>
            <Content>
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(211, 211, 211, 1)',
                        zIndex: 999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {/* <Typography variant="subtitle1" fontWeight="bold" sx={{ marginBottom: 3 }}>
                        퀴즈 생성중입니다(●'◡'●)
                    </Typography> */}
                    <Lottie animationData={RobotAnimation} loop={true} />
                </Box>
            </Content>
        </>
    );
};

export default QuizLoading;
