import './Quiz.css';
import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/header/Header';
import Content from '../../components/content/Content';
import Footer from '../../components/footer/Footer';
import Button from '../../components/button/Button';
import BottomModal from '../../components/modal/BottomModal';
import AlertModal from '../../components/modal/AlertModal';
import { Icon } from '@iconify/react/dist/iconify.js';
import dayjs from 'dayjs';
import correctEmoji from '../../image/point_correct.json';
import wrongEmoji from '../../image/point_wrong.json';
import { useNavigate } from 'react-router-dom';
import ChallengeLoading from '../../components/loading/ChallengeLoading';
// LottieFiles 애니메이션 사용 예시 START
import Lottie from 'lottie-react';
import RobotAnimation from '../../image/RobotAnimation.json'; // 로봇 애니메이션
// LottieFiles 애니메이션 사용 예시 END
import axios from 'axios';

const Quiz = () => {
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState(null);
    const [answer, setAnswer] = useState('');
    const [correct, setCorrect] = useState('');
    const [section, setSection] = useState('');
    const [hintUrl, setHintUrl] = useState('');
    const [loading, setLoading] = useState(false); // 로딩

    // 모달의 동적 내용 관리
    const [modalContent, setModalContent] = useState({
        text: <></>,
        buttonText: '확인',
        onConfirm: () => {},
    });
    const bottomModalRef = useRef();

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

    // Alert 참조용 ref 생성
    const alertRef = useRef();

    // alert open
    const handleOpenAlert = () => {
        if (alertRef.current) {
            alertRef.current.openModal();
        }
    };

    const api = axios.create({
        baseURL: '/api',
        headers: { 'Content-Type': 'application/json' },
    });

    api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error),
    );

    useEffect(() => {
        setLoading(true);

        api.get('/point/quiz')
            .then((res) => {
                const data = res.data;
                setQuiz(data.question.quiz);
                setSection(data.question.section);
                setCorrect(data.question.answer);
                setHintUrl(data.newsId);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleSubmitAnswer = () => {
        if (!answer) {
            handleOpenAlert();
            return;
        }

        if (answer == correct) {
            api.post('/point/quiz/answer', { answer: answer })
                .then((res) => {
                    setModalContent({
                        text: (
                            <>
                                <div className="d-flex justify-content-center mb-4">
                                    <Lottie
                                        animationData={correctEmoji}
                                        loop={true}
                                        className="point-modal-emoji"
                                    />
                                </div>
                                <p>
                                    정답이에요!
                                    <br />
                                    10 P를 획득합니다.
                                </p>
                            </>
                        ),
                        buttonText: '확인',
                        onConfirm: () => {
                            handleCloseBottomModal();
                            navigate('/point');
                        },
                    });
                    handleOpenBottomModal();
                })
                .catch((err) => alert(err.response?.data?.message || '정답 제출 오류'));
        } else {
            setModalContent({
                text: (
                    <>
                        <div className="d-flex justify-content-center mb-4">
                            <Lottie
                                animationData={wrongEmoji}
                                loop={true}
                                className="point-modal-emoji"
                            />
                        </div>
                        <p>
                            오답이에요!
                            <br />
                            다음에 다시 도전해봐요.
                        </p>
                    </>
                ),
                buttonText: '확인',
                onConfirm: () => {
                    handleCloseBottomModal();
                    navigate('/point');
                },
            });
            handleOpenBottomModal();
        }
    };

    const handleHintClick = () => {
        api.post('/point/quiz/hint')
            .then(() => {
                window.open(hintUrl, '_blank'); // 힌트 기사 원문 열기
            })
            .catch((err) => alert(err.response?.data?.message || '힌트 제공 오류'));
    };

    return (
        <div className="point1-container">
            <Header title="포인트" />
            <Content>
                <div>
                    <div className="quiz-title">{dayjs().locale('ko').format('M월 D일')} QUIZ</div>{' '}
                    <>
                        {/* 로봇 애니메이션 들어갈 자리 */}
                        <div className="quiz-container2 mb-3">
                            <Lottie
                                animationData={RobotAnimation}
                                loop={true}
                                className="temination-check w-400"
                            />
                            {quiz}
                        </div>
                        <div className="quiz-buttons">
                            <div
                                className={`quiz-button ${answer === 'O' ? 'selected' : ''}`}
                                onClick={() => setAnswer('O')}
                            >
                                <div className="o-button text-center">
                                    <Icon
                                        icon="ic:outline-circle"
                                        width="80px"
                                        height="80px"
                                        style={{ color: '#fafafa' }}
                                    />
                                </div>
                            </div>
                            <div
                                className={`quiz-button ${answer === 'X' ? 'selected' : ''}`}
                                onClick={() => setAnswer('X')}
                            >
                                <div className="x-button text-center">
                                    <Icon
                                        icon="majesticons:close"
                                        width="90px"
                                        height="90px"
                                        style={{ color: '#DD2E44' }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* HINT 영역 */}
                        <div className="hint-container" onClick={handleHintClick}>
                            <Icon
                                icon="tabler:bulb"
                                width="50px"
                                height="50px"
                                style={{ color: '#f0ad4e' }}
                            />
                            <div className="hint-content ms-3">
                                <p className="point1-text-title">HINT</p>
                                <p className="point1-text-description">
                                    관련 기사를 읽고 힌트를 얻을 수 있어요! + 5P
                                </p>
                            </div>
                        </div>
                        {/* HINT 영역 */}
                        <div className="maturity-button-field">
                            <Button text="정답 확인" onClick={handleSubmitAnswer} />
                        </div>
                    </>
                </div>
            </Content>
            <Footer />
            {/* 하단 모달 */}
            <BottomModal ref={bottomModalRef}>
                <div>
                    <div className="mt-3 mb-3">
                        <span className="bottom-text">{modalContent.text}</span>
                    </div>
                    <div className="p-3">
                        <Button text={modalContent.buttonText} onClick={modalContent.onConfirm} />
                    </div>
                </div>
            </BottomModal>
            <AlertModal
                ref={alertRef}
                text={'<span>정답을 선택해 주세요.</span>'}
                onClick={() => {}}
            />
            {/* 로딩 화면 */}
            {loading && <ChallengeLoading />}
        </div>
    );
};

export default Quiz;
