import Header from '../../components/header/Header';
import Content from '../../components/content/Content';
import Footer from '../../components/footer/Footer';
import Button from '../../components/button/Button';
import { Card, Box, CardContent, Divider, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMaturity } from '../../context/MaturityContext';
import axios from 'axios';

// axios 인스턴스
const api = axios.create({
    baseURL: '/api', // API 기본 URL
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

// 메인함수 시작
const Maturity = () => {
    const [accountDTO, setAccountDTO] = useState(null); // API 응답값 accountDTO
    const [rateSumMap, setRateSumMap] = useState(null); // API 응답값 rateSumMap
    const navigate = useNavigate();
    const { setAccountInfo, setPoint } = useMaturity(); // context

    // (3-1) 예상이자조회(만기일 해지) API
    const getMaturityInterest = () => {
        api.get('/account/interest/maturity')
            .then((response) => {
                const data = response.data; // API 호출 응답값: rateSumMap, accountDTO
                setAccountDTO(data.accountDTO);
                setRateSumMap(data.rateSumMap);
                setAccountInfo(data.accountDTO);
                setPoint(data.point);
                console.log('data.accountDTO?? ', data.accountDTO); // 🔥 확인용 로그
                console.log('rateSumMap?? ', data.rateSumMap); // 🔥 확인용 로그
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        // 컴포넌트 처음 렌더링될때만 실행
        getMaturityInterest();
    }, []);

    return (
        <div>
            <Header title="만기해지" />
            <Content>
                <div>
                    <p className="small text-center mt-3">
                        받으실 원금과 이자를
                        <br />
                        확인해주세요.
                    </p>
                </div>
                <div>
                    <Card
                        variant="outlined"
                        sx={{
                            borderRadius: 2,
                            margin: 1,
                            height: 'auto',
                            padding: 0,
                        }}
                    >
                        <CardContent>
                            {/* 상단 제목 */}
                            <Box sx={{ marginBottom: 2 }}>
                                <Typography variant="h6" fontWeight="bold">
                                    이자
                                </Typography>
                            </Box>

                            {/* 이자 상세 항목들 */}
                            <Box
                                sx={{
                                    marginBottom: 1,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    이자 계산 기간
                                </Typography>
                                <Typography variant="body2">
                                    {formatDate(accountDTO?.createDate)} ~{' '}
                                    {formatDate(accountDTO?.maturityDate)}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    marginBottom: 1,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    기본 금리
                                </Typography>
                                <Typography variant="body2">
                                    {accountDTO?.interestRate} %
                                </Typography>
                            </Box>

                            {/* [추가] START - 적용금리에 대한 세부 항목을 보여줄 작은 박스 */}
                            <Box
                                sx={{
                                    marginBottom: 1,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    우대 금리
                                </Typography>
                                <Typography variant="body2">
                                    {' '}
                                    연 {accountDTO?.primeRate}% 반영
                                </Typography>
                            </Box>

                            {/* [우대금리에 대한 세부 항목을 보여줄 작은 박스 START */}
                            <Box
                                sx={{
                                    backgroundColor: '#F5F5F5', // F5F5F5 연회색
                                    borderRadius: 1,
                                    border: '3px solid #F5F5F5', // 테두리 두께와 색상 지정
                                    padding: 1,
                                    marginBottom: 2,
                                }}
                            >
                                {/* 금리타입 별 우대금리가 있는 경우에만 조건부 렌더링 */}

                                {/* 카드발급 우대금리 택1 (C:전용카드/E:기후동행카드)*/}
                                {rateSumMap?.rateC != null && rateSumMap?.rateC !== 0 && (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Typography variant="body2" color="text.secondary">
                                            카드 발급
                                        </Typography>
                                        <Typography variant="body2">
                                            {rateSumMap?.rateC} %
                                        </Typography>
                                    </Box>
                                )}
                                {rateSumMap?.rateE != null && rateSumMap?.rateE !== 0 && (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Typography variant="body2" color="text.secondary">
                                            카드 발급
                                        </Typography>
                                        <Typography variant="body2">
                                            {rateSumMap?.rateE} %
                                        </Typography>
                                    </Box>
                                )}
                                {/* F:최초금리 */}
                                {rateSumMap?.rateF != null && rateSumMap?.rateF !== 0 && (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Typography variant="body2" color="text.secondary">
                                            최초 가입
                                        </Typography>
                                        <Typography variant="body2">
                                            {rateSumMap?.rateF} %
                                        </Typography>
                                    </Box>
                                )}
                                {/* D: 매일금리 */}
                                {rateSumMap?.rateD != null && rateSumMap?.rateD !== 0 && (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Typography variant="body2" color="text.secondary">
                                            매일 우대금리
                                        </Typography>
                                        <Typography variant="body2">
                                            {rateSumMap?.rateD} %
                                        </Typography>
                                    </Box>
                                )}
                                {/* W:연속금리 */}
                                {rateSumMap?.rateW != null && rateSumMap?.rateW !== 0 && (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Typography variant="body2" color="text.secondary">
                                            연속 보너스 우대금리
                                        </Typography>
                                        <Typography variant="body2">
                                            {rateSumMap?.rateW} %
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                            {/* [우대금리에 대한 세부 항목을 보여줄 작은 박스 END */}

                            <Box
                                sx={{
                                    marginBottom: 1,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    원금
                                </Typography>
                                <Typography variant="body2" fontWeight="bold">
                                    {accountDTO?.balance.toLocaleString()}원
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    marginBottom: 1,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    이자(세전)
                                </Typography>
                                <Typography variant="body2">
                                    {accountDTO?.preTaxInterestAmount.toLocaleString()}원
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    marginBottom: 1,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    세금
                                </Typography>
                                <Typography variant="body2">
                                    {accountDTO?.taxAmount.toLocaleString()}원
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    marginBottom: 2,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    과세구분
                                </Typography>
                                <Typography variant="body2">
                                    {accountDTO?.taxationYn == 'Y' ? '일반과세' : '비과세'}
                                </Typography>
                            </Box>

                            {/* 실제 이자 및 최종 수령액 */}
                            <Box
                                sx={{
                                    marginBottom: 2,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body" color="text.secondary" fontWeight="bold">
                                    이자
                                </Typography>
                                <Typography variant="body" fontWeight="bold">
                                    {accountDTO?.interestAmount.toLocaleString()}원
                                </Typography>
                            </Box>
                            <Divider sx={{ marginY: 1, borderColor: 'black', marginBottom: 2 }} />

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="h6" color="text.secondary" fontWeight="bold">
                                    받으실금액
                                </Typography>
                                <Typography variant="h5" color="#5DB075" fontWeight="bold">
                                    {/* 계좌원금balance + 세후이자interestAmount */}
                                    {(
                                        accountDTO?.balance + accountDTO?.interestAmount
                                    ).toLocaleString()}
                                    원
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </div>
                {/* <div className="maturity-content">
                    <p>이자</p>
                </div> */}
                <div className="maturity-button-field">
                    <Button
                        text="다음"
                        onClick={() => {
                            navigate('/home/maturityList');
                        }}
                    />
                </div>
            </Content>
            <Footer />
        </div>
    );
};

export default Maturity;
