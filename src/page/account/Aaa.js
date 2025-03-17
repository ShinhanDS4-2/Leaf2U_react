// 기부
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

const Aaa = () => {
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

    // 후원내역 리스트 호출 API
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
            <Content>
                {/* 기부증서 카드 START */}
                <Card
                    variant="outlined"
                    sx={{ borderRadius: 2, paddingTop: 3, marginBottom: 3, height: 'auto' }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 1,
                        }}
                    >
                        <Typography variant="h4" fontWeight="bold">
                            기부증서
                        </Typography>
                    </Box>
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
                                    기관명, 후원금, 후원자
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
                                    기부금액
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
                                    위 사람은 (사)기관명에 소중한 후원을 해주셨기에 <br />
                                    감사의 마음을 담아 후원증서를 드립니다.
                                </Typography>
                                <Typography variant="body2">
                                    {data.donationOrganization.description}
                                </Typography>
                                <Typography variant="body2">
                                    기부날짜 아래에 찍어주고 donationDate
                                </Typography>
                            </Box>
                        </Box>
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
                    </CardContent>
                </Card>
                {/* 기부처 카드 END */}

                <div>
                    <Button
                        text="pdf 다운로드 버튼"
                        onClick={() => {
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

export default Aaa;
