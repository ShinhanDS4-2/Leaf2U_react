import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import HomeHeader from '../../components/header/HomeHeader';
import BottomModal from '../../components/modal/BottomModal';
import Button from '../../components/button/Button';
import Footer from '../../components/footer/Footer';
import AlertModal from '../../components/modal/AlertModal';
import { Typography, Box, List, ListItem, Divider, Fade } from '@mui/material';
import Tree from '../../image/tree.png';
import Watering from '../../image/watering.png';

function Home() {
    const [data, setData] = useState({ account_step: 1 }); // 적금 정보
    const [savingList, setSavingList] = useState([]); // 납입 내역 리스트
    const [isModalOpen, setIsModalOpen] = useState(false); // 납입 내역 리스트 모달 상태
    const [isInfoOpen, setIsInfoOpen] = useState(false); // 적금 정보 모달 상태

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

    // 적금 계좌 현황 (단계, 만기상태)
    const getAccountInfo = () => {
        api.post('/account/saving/info')
            .then((response) => {
                setData(response.data);
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
    };

    // 나무 이미지
    const treeImage = require(`../../image/tree_${data.account_step}.png`);

    useEffect(() => {
        getAccountInfo();
        checkToday();
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
                    <Button
                        text={`${data?.accountDTO?.paymentAmount.toLocaleString() ?? 0}원 입금`}
                        onClick={() => {}}
                    />
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
                        zIndex: 999,
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
                        zIndex: 10,
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
            <AlertModal
                ref={alertRef}
                text={'<span>이미 오늘의 챌린지를<br/>완료하였습니다.</span>'}
                onClick={handleCloseAlertModal}
            />
        </div>
    );
}

export default Home;
