// 후원 증서 Page
import html2canvas from 'html2canvas'; // 후원증서 Png출력하기 위함
import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import Header from '../../components/header/Header';
import Content from '../../components/content/Content';
import BottomModal from '../../components/modal/BottomModal';
import Button from '../../components/button/Button';
import Footer from '../../components/footer/Footer';
import api from '../../utils/api'; // api 인터셉터((모든 요청에 자동으로 토큰 추가))

// 기부증서 Page
const CertificatePage = () => {
    const location = useLocation(); // useLocation 이용해서 HistoryDetail페이지에서 이동하며 넘어온 state값을 받아올 수 있음
    const data = location.state?.data; // 전달된 API 데이터
    const donationHistory = data?.donationHistory;
    const donationOrganization = data?.donationOrganization;
    console.log('넘겨받은 데이터 data:', data); // 확인용 🔥🔥

    /* PNG 변환 관련 START */
    const componentRef = useRef(null); // Png로 변환하고자 하는 컴포넌트 Ref
    // Png 변환 후 다운로드
    const handleDownloadPng = async () => {
        if (componentRef.current) {
            const canvas = await html2canvas(componentRef.current);
            const image = canvas.toDataURL('image/png');

            // 다운로드 링크 생성
            const link = document.createElement('a');
            link.href = image;
            link.download = 'capture.png';
            link.click();
        }
    };
    /* PNG 변환 관련 END */
    // 날짜형식 변환 YYYY-MM-DD
    const formatDate = (date) => {
        if (date != null) return date.substring(0, 10);
    };
    return (
        <>
            <Header title="기부증서" back="false" />
            <Content>
                <div>
                    {/* PNG로 저장할 영역 START*/}
                    <div ref={componentRef}>
                        <>
                            <Card
                                variant="outlined"
                                sx={{
                                    borderRadius: 2,
                                    paddingTop: 3,
                                    marginBottom: 3,
                                    height: 'auto',
                                }}
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
                                        기 부 증 서
                                    </Typography>
                                </Box>
                                <CardContent>
                                    {/* 내용 부분 */}
                                    <Box>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: 0,
                                            }}
                                        >
                                            <b>후원금액</b> &nbsp;&nbsp;&nbsp;
                                            {donationHistory?.donationAmount?.toLocaleString()}원
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: 1,
                                            }}
                                        >
                                            <b>후원일</b> &nbsp;&nbsp;&nbsp;
                                            {formatDate(donationHistory.donationDate)}
                                        </Typography>
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
                                                    textAlign: 'center',
                                                    marginBottom: 1,
                                                    marginTop: 1,
                                                }}
                                            >
                                                <b>(사){donationOrganization.name}</b>{' '}
                                                {donationOrganization.description}
                                                <br />
                                                <br />
                                                <b>(사){donationOrganization.name}</b>에 소중한
                                                후원을 해주셨기에 <br />
                                                감사의 마음을 담아 후원증서를 드립니다.
                                            </Typography>
                                            <Typography variant="body2">
                                                {/* {data.donationOrganization.description} */}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    textAlign: 'center',
                                                    marginTop: 5,
                                                }}
                                            >
                                                {formatDate(donationHistory.donationDate)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginTop: 0,
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            sx={{
                                                marginLeft: '100px',
                                            }}
                                        >
                                            (사){donationOrganization.name}
                                        </Typography>

                                        <img
                                            src={require(`../../image/${donationOrganization.icon}`)}
                                            // require() 를 사용해서 이미지 동적으로 불러오기
                                            alt={donationOrganization.name}
                                            style={{ width: 60, height: 60, marginRight: '0px' }}
                                        />
                                    </Box>
                                </CardContent>
                            </Card>
                        </>
                    </div>
                    {/* PNG로 저장할 영역 END*/}

                    <Button text="❤️ 다운로드 ❤️" onClick={handleDownloadPng} />
                </div>
            </Content>
        </>
    );
};

export default CertificatePage;
