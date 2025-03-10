import React, { useRef, useState } from 'react';
import {
    Tabs,
    Tab,
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Menu,
    MenuItem,
    Divider,
} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import Content from '../../components/content/Content';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
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
const TabPanel = ({ children, value, index }) => {
    return value === index ? <div>{children}</div> : null;
};

const Tap1Page = () => {
    return (
        <>
            <Box className="p-0 mt-4">
                {donations.map((donation, index) => (
                    <Card
                        key={index}
                        variant="outlined" // 카드위에 마우스 올리면 elevation으로 변하게 해도 좋을듯
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
                                <Typography variant="h6" fontWeight="bold" marginTop={1}>
                                    {donation.title}
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    &gt;
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>

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
                        <Typography variant="body2">2025-02-01 ~ 2025-03-13</Typography>
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
                        <Typography variant="body2">1.0 %</Typography>
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
                            360,000원
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
                        <Typography variant="body2">295원</Typography>
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
                        <Typography variant="body2">0원</Typography>
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
                        <Typography variant="body2">일반과세</Typography>
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
                            295원
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
                            360,295원
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
};
const Tap2Page = () => {
    return (
        <Card variant="outlined" className="p-0 m-2">
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    기여도 탭 들어올 부분
                </Typography>
            </CardContent>
        </Card>
    );
};

const OrganizationList = () => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <>
            {/* 뒤로가기 아이콘 없는 헤더 */}
            <Header title="리프보드" back={false} />
            <Content>
                <Tabs
                    value={tabIndex}
                    onChange={(e, newIndex) => setTabIndex(newIndex)}
                    centered
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="후원 기관 리스트" />
                    <Tab label="기여도" />
                </Tabs>

                {/* TabPanel은 value와 index를 props로 받아, value와 index가 같을 때 해당 내용을 보여줌 */}
                <TabPanel value={tabIndex} index={0}>
                    <Tap1Page />
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                    <Tap2Page />
                </TabPanel>
            </Content>
            <Footer />
        </>
    );
};

export default OrganizationList;
