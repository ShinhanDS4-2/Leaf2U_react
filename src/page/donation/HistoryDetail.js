import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import Header from '../../components/header/Header';
import Content from '../../components/content/Content';
import BottomModal from '../../components/modal/BottomModal';
import Button from '../../components/button/Button';
import Footer from '../../components/footer/Footer';

import api from '../../utils/api'; // api 인터셉터((모든 요청에 자동으로 토큰 추가))

const HistoryDetail = () => {
    const { idx } = useParams(); // useParams()를 사용하여 URL에서 idx 값 가져오기
    // ㄴ useParams()에서 가져오는 변수(idx)의 이름은 Route에서 지정한 :idx와 동일해야 한다.
    console.log('useParams로 넘어오는 idx 값? ', idx); // 🔥 확인용 로그
    const navigate = useNavigate(); // 페이지 이동을 위한 훅
    const [data, setData] = useState({ donationOrganization: {}, donationHistory: {} }); // API로 불러온 데이터 상태관리

    const modalRef = useRef(); // 모달 ref
    const OpenModal = () => {
        if (modalRef.current) {
            modalRef.current.openModal();
        }
    };

    // 후원 상세 호출 API
    const getHistoryDetail = () => {
        api.get(`/donation/historyDetail/${idx}`)
            .then((response) => {
                const data = response.data; // donationHistory, donationOrganization
                console.log('api 성공 data', data); // 🔥 확인용 로그
                setData(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getHistoryDetail(); // idx가 존재할 경우에만 API 호출
        console.log('api 성공 data', data); // 🔥 확인용 로그
    }, []); // ✅ idx가 변경될 때마다 실행됨
    return (
        <>
            <Header title="후원 내역 조회" />
            <Content>
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
                                <Typography variant="body2">
                                    {data.donationOrganization.name}
                                </Typography>
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
                                <Typography variant="body2">
                                    {data.donationOrganization.telNumber}
                                </Typography>
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
                                    {data.donationOrganization.description}
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
                                <Typography variant="body2">
                                    {' '}
                                    {data.donationHistory.accountNumber}
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
                                    적용 금리
                                </Typography>
                                <Typography variant="body2">
                                    {/* 최종금리 */}
                                    {data.donationHistory.finalInterestRate} %
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
                                    <Typography variant="body2">
                                        {data.donationHistory.interestRate} %
                                    </Typography>
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
                                    <Typography variant="body2">
                                        {data.donationHistory.primeRate} %
                                    </Typography>
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
                                    {data?.donationHistory?.principal?.toLocaleString()} 원
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
                                <Typography variant="body2">
                                    {data?.donationHistory?.interest?.toLocaleString()} 원
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
                                    포인트
                                </Typography>
                                <Typography variant="body2">
                                    {data?.donationHistory?.point?.toLocaleString()} 원
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
                                    후원금액
                                </Typography>
                                <Typography variant="h5" color="#5DB075" fontWeight="bold">
                                    {data?.donationHistory?.donationAmount?.toLocaleString()} 원
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
                {/* 기부내역 카드 END */}
                <div>
                    <Button
                        text="기부증서"
                        onClick={() => {
                            navigate(`/certificatePage/${idx}`, { state: { data } }); // 페이지 이동하면서 API 데이터 함께 전달할 수 있음
                            OpenModal();
                        }}
                    />
                    <BottomModal ref={modalRef}>
                        <Typography variant="h6" className="fw-bold mb-2">
                            기부증서 pdf 페이지 나와야함
                        </Typography>
                    </BottomModal>
                </div>
            </Content>
            <Footer />
        </>
    );
};

export default HistoryDetail;
