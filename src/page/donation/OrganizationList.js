import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import {
    Tabs,
    Tab,
    Box,
    Card,
    CardContent,
    Typography,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Content from '../../components/content/Content';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';

const TabPanel = ({ children, value, index }) => {
    return value === index ? <div>{children}</div> : null;
};

const OrganizationDetailModal = ({ open, onClose, donation }) => {
    return (
        // open 속성에 true가 전달되면 모달이 표시됨. open 속성이 false이면 모달이 숨겨짐.
        // open={true}: 모달이 열려 있는 상태로 표시됨. open={false}: 모달이 닫혀 있는 상태로 표시됨.
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
                {donation && ( //  donation이 존재하는 경우에만 밑에 JSX 코드를 렌더링하겠다는 뜻
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
                                <Typography variant="body2">{donation.name}</Typography>
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
                                <Typography variant="body2">{donation.telNumber}</Typography>
                            </Box>
                            <Box
                                sx={{
                                    marginBottom: 3,
                                }}
                            >
                                <Typography variant="body2" color="text.secondary" className="mb-2">
                                    기관설명
                                </Typography>
                                <Typography variant="body2">{donation.description}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                )}
            </DialogContent>
        </Dialog>
    );
};

const Tap1Page = () => {
    const [openModal, setOpenModal] = useState(false); // 모달 열기/닫기 상태
    const [donations, setDonations] = useState([]); // donations 상태 관리
    const [selectedDonation, setSelectedDonation] = useState(null); // 선택된 donation 데이터

    const handleOpenModal = (donation) => {
        setSelectedDonation(donation); // 선택된 donation 저장
        setOpenModal(true); // 모달 열기
    };

    const handleCloseModal = () => {
        setOpenModal(false); // 모달 닫기
        setSelectedDonation(null); // 선택된 donation 초기화
    };

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

    // 후원기관 리스트 호출 API
    const getOrganizations = () => {
        api.get('/donation/organizationList')
            .then((response) => {
                const data = response.data;
                setDonations(data);
                console.log(data); // 🔥 확인용 로그
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // useEffect 이 코드의 역할은 컴포넌트가 첫 렌더링될 때 한 번만 getOrganizations() 함수를 호출하는 것
    // 여기서 중요한 부분은 []라는 빈 의존성 배열
    // []: 의존성 배열이라고 부르며, 이 배열 안에 값들이 변경될 때마다 useEffect 내의 코드가 실행된다. 이 배열이 비어있으면, 컴포넌트가 마운트될 때 한 번만 실행됨. 즉, 페이지가 처음 로드될 때만 getOrganizations()가 호출되는 것.
    useEffect(() => {
        getOrganizations(); // 컴포넌트가 처음 렌더링될 때 한 번만 실행됨
    }, []); // 빈 배열, 의존성 배열이 비어있기 때문에 한 번만 실행 -> 만약 안에 someState라는 값이 있으면 someState 값이 변경될 때마다 실행됨

    return (
        <>
            <Box className="p-0 mt-4">
                {donations.map((donation) => (
                    <Card
                        key={donation.organizationIdx} // idx값을 사용하여 각 항목을 식별
                        variant="outlined" // 카드위에 마우스 올리면 elevation으로 변하게 해도 좋을듯
                        onClick={() => handleOpenModal(donation)} // 카드 클릭 시 모달 열기
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
                                    {donation.name}
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    &gt;
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            <div>
                {/* 후원기관 상세 모달 컴포넌트 */}
                <OrganizationDetailModal
                    open={openModal}
                    onClose={handleCloseModal}
                    donation={selectedDonation}
                />
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
