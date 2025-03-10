import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import {
    Tabs,
    Tab,
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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

const OrganizationDetailModal = ({ open, onClose }) => {
    return (
        // open 속성에 true가 전달되면 모달이 표시됨. open 속성이 false이면 모달이 숨겨짐.
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
                상세 정보
                <IconButton onClick={onClose} size="small">
                    <CloseIcon color="" />
                </IconButton>
            </DialogTitle>
            <Divider sx={{ borderColor: 'black' }} />
            <DialogContent>
                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                    <CardContent>
                        {/* 이자 상세 항목들 */}
                        <Box
                            sx={{
                                marginBottom: 1,
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                기관명
                            </Typography>
                            <Typography variant="body2">생명의 숲</Typography>
                        </Box>
                        <Box
                            sx={{
                                marginBottom: 1,
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                연락처
                            </Typography>
                            <Typography variant="body2">010-7737-6314</Typography>
                        </Box>
                        <Box
                            sx={{
                                marginBottom: 3,
                            }}
                        >
                            <Typography variant="body2" color="text.secondary" className="mb-2">
                                기관설명
                            </Typography>
                            <Typography variant="body2">
                                설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    );
};

const Tap1Page = () => {
    const [open, setOpen] = useState(false); // open: 모달의 열림/닫힘 상태를 관리하는 상태 변수, setOpen함수: open 값을 변경하는 역할
    const [donations, setDonations] = useState([]); // 후원기관 데이터 저장

    useEffect(() => {
        // API 호출
        axios
            .get('http://localhost:8090/api/donation/organizationList') // 백엔드 엔드포인트 수정
            .then((response) => {
                setDonations(response.data); // 데이터 저장
            })
            .catch((error) => {
                console.error('데이터 불러오기 실패: ', error);
            });
    }, []);

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
            <div>
                {/* 모달 오픈 버튼 */}
                {/* 버튼 클릭 시 onClick={() => setOpen(true)}가 실행됨 -> setOpen(true)로 상태가 true로 변경되면서 모달이 열림 */}
                <Button variant="outlined" onClick={() => setOpen(true)}>
                    홈페이지 바로가기
                </Button>

                {/* 후원기관 상세 모달 컴포넌트 */}
                <OrganizationDetailModal open={open} onClose={() => setOpen(false)} />
            </div>
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
