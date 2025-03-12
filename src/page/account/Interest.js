import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs, Tab, Box, Card, CardContent, Divider, Typography } from '@mui/material';
import Content from '../../components/content/Content';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import BottomModal from '../../components/modal/BottomModal';
import Button from '../../components/button/Button';
import DoubleButton from '../../components/button/DoubleButton';

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

// 커스텀 탭
const CustomTabs = ({ value, onChange }) => {
    return (
        <Tabs
            value={value} // 탭 인덱스 값
            onChange={onChange} // 부모에서 받은 onChange 사용
            variant="fullWidth"
            sx={{
                '& .MuiTabs-indicator': { display: 'none' },
                '& .MuiTab-root': {
                    borderRadius: '10px',
                    fontWeight: 'bold',
                },
                '& .Mui-selected': {
                    backgroundColor: '#4CAF50',
                    color: 'white',
                },
                marginBottom: 2,
            }}
        >
            <Tab label="만기일" /> {/* 0 */}
            <Tab label="오늘" /> {/* 1 */}
            <Tab label="직접입력" /> {/* 2 */}
        </Tabs>
    );
};

/* 3개의 탭 페이지 정의 */
// (1) 만기일 탭 페이지
const Tap0Page = ({ interestData }) => {
    return (
        <>
            {/* 이자내역 카드 START */}
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
                        <Typography variant="body2">2025</Typography>
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
                        <Typography variant="body2"> 12 %</Typography>
                    </Box>

                    {/* [추가] START - 적용금리에 대한 세부 항목을 보여줄 작은 박스 */}
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
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                카드 발급
                            </Typography>
                            <Typography variant="body2">ssssss %</Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                최초 가입
                            </Typography>
                            <Typography variant="body2">ssssss %</Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                매일 우대금리
                            </Typography>
                            <Typography variant="body2">ssssss %</Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                연속 보너스 우대금리
                            </Typography>
                            <Typography variant="body2">ssssss %</Typography>
                        </Box>
                    </Box>
                    {/* [추가] END */}

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
                            1000원
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
                        <Typography variant="body2"> 2000원</Typography>
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
                        <Typography variant="body2">2000원</Typography>
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
                        <Typography variant="body2">20202020</Typography>
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
                            202020원
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
                            202020원
                            {/* 계좌원금balance + 세후이자interestAmount */}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
            {/* 하단 주의 문구들 */}
            <Typography
                variant="caption"
                display="block"
                color="text.secondary"
                sx={{ marginBottom: 1 }}
            >
                * 위 금리는 만기에 해지하는 경우 받을 수 있는 예상 금리이며, 중도해지 시 가입 시점
                기본 금리가 적용됩니다.
            </Typography>
            <Typography variant="caption" display="block" color="text.secondary">
                * 위 금액은 현재 납입한 총 원금을 기준으로 산출된 금액으로 향후 고객님의 거래내역
                변동에 따라 실제 해지금액과 달라질 수 있습니다.
            </Typography>
        </>
    );
};

// (2) 오늘 탭 페이지
const Tap1Page = ({ interestData }) => {
    return (
        <>
            {/* 이자내역 카드 START */}
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
                        <Typography variant="body2">2025</Typography>
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
                        <Typography variant="body2"> 12 %</Typography>
                    </Box>

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
                            1000원
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
                        <Typography variant="body2"> 2000원</Typography>
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
                        <Typography variant="body2">2000원</Typography>
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
                        <Typography variant="body2">20202020</Typography>
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
                            202020원
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
                            202020원
                            {/* 계좌원금balance + 세후이자interestAmount */}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
            {/* 하단 주의 문구들 */}
            <Typography
                variant="caption"
                display="block"
                color="text.secondary"
                sx={{ marginBottom: 1 }}
            >
                * 위 금액은 현재 납입한 총 원금을 기준으로 산출된 금액으로 향후 고객님의 거래내역
                변동에 따라 실제 해지금액과 달라질 수 있습니다.
            </Typography>
            <Typography variant="caption" display="block" color="text.secondary">
                * 중도해지 시 우대금리가 적용되지 않습니다.
            </Typography>
        </>
    );
};

// (3) 직접입력 탭 페이지
const Tap2Page = ({ interestData }) => {
    return (
        <>
            {/* 이자내역 카드 START */}
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
                        <Typography variant="body2">2025</Typography>
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
                        <Typography variant="body2"> 12 %</Typography>
                    </Box>

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
                            1000원
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
                        <Typography variant="body2"> 2000원</Typography>
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
                        <Typography variant="body2">2000원</Typography>
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
                        <Typography variant="body2">20202020</Typography>
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
                            202020원
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
                            202020원
                            {/* 계좌원금balance + 세후이자interestAmount */}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
            {/* 하단 주의 문구들 */}
            <Typography
                variant="caption"
                display="block"
                color="text.secondary"
                sx={{ marginBottom: 1 }}
            >
                * 위 금액은 현재 납입한 총 원금을 기준으로 산출된 금액으로 향후 고객님의 거래내역
                변동에 따라 실제 해지금액과 달라질 수 있습니다.
            </Typography>
            <Typography variant="caption" display="block" color="text.secondary">
                * 중도해지 시 우대금리가 적용되지 않습니다.
            </Typography>
        </>
    );
};

// 날짜형식 변환 YYYY-MM-DD
const formatDate = (date) => {
    if (date != null) return date.substring(0, 10);
};

// 메인 함수
const Interest = () => {
    const [tabIndex, setTabIndex] = useState(0); // 선택된 탭의 인덱스를 관리
    const [interestData, setInterestData] = useState(null); // API에서 가져온 데이터

    // 현재 선택된 탭의 index와 비교하여 렌더링
    const TabPanel = ({ children, value, index }) => {
        return value === index ? <div>{children}</div> : null;
    }; // value와 index 값이 같으면 children(탭에 들어올 페이지 지정) 반환

    // (3-1) 예상이자조회(만기일 해지) API
    const getMaturityInterest = () => {
        api.get('/interest/maturity')
            .then((response) => {
                const data = response.data;
                setInterestData(data);
                console.log(data); // 🔥 확인용 로그
            })
            .catch((error) => {
                console.error(error);
            });
    };
    // (3-2) 예상이자조회(오늘 해지) API
    const getTodayInterest = () => {
        api.get('/interest/today')
            .then((response) => {
                const data = response.data;
                setInterestData(data);

                console.log(data); // 🔥 확인용 로그
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const endDate = '2025-03-15T23:59:59'; // 클라이언트로부터 입력받은 종료일

    // (3-3) 예상이자조회(선택일자 해지) API
    const getCustomDateInterest = (customDate) => {
        api.get('/interest/customDate', {
            params: {
                endDate: customDate, // 쿼리 파라미터로 사용자로부터 입력받은 customDate 전달
            },
        })
            .then((response) => {
                const data = response.data;
                setInterestData(data);

                console.log(data); // 🔥 확인용 로그
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        if (tabIndex === 0) {
            getMaturityInterest(); // (3-1) 예상이자조회(만기일 해지) API
        } else if (tabIndex === 1) {
            getTodayInterest(); // (3-2) 예상이자조회(오늘 해지) API
        } else if (tabIndex === 2) {
            getCustomDateInterest(endDate); // (3-3) 예상이자조회(선택일자 해지) API
        }
    }, [tabIndex]); // tabIndex가 변경될 때마다 호출됨

    return (
        <>
            {/* 뒤로가기 아이콘 없는 헤더 */}
            <Header title="이자조회" />
            <Content>
                {/* ✅ CustomTabs에 상태와 변경 함수 전달 */}
                <CustomTabs
                    value={tabIndex}
                    onChange={(event, newValue) => setTabIndex(newValue)}
                />
                {/* TabPanel은 value와 index를 props로 받아, value와 index가 같을 때 해당 내용을 보여줌 */}
                <TabPanel value={tabIndex} index={0}>
                    {/* 각 api 호출하고 나온 결과 값 interestData 넘겨줌 */}
                    <Tap0Page interestData={interestData} />
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                    <Tap1Page interestData={interestData} />
                </TabPanel>
                <TabPanel value={tabIndex} index={2}>
                    <Tap2Page interestData={interestData} />
                </TabPanel>
            </Content>
            <Footer />
        </>
    );
};

export default Interest;
