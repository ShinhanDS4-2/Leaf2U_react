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
                        background: 'rgba(232, 232, 232, 1)',
                        zIndex: 999,
                        display: 'flex',
                        flexDirection: 'column', // 세로 방향으로 정렬
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{ marginBottom: -3, textAlign: 'center' }}
                    >
                        퀴즈 생성중. . . <br /> 잠시만 기다려주세요😚
                    </Typography>
                    <Lottie animationData={RobotAnimation} loop={true} />
                </Box>
            </Content>
        </>
    );
};

export default QuizLoading;
