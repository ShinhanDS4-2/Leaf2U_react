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
import Header from '../../components/Header';
import Content from '../../components/Content';
import BottomModal from '../../components/BottomModal';
import Button2 from '../../components/Button';
import Footer from '../../components/Footer';

const donations = [
    {
        title: '생명의 숲',
        account: '1002-352-020202 (적금계좌번호)',
        amount: '35,000원',
        date: '2025.02.25',
    },
    {
        title: '후원단체이름',
        account: '1002-352-020202 (적금계좌번호)',
        amount: '35,000원',
        date: '2025.02.25',
    },
    {
        title: '후원단체이름',
        account: '1002-352-020202 (적금계좌번호)',
        amount: '35,000원',
        date: '2025.02.25',
    },
    {
        title: '무럭 무럭',
        account: '1002-352-020202 (적금계좌번호)',
        amount: '35,000원',
        date: '2025.02.25',
    },
    {
        title: '나무의 숲',
        account: '1002-352-020202 (적금계좌번호)',
        amount: '35,000원',
        date: '2025.02.25',
    },
];

const HistoryList = () => {
    const navigate = useNavigate();
    //
    const [anchorEl, setAnchorEl] = React.useState(null);
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
            {/* 상단 정보 */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 1,
                }}
            >
                <Typography variant="body1">총 {donations.length}건</Typography>
                <Button
                    variant="text"
                    color="#5DB075"
                    onClick={handleClick}
                    sx={{ color: '#388E3C', fontSize: 15 }}
                >
                    3개월 ▼
                </Button>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={handleClose}>1개월</MenuItem>
                    <MenuItem onClick={handleClose}>3개월</MenuItem>
                    <MenuItem onClick={handleClose}>6개월</MenuItem>
                </Menu>
            </Box>

            {/* 기부 내역 리스트 */}
            {donations.map((donation, index) => (
                <Card
                    key={index}
                    variant="outlined" // 카드위에 마우스 올리면 elevation로 변하게 해도 좋을듯
                    sx={{ borderRadius: 2, marginBottom: 1, height: 'auto' }}
                >
                    <CardContent>
                        {/* 제목 + 화살표 아이콘 */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold">
                                {donation.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                &gt;
                            </Typography>
                        </Box>

                        {/* 제목 아래 연한 구분선 */}
                        <Divider sx={{ marginY: 1, borderColor: 'black' }} />

                        {/* 내용 부분 (항목명과 값이 한 줄에 표시되도록 수정) */}
                        <Box sx={{ marginTop: 1 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: 1,
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    계좌정보
                                </Typography>
                                <Typography variant="body2">{donation.account}</Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: 1,
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    기부금액
                                </Typography>
                                <Typography variant="body2" fontWeight="bold">
                                    {donation.amount}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    기부일자
                                </Typography>
                                <Typography variant="body2">{donation.date}</Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default HistoryList;
