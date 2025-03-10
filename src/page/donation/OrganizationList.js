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

const TabPanel = ({ value, index, children }) => {
    return (
        <div role="tabpanel" hidden={value !== index} style={{ padding: '20px' }}>
            {value === index && <>{children}</>}
        </div>
    );
};

const CardInfoPage = () => {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    신한카드 Leaf2U
                </Typography>
                <Typography variant="body2">카드 번호: 110-123-456789</Typography>
                <Typography variant="body2" color="text.secondary">
                    적금 입금 시, 연결카드에서 출금되며 해지할 경우 원금과 이자가 연결카드로
                    입금됩니다.
                </Typography>
            </CardContent>
        </Card>
    );
};
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
const AccountInfoPage = () => {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    리프적금
                </Typography>
                <Typography variant="body2">계좌번호: 235-987-654321</Typography>
                <Typography variant="body2">잔액: 360,000원</Typography>
                <Typography variant="body2">기본금리: 1.00% / 우대금리: 5.40%</Typography>
                <Box mt={2}>
                    <Button variant="contained" color="primary" fullWidth>
                        납입금액 설정 (매일 30,000원)
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

const OrganizationList = () => {
    //
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
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

                <TabPanel value={tabIndex} index={0}>
                    <CardInfoPage />
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                    <AccountInfoPage />
                </TabPanel>
            </Box>

            <Header title="리프보드" back="true" />
            <Content>
                {/* 후원 기관 리스트 */}
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
            </Content>
            <Footer />
        </>
    );
};

export default OrganizationList;
