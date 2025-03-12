import './Home.css';
import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Box, List, ListItem, Divider, Fade } from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify.js';
import Tree from '../../image/tree.png';
import Watering from '../../image/watering.png';
import HomeHeader from '../../components/header/HomeHeader';
import BottomModal from '../../components/modal/BottomModal';
import Button from '../../components/button/Button';
import Footer from '../../components/footer/Footer';
import AlertModal from '../../components/modal/AlertModal';
import CustomCalendar from '../../components/calendar/CustomCalendar';

function Home() {
    const [data, setData] = useState({ account_step: 1 }); // 적금 정보
    const [savingList, setSavingList] = useState([]); // 납입 내역 리스트
    const [isModalOpen, setIsModalOpen] = useState(false); // 납입 내역 리스트 모달 상태
    const [isInfoOpen, setIsInfoOpen] = useState(false); // 적금 정보 모달 상태
    const [isChallengeOpen, setIsChallengeOpen] = useState(false); // 챌린지 현황 모달 상태

    const [isChallengeCompleted, setIsChallengeCompleted] = useState(false); // 챌린지 완료 여부
    const [challengeCount, setChallengeCount] = useState(0); // 챌린지 완료 횟수
    const [bonusRate, setBonusRate] = useState(0); // 우대 금리

    const location = useLocation();
    const { deposit, type } = location.state || {}; // type여기로 받아서 넘어옴

    // 모달
    const bottomModalRef = useRef();
    const alertRef = useRef();

    const handleOpenBottomModal = () => {
        if (bottomModalRef.current) {
            bottomModalRef.current.openModal();
        }
    };

    const handleCloseBottomModal = () => {
        if (bottomModalRef.current) {
            bottomModalRef.current.closeModal();
        }
    };

    const handleOpenAlertModal = () => {
        if (alertRef.current) {
            alertRef.current.openModal();
        }
    };

    const handleCloseAlertModal = () => {
        if (alertRef.current) {
            alertRef.current.closeModal();
        }
    };

    // axios 인스턴스
    const api = axios.create({
        baseURL: '/api',
    });

    // 인터셉터
    api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    // 챌린지 완료 후 적금 납입 체크 함수
    const challengeCheckRate = () => {
        if (deposit == 'Y') {
            // React Deposit.js에서 선택한 type이 DB challengeType 저장될 형식 변환
            const typeMap = {
                tumblr: 'T',
                bicycle: 'C',
                receipt: 'R',
            };

            const challengeType = typeMap[type] || {};

            console.log('React에서 보낼 challengeType:', challengeType);

            // 챌린지 완료 후 적금 납입
            api.post('/saving/deposit', { challengeType })
                .then((response) => {
                    console.log('API 응답:', response.data);
                    setChallengeCount(response.data.saving_cnt || 0);
                    setBonusRate(response.data.todayInterestRate || 0);
                    setIsChallengeCompleted(true);
                })
                .catch((error) => {
                    console.error('API 호출 실패:', error);
                    if (error.response) {
                        console.log(' 서버 응답 상태 코드:', error.response.status);
                        console.log(' 서버 응답 데이터:', error.response.data);
                    }
                });
        }
    };

    // 적금 계좌 현황 (단계, 만기상태)
    const getAccountInfo = () => {
        api.post('/account/saving/info')
            .then((response) => {
                setData(response.data);

                if (response.data.maturity_yn == 'Y') {
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // 오늘 챌린지 알림
    const checkToday = () => {
        api.post('/notice/daily')
            .then((response) => {})
            .catch((error) => {
                console.error(error);
            });
    };

    // 납입 내역
    const getSavingList = () => {
        api.post('/saving/history/list')
            .then((response) => {
                const data = response.data;

                setSavingList(data.list || []);
                setIsModalOpen(true);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // 납입 내역 클릭
    const handleListOnClick = () => {
        getSavingList();
    };

    // 챌린지 현황
    const getChallengeInfo = () => {
        api.post('/saving/challenge/list')
            .then((response) => {
                const data = response.data;
                console.log(data);

                setIsChallengeOpen(true);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // 챌린지 현황 클릭
    const handleCalendarOnClick = () => {
        getChallengeInfo();
    };

    // 납입 클릭
    const handleSavingOnClick = () => {
        if (data.saving_yn <= 0) {
            handleOpenBottomModal();
        } else {
            handleOpenAlertModal();
        }
    };

    // 나무 클릭
    const handleAccountInfoClick = () => {
        setIsInfoOpen(true);
        setTimeout(() => {
            setIsInfoOpen(false);
        }, 5000);
    };

    // 모달 닫기
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsChallengeOpen(false);
    };

    // 나무 이미지
    const treeImage = require(`../../image/tree_${data.account_step ?? 1}.png`);

    useEffect(() => {
        getAccountInfo();
        checkToday();
        challengeCheckRate();
    }, []);

    return (
        <div className="backgrung-img">
            <div className="cloud1"></div>
            <div className="cloud2"></div>
            <HomeHeader listClick={handleListOnClick} calendarClick={handleCalendarOnClick} />
            <div className="tree-div">
                <img src={Watering} className="watering-img" onClick={handleSavingOnClick} />
                <img src={treeImage} className="tree-img" onClick={handleAccountInfoClick} />
            </div>

            {/* 챌린지 deposit */}
            {isChallengeCompleted && (
                <Fade in={isChallengeCompleted} timeout={{ enter: 500, exit: 500 }}>
                    <Box className="home-overlay">
                        <Box className="challenge-popup">
                            <Typography className="challenge-count">
                                {challengeCount}회 챌린지 완료
                            </Typography>
                            <Typography className="challenge-text">
                                +{bonusRate}%<br />
                            </Typography>
                            <Typography className="challenge-rate">
                                우대 금리를 받았어요!
                            </Typography>

                            {/* 확인 버튼 */}
                            <Box className="challenge-button">
                                <Button
                                    text="확인"
                                    onClick={() => setIsChallengeCompleted(false)}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Fade>
            )}

            <Footer />

            {/* 하단 모달 (납입 확인) */}
            <BottomModal ref={bottomModalRef}>
                <div>
                    <div className="mt-3 mb-3">
                        <span className="bottom-text">
                            오늘의 챌린지를
                            <br />
                            진행하시겠습니까?
                        </span>
                    </div>
                    <div className="p-3">
                        <Button
                            text={`${data?.accountDTO?.paymentAmount.toLocaleString() ?? 0}원 입금`}
                            onClick={() => {}}
                        />
                    </div>
                    <span className="small text-secondary" onClick={handleCloseBottomModal}>
                        다음에 할래요
                    </span>
                </div>
            </BottomModal>

            {/* 적금 계좌 정보 모달 */}
            <Fade in={isInfoOpen} timeout={{ enter: 500, exit: 500 }}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '20%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        padding: '20px',
                        paddingTop: '30px',
                        borderRadius: '10px',
                        width: '80%',
                        zIndex: 50,
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.5s ease-in-out',
                    }}
                >
                    <div className="row">
                        <div className="col align-items-center">
                            <span className="small mx-auto">
                                적용금리{' '}
                                <span className="info-rate">
                                    {data?.accountDTO?.finalInterestRate ?? 0}%
                                </span>
                            </span>
                            <p className="info-balance">
                                {data?.accountDTO?.balance?.toLocaleString() ?? 0}원
                            </p>
                        </div>
                        <div className="col">
                            <div className="p-2 text-center diff-div">
                                <span className="diff">D - {data?.diff ?? 0}</span>
                            </div>
                        </div>
                    </div>
                </Box>
            </Fade>

            {/* 납입 내역 모달 컴포넌트 */}
            {isModalOpen && (
                <Box
                    onClick={handleCloseModal}
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 60,
                    }}
                >
                    <Box
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '10px',
                            padding: '16px',
                            maxWidth: '500px',
                            width: '90%',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        <Box sx={{ textAlign: 'left', marginBottom: 2, marginTop: 2 }}>
                            <Typography variant="body2">
                                적용금리{' '}
                                <span style={{ color: '#5DB075', fontWeight: 'bold' }}>
                                    {data.accountDTO.finalInterestRate}%
                                </span>
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 'bold',
                                    alignItems: 'center',
                                    display: 'inline-flex',
                                }}
                            >
                                {data.accountDTO.balance.toLocaleString()}원
                                <img
                                    src={Tree}
                                    style={{
                                        width: '15%',
                                        display: 'inline',
                                        marginLeft: '5px',
                                        verticalAlign: 'middle',
                                    }}
                                    alt="Tree"
                                />
                            </Typography>
                        </Box>
                        <List sx={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {savingList.map((item, index) => (
                                <React.Fragment key={index}>
                                    <ListItem
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            padding: '8px 0',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography
                                                variant="body2"
                                                sx={{ color: '#999696', marginRight: 2 }}
                                            >
                                                {item.formattedDate}
                                            </Typography>
                                            <Box>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ fontWeight: 'bold' }}
                                                >
                                                    {item.rowNum}회
                                                </Typography>
                                                {item.interestRateList.map((rateItem, index) => {
                                                    return (
                                                        <Typography
                                                            key={index}
                                                            sx={{
                                                                fontSize: '12px',
                                                                color:
                                                                    rateItem.rateType === 'W'
                                                                        ? '#5DB075'
                                                                        : '#999696',
                                                                display: 'inline',
                                                                marginRight: '5px',
                                                            }}
                                                        >
                                                            {rateItem.rateType === 'W'
                                                                ? '| 보너스 '
                                                                : ''}{' '}
                                                            + {rateItem.rate} %
                                                        </Typography>
                                                    );
                                                })}
                                            </Box>
                                        </Box>
                                        <Box sx={{ textAlign: 'right' }}>
                                            <Typography variant="body3" sx={{ fontWeight: 'bold' }}>
                                                {item.paymentAmount.toLocaleString()}원
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#999696' }}>
                                                {item.cumulativeAmount.toLocaleString()}원
                                            </Typography>
                                        </Box>
                                    </ListItem>
                                    {index < savingList.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>
                    </Box>
                </Box>
            )}
            {/* 챌린지 현황 모달 컴포넌트 */}
            {isChallengeOpen && (
                <Box
                    onClick={handleCloseModal}
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 60,
                    }}
                >
                    <Box
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                            borderRadius: '10px',
                            maxWidth: '500px',
                            width: '100%',
                            marginLeft: '25px',
                            marginRight: '25px',
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: '#f5f5f5',
                                borderRadius: '10px',
                                marginBottom: '15px',
                                justifyContent: 'center',
                                display: 'flex',
                            }}
                        >
                            <CustomCalendar
                                minDate={new Date(2025, 1, 22)}
                                maxDate={new Date(2025, 2, 24)}
                                stickerDates={{ '2025-03-01': true }}
                            />
                        </Box>
                        <Box
                            sx={{
                                backgroundColor: 'white',
                                borderRadius: '10px',
                                paddingLeft: '20px',
                                paddingRight: '30px',
                                paddingBottom: '5px',
                                paddingTop: '5px',
                                marginBottom: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Icon icon="flat-color-icons:icons8-cup" width="60" height="60" />
                                <Typography variant="body1" sx={{ marginLeft: '10px' }}>
                                    텀블러 사용
                                </Typography>
                            </Box>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                10회
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                backgroundColor: 'white',
                                borderRadius: '10px',
                                paddingTop: '20px',
                                paddingBottom: '20px',
                                paddingLeft: '15px',
                                paddingRight: '15px',
                                marginBottom: '10px',
                            }}
                        >
                            <div>asdf</div>
                        </Box>
                        <Box
                            sx={{
                                backgroundColor: 'white',
                                borderRadius: '10px',
                                paddingTop: '20px',
                                paddingBottom: '20px',
                                paddingLeft: '15px',
                                paddingRight: '15px',
                            }}
                        >
                            <div>asdf</div>
                        </Box>
                    </Box>
                </Box>
            )}
            <AlertModal
                ref={alertRef}
                text={'<span>이미 오늘의 챌린지를<br/>완료하였습니다.</span>'}
                onClick={handleCloseAlertModal}
            />
        </div>
    );
}

export default Home;
