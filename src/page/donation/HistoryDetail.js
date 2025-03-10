import React, { useRef } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Grid2 as Grid,
    Button,
    Menu,
    MenuItem,
    Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import Content from '../../components/content/Content';
import BottomModal from '../../components/modal/BottomModal';
import Button2 from '../../components/button/Button';
import Footer from '../../components/footer/Footer';

const HistoryDetail = () => {
    const navigate = useNavigate(); // useNavigate훅: React Router에서 제공하는 훅으로, 페이지 이동을 위한 함수
    //
    const [anchorEl, setAnchorEl] = React.useState(null); // useState 훅을 사용하여 anchorEl이라는 상태 변수를 선언하고 초기값을 null로 설정
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //
    return (
        <Box sx={{ padding: 2, backgroundColor: '#FAFAFA' }}>
            {/* 1) 기부처 영역 */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 1,
                }}
            >
                <Typography variant="body1" fontWeight="bold">
                    기부처
                </Typography>
            </Box>

            {/* 기부처 카드 START */}
            <Card variant="outlined" sx={{ borderRadius: 2, marginBottom: 3, height: 'auto' }}>
                <CardContent>
                    {/* 내용 부분 */}
                    <Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 1,
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                기관명
                            </Typography>
                            <Typography variant="body2">생명의 숲</Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 2,
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                연락처
                            </Typography>
                            <Typography variant="body2">010-1234-1234</Typography>
                        </Box>
                        <Divider sx={{ marginY: 1, borderColor: 'black' }} />

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column', // 한줄에 나오지 않도록 세로로 배치
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    marginBottom: 1,
                                }}
                            >
                                기관설명
                            </Typography>
                            <Typography variant="body2">
                                생명의숲은 숲을 통해 사회문제를 해결하고,
                                <br />
                                모두가 누리는 5분 거리의 숲을 만들기를 꿈꿉니다
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
            {/* 기부처 카드 END */}

            {/* 기부처 카드 END */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 1,
                }}
            >
                <Typography variant="body1" fontWeight="bold">
                    기부내역
                </Typography>
            </Box>

            {/* 기부내역 카드 START */}

            <Card variant="outlined" sx={{ borderRadius: 2, marginBottom: 3, height: 'auto' }}>
                <CardContent>
                    {/* 내용 부분 */}
                    <Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 1,
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                계좌
                            </Typography>
                            <Typography variant="body2">1002-352-212121</Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 1,
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                적용 금리
                            </Typography>
                            <Typography variant="body2">
                                8.5% (기본 금리 2.0%, 우대 금리 2.0%)
                            </Typography>
                        </Box>

                        {/* [추가] 적용금리에 대한 세부 항목을 보여줄 작은 박스 */}
                        <Box
                            sx={{
                                backgroundColor: '#F5F5F5', // F5F5F5 연회색
                                borderRadius: 1,
                                border: '3px solid #F5F5F5', // 테두리 두께와 색상 지정
                                padding: 1,
                                marginBottom: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: 1,
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    기본 금리
                                </Typography>
                                <Typography variant="body2">2.0 %</Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    우대 금리
                                </Typography>
                                <Typography variant="body2">2.0 %</Typography>
                            </Box>
                        </Box>
                        {/* [추가] END */}

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 1,
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                원금
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                                360,000원
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 1,
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                이자
                            </Typography>
                            <Typography variant="body2">35,000원</Typography>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 1,
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                포인트
                            </Typography>
                            <Typography variant="body2">35,000원</Typography>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 2,
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                후원금액
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                                35,000원
                            </Typography>
                        </Box>
                        <Divider sx={{ marginY: 1, borderColor: 'black' }} />

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: 2,
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold">
                                계좌
                            </Typography>
                            <Typography variant="h5" color="#5DB075" fontWeight="bold">
                                35,000원
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
            {/* 기부내역 카드 END */}
        </Box>
    );
};

export default HistoryDetail;
