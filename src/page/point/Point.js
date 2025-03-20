import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Point.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import CalendarImg from '../../image/Calendar.jpg';
import PedometerImg from '../../image/Pedometer.jpg';
import PointQuizImg from '../../image/PointQuiz.jpg';
import ArrowImg from '../../image/Arrow.jpg';
import AlertModal from '../../components/modal/AlertModal';
import api from '../../utils/api';
import Lottie from 'lottie-react';
import Pigcoin from '../../image/pigcoin.json';
import wrongEmoji from '../../image/point_wrong.json';

const points = [
    {
        img: CalendarImg,
        title: '출석체크',
        description: `매일 10 포인트 획득`,
        type: 'checkin',
    },
    {
        img: PedometerImg,
        title: '만보기',
        description: `1000걸음 당 10 포인트 획득`,
        type: 'pedometer',
    },
    {
        img: PointQuizImg,
        title: '환경 퀴즈',
        description: `기사를 읽으며 퀴즈를 맞추면 10 포인트 획득`,
        type: 'quiz',
    },
];
const PointCard = ({ img, title, description, type, onCheckIn, onPedometer, onQuiz }) => {
    const handleClick = async () => {
        if (type === 'checkin') {
            await onCheckIn();
        } else if (type === 'pedometer') {
            await onPedometer();
        } else if (type === 'quiz') {
            await onQuiz();
        }
    };
    return (
        <div className="point-item" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <img src={img} alt={title} className="point-icon" />
            <div className="point-text">
                <p className="point-text-title">{title}</p>
                <p className="point-text-description">{description}</p>
            </div>
            <img src={ArrowImg} alt="arrow" className="point-arrow" />
        </div>
    );
};
const Point = () => {
    const [totalPoints, setTotalPoints] = useState(0);
    const [alertMessage, setAlertMessage] = useState('');
    const alertRef = useRef();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchTotalPoints = async () => {
            try {
                const res = await api.get('/point/total');
                setTotalPoints(res.data.totalPoints);
            } catch (err) {
                console.error('포인트 정보를 불러올 수 없습니다.', err);
            }
        };
        fetchTotalPoints();
    }, []);

    // 출석 체크 API 호출
    const checkIn = async () => {
        try {
            const response = await api.post('/point/checkin');
            const { success, message } = response.data;

            if (success) {
                // 출석 X
                setAlertMessage(
                    <div className="alert-modal-content">
                        <div className="alert-modal-pig">
                            <Lottie animationData={Pigcoin} loop={true} />
                        </div>
                        <span>{message}</span>
                    </div>,
                );
            } else {
                // 출석 이미 완료
                setAlertMessage(
                    <div className="alert-modal-content">
                        <div className="alert-modal-animation">
                            <Lottie animationData={wrongEmoji} loop={true} />
                        </div>
                        <span>오늘의 출석을 완료하였습니다.</span>
                    </div>,
                );
            }

            alertRef.current.openModal();
            if (success) {
                setTotalPoints((prev) => prev + 10);
            }
        } catch (error) {
            console.error('출석 체크 중 오류가 발생했습니다.');
        }
    };
    // 만보기 API 호출
    const goToPedometerPage = async () => {
        try {
            const res = await api.post('/point/check/today', null, {
                params: { activityType: 'S' },
            });
            if (res.data) {
                setAlertMessage(
                    <div className="alert-modal-content">
                        <div className="alert-modal-animation">
                            <Lottie animationData={wrongEmoji} loop={true} />
                        </div>
                        <span>오늘의 만보기를 완료하였습니다.</span>
                    </div>,
                );
                alertRef.current.openModal();
            } else {
                navigate('/pedometer');
            }
        } catch (error) {
            console.error('API 호출 오류:', error);
        }
    };
    // 퀴즈 API 호출
    const goToQuizPage = async () => {
        try {
            const res = await api.post('/point/check/today', null, {
                params: { activityType: 'Q' },
            });
            if (res.data) {
                setAlertMessage(
                    <div className="alert-modal-content">
                        <div className="alert-modal-animation">
                            <Lottie animationData={wrongEmoji} loop={true} />
                        </div>
                        <span>오늘의 퀴즈를 완료하였습니다.</span>
                    </div>,
                );
                alertRef.current.openModal();
            } else {
                navigate('/quiz');
            }
        } catch (error) {
            console.error('API 호출 오류:', error);
        }
    };
    return (
        <div className="point-container">
            <Header title="포인트" />
            <div className="point-box">
                <h2 className="point-title">
                    보유 포인트 <br />
                    {totalPoints}P
                </h2>
                {points.map((point, index) => (
                    <PointCard
                        key={index}
                        {...point}
                        onCheckIn={checkIn}
                        onPedometer={goToPedometerPage}
                        onQuiz={goToQuizPage}
                    />
                ))}
            </div>
            <AlertModal
                ref={alertRef}
                title="알림"
                text={alertMessage}
                onClick={() => {
                    alertRef.current.closeModal();
                }}
            />
            <Footer />
        </div>
    );
};
export default Point;
