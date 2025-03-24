import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Card, CardContent, Typography, Box, Button, Menu, MenuItem, Divider } from '@mui/material';
import Header from '../../components/header/Header';
import Content from '../../components/content/Content';
import Footer from '../../components/footer/Footer';

// axios 인스턴스
const api = axios.create({
    baseURL: 'http://leaf2u.shinhanacademy.co.kr:8090/api', // API 기본 URL
});

// 요청 인터셉터 설정 (모든 요청에 자동으로 토큰 추가)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken'); // 로컬 스토리지에서 토큰 가져오기
        console.log('현재 저장된 토큰:', token); // 🔥 확인용 로그

        if (token) {
            console.log('보내는 토큰:', token); // 🔥 확인용 로그
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// 날짜형식 변환 YYYY-MM-DD
const formatDate = (date) => {
    if (date != null) return date.substring(0, 10);
};
// 컴포넌트 내부에서 API 호출 (useEffect 사용 예시)
const HistoryList = () => {
    const [historys, setHistorys] = useState([]); // historys 상태관리
    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    // 후원내역 리스트 호출 API
    const getDonationHistorys = () => {
        api.get('/donation/historyList')
            .then((response) => {
                const data = response.data;
                console.log(data); // 🔥 확인용 로그
                setHistorys(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getDonationHistorys(); // 컴포넌트가 처음 렌더링될 때 한 번만 실행됨 (후원 내역 호출)
    }, []);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Header title="후원 내역" />
            <Content>
                {/* 상단 정보 */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 1,
                    }}
                >
                    <Typography variant="body1">총 {historys.Count}건</Typography>
                </Box>

                {/* 기부 내역 리스트 */}
                {historys?.List?.length > 0 ? (
                    historys.List.map((history) => (
                        // historys?.List?.map(...)
                        // historys가 undefined 또는 null이면 → 아무 작업도 하지 않음
                        // historys.List가 undefined 또는 null이면 → 아무 작업도 하지 않음
                        // historys.List가 존재하면 → .map() 실행

                        <Card
                            key={history.idx}
                            variant="outlined" // 카드위에 마우스 올리면 elevation로 변하게 해도 좋을듯
                            onClick={() => {
                                if (history.idx !== undefined) {
                                    console.error('history.idx 있음', history.idx);
                                    navigate(`/historyDetail/${history.idx}`);
                                } else {
                                    console.error('오류: history.idx is undefined!');
                                }
                            }}
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
                                    <Typography variant="h7" fontWeight="bold">
                                        {history.organizationName} {/* 기부처 이름 */}
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
                                        <Typography variant="body2">
                                            {history.accountNumber}
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
                                            기부금액
                                        </Typography>
                                        <Typography variant="body2" fontWeight="bold">
                                            {history?.donationAmount?.toLocaleString()}
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
                                        <Typography variant="body2">
                                            {formatDate(history.donationDate)}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p>기부 내역이 없습니다.</p>
                )}
            </Content>
            <Footer />
        </>
    );
};

export default HistoryList;
