import './Home.css';
import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import ChallengeItem from '../../components/item/ChallengeItem';
import { AnimatePresence, motion } from 'framer-motion';
import PwdModal from '../../components/modal/PwdModal6';
import CustomConfetti from '../../components/effect/CustomConfetti';

function Home() {
    const navigate = useNavigate();

    const [data, setData] = useState({ account_step: 1 }); // 적금 정보
    const [savingList, setSavingList] = useState([]); // 납입 내역 리스트
    const [challengeInfo, setChallengeInfo] = useState(null);
    const [paymentDateMap, setPaymentDateMap] = useState({});

    const [isModalOpen, setIsModalOpen] = useState(false); // 납입 내역 리스트 모달 상태
    const [isInfoOpen, setIsInfoOpen] = useState(false); // 적금 정보 모달 상태
    const [isChallengeOpen, setIsChallengeOpen] = useState(false); // 챌린지 현황 모달 상태

    const [isChallengeCompleted, setIsChallengeCompleted] = useState(false); // 챌린지 완료 여부
    const [challengeCount, setChallengeCount] = useState(0); // 챌린지 완료 횟수
    const [bonusRate, setBonusRate] = useState(0); // 우대 금리

    // 모달의 동적 내용 관리
    const [modalContent, setModalContent] = useState({
        text: (
            <>
                오늘의 챌린지를
                <br />
                진행하시겠습니까?
            </>
        ),
        buttonText: '0원 입금',
        onConfirm: () => {},
    });

    const location = useLocation();
    const { deposit, type } = location.state || {}; // type여기로 받아서 넘어옴
    const [currentDeposit, setCurrentDeposit] = useState(deposit);

    const [feedback, setFeedback] = useState(''); // AI 피드백
    const [isFeedbackVisible, setIsFeedbackVisible] = useState(true); // 피드백 UI 상태 추가
    const [isFeedbackAllowed, setIsFeedbackAllowed] = useState(false); // 피드백 UI가 떠도 되는 상태

    // 모달
    const bottomModalRef = useRef();
    const alertRef = useRef();
    const pwdModalRef = useRef();

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

    // 비밀번호 입력 모달 열기
    const openPwdModal = () => {
        if (pwdModalRef.current) {
            pwdModalRef.current.openModal();
        }
    };

    // 비밀번호 입력 완료 후 검증
    const handlePasswordSubmit = async (inputPwd) => {
        const isMatch = await verifyPassword(inputPwd);
        if (isMatch) {
            console.log('✅ 비밀번호 일치! 입금 진행');
            navigate('/deposit');
            // TODO: 입금 API 호출 (납입 로직 연결)
        } else {
            alert('❌ 비밀번호가 일치하지 않습니다.');
        }
    };

    // 챌린지 완료 후 확인 버튼 클릭 시 피드백 UI 실행
    const handleChallengeConfirm = () => {
        setIsChallengeCompleted(false); // 우대금리 UI 숨기기
        setIsFeedbackAllowed(true); // 피드백 UI를 띄울 수 있도록 상태 변경

        setTimeout(() => {
            setIsFeedbackVisible(true); // 피드백 UI 표시
        }, 500);

        // 10초 후 피드백 UI 사라짐
        setTimeout(() => {
            setIsFeedbackVisible(false);
            setIsFeedbackAllowed(false); // 피드백 UI 표시
        }, 10000);
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

    // 비밀번호 검증 API 요청
    const verifyPassword = async (inputPassword) => {
        try {
            const response = await fetch('api/saving/password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ inputPassword }),
            });
            const result = await response.json();
            return result; // true (비밀번호 일치) / false (불일치)
        } catch (error) {
            console.error('비밀번호 검증 실패:', error);
            return false;
        }
    };

    // 챌린지 완료 후 적금 납입 체크 함수
    const challengeCheckRate = () => {
        if (deposit == 'Y') {
            // React Deposit.js에서 선택한 type이 DB challengeType 저장될 형식 변환
            const typeMap = {
                tumblr: 'T',
                bicycle: 'C',
                receipt: 'R',
            };

            console.log(deposit);
            const challengeType = typeMap[type] || {};

            // 챌린지 완료 후 적금 납입
            api.post('/saving/deposit', { challengeType })
                .then((response) => {
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

    // Feedback API 호출 함수
    const getFeedback = async () => {
        try {
            const response = await api
                .post('/openai/feedback')
                .then((response) => {
                    setFeedback(response.data.feedback);
                    console.log('AI 피드백:', response.data.feedback);
                })
                .finally(() => {
                    setCurrentDeposit('N');
                    navigate(location.pathname, { state: { deposit: 'N', type } });
                });
        } catch (error) {
            console.error('Feedback API 호출 실패:', error);
        }
    };

    // 적금 계좌 현황 (단계, 만기상태)
    const getAccountInfo = () => {
        api.post('/account/saving/info')
            .then((response) => {
                setData(response.data);

                if (response.data.maturity_yn == 'Y') {
                    setModalContent({
                        text: (
                            <>
                                만기가 되었어요!
                                <br />
                                이자가 얼만큼 쌓였을까요?
                            </>
                        ),
                        buttonText: '해지하기',
                        onConfirm: () => {
                            navigate('/home/maturity');
                        },
                    });
                    handleOpenBottomModal();
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
    const getChallengeInfo = async () => {
        try {
            const response = await api.post('/saving/challenge/list');
            const data = response.data;
            setChallengeInfo(data);

            if (data?.paymentDateList?.length > 0) {
                // 리스트 map 변환
                const historyMap = data.paymentDateList.reduce((acc, date) => {
                    acc[date] = true;
                    return acc;
                }, {});

                setPaymentDateMap(historyMap);

                setTimeout(() => {
                    setIsChallengeOpen(true);
                }, 500);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // 챌린지 현황 클릭
    const handleCalendarOnClick = () => {
        getChallengeInfo();
    };

    // 납입 클릭
    const handleSavingOnClick = () => {
        if (data.saving_yn <= 0) {
            setModalContent({
                text: (
                    <>
                        오늘의 챌린지를
                        <br />
                        진행하시겠습니까?
                    </>
                ),
                buttonText: `${data?.accountDTO?.paymentAmount.toLocaleString() ?? 0}원 입금`,
                onConfirm: () => {
                    handleCloseBottomModal(); // 버튼 모달 닫기
                    openPwdModal(); // 비밀번호 입력 모달 열기
                },
            });
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

    // 챌린지 현황 모션
    const challengeVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.2, duration: 0.5 },
        }),
    };

    const challengeItems = challengeInfo
        ? [
              {
                  content: '텀블러 사용',
                  carbon: challengeInfo.carbon.carbonT.toLocaleString(),
                  icon: (
                      <div className="pt-2 pb-2">
                          <Icon icon="flat-color-icons:icons8-cup" width="60" height="60" />
                      </div>
                  ),
                  cnt: challengeInfo.challengeCnt.countT,
              },
              {
                  content: '따릉이 이용',
                  carbon: challengeInfo.carbon.carbonC.toLocaleString(),
                  icon: (
                      <div className="pb-3">
                          <Icon icon="twemoji:bicycle" width="60" height="60" />
                      </div>
                  ),
                  cnt: challengeInfo.challengeCnt.countC,
              },
              {
                  content: '전자 영수증 발급',
                  carbon: challengeInfo.carbon.carbonR.toLocaleString(),
                  icon: (
                      <div className="pt-2 pb-2">
                          <Icon icon="noto:receipt" width="60" height="60" />
                      </div>
                  ),
                  cnt: challengeInfo.challengeCnt.countR,
              },
          ]
        : [];

    // 나무 이미지
    const treeImage = require(`../../image/tree_${data.account_step ?? 1}.png`);

    useEffect(() => {
        if (deposit == 'Y') {
            CustomConfetti();
            setIsChallengeCompleted(true); // 우대금리 UI 보이기
            setIsFeedbackVisible(false); // 피드백 UI는 절대 뜨지 않음
            setIsFeedbackAllowed(false); // 피드백 UI가 떠도 되는 상태 초기화
        }
        getAccountInfo();
        checkToday();

        if (deposit == 'Y') {
            challengeCheckRate();

            // DB 업데이트 후 약간의 딜레이 후 실행
            setTimeout(() => {
                getFeedback();
            }, 500);
        }
    }, [deposit]);

    return (
        <div className="backgrung-img">
            <div className="cloud1"></div>
            <div className="cloud2"></div>
            <HomeHeader listClick={handleListOnClick} calendarClick={handleCalendarOnClick} />
            <div className="tree-div">
                <img src={Watering} className="watering-img" onClick={handleSavingOnClick} />
                <img src={treeImage} className="tree-img" onClick={handleAccountInfoClick} />
            </div>

            <div>
                {/* 비밀번호 입력 모달 */}
                <PwdModal ref={pwdModalRef} onSubmit={handlePasswordSubmit} />
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

                            {/* 확인 버튼 클릭 시 우대금리 UI 사라지고 피드백 UI 나타남*/}
                            <Box className="challenge-button">
                                <Button
                                    text="확인"
                                    onClick={handleChallengeConfirm}
                                    className="challenge-button-item"
                                />
                            </Box>
                        </Box>
                    </Box>
                </Fade>
            )}

            {/* AI 피드백 UI 추가 */}
            <AnimatePresence>
                {isFeedbackAllowed && isFeedbackVisible && (
                    <motion.div
                        className="feedback-box"
                        initial={{ opacity: 0, y: -10 }} // 처음에는 살짝 위에 있고 투명한 상태
                        animate={{ opacity: 1, y: 0 }} // 부드럽게 내려오면서 투명도 증가
                        exit={{ opacity: 0, y: -10, transition: { duration: 0.5 } }} // 부드럽게 사라짐
                        transition={{ duration: 0.5 }} // 애니메이션 속도 설정
                    >
                        {/* 새싹 이미지 영역 */}
                        <div className="feedback-icon-box">
                            <img src={Tree} className="feedback-icon" alt="tree icon" />
                        </div>

                        {/* AI 피드백 내용 */}
                        <Typography className="feedback-text">
                            {feedback || '피드백 생성 중...'} {/* 피드백 없으면 기본 메시지 */}
                        </Typography>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />

            {/* 하단 모달 (납입 확인) */}
            <BottomModal ref={bottomModalRef}>
                <div>
                    <div className="mt-3 mb-3">
                        <span className="bottom-text">{modalContent.text}</span>
                    </div>
                    <div className="p-3">
                        <Button text={modalContent.buttonText} onClick={modalContent.onConfirm} />
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
                                        width: '13%',
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
                                minDate={new Date(data.accountDTO.createDate)}
                                maxDate={new Date(data.accountDTO.maturityDate)}
                                stickerDates={paymentDateMap}
                            />
                        </Box>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: { transition: { staggerChildren: 0.2 } },
                            }}
                        >
                            {challengeItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    variants={challengeVariants}
                                    initial="hidden"
                                    animate="visible"
                                    custom={index}
                                >
                                    <ChallengeItem {...item} />
                                </motion.div>
                            ))}
                        </motion.div>
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
