import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import HomeHeader from '../../components/header/HomeHeader';
import Footer from '../../components/footer/Footer';
import { Typography, Box, List, ListItem, Divider } from '@mui/material';
import Tree from '../../image/tree.png';

function Home() {
    const [accountStep, setAccountStep] = useState(1);
    const [savingList, setSavingList] = useState([]);
    const [balance, setBalance] = useState(0);
    const [interestRate, setInterestRate] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

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
        api.post('/account/current')
            .then((response) => {
                const data = response.data;

                // 단계
                setAccountStep(data.account_step);
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
                setBalance(data.info.accountDTO.balance);
                setInterestRate(data.info.accountDTO.finalInterestRate);
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

    // 챌린지 현황 클릭
    const handleCalendarOnClick = () => {};

    // 모달 닫기
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // 나무 이미지
    const treeImage = require(`../../image/tree_${accountStep}.png`);

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
                <img src={treeImage} className="tree-img" />
            </div>
            <Footer />

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
                                    {interestRate}%
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
                                {balance.toLocaleString()}원
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
        </div>
    );
}

export default Home;
