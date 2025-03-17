import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Point.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import CalendarImg from '../../image/Calendar.jpg';
import PedometerImg from '../../image/Pedometer.jpg';
import PointQuizImg from '../../image/PointQuiz.jpg';
import ArrowImg from '../../image/Arrow.jpg';
import { useNavigate } from 'react-router-dom';
import AlertModal from '../../components/modal/AlertModal';
import Pedometer from './Pedometer';
import Quiz from './Quiz';

const points = [
    {
        pointImg: CalendarImg,
        pointTitle: '출석체크',
        pointDescription: `매일 10 포인트 획득`,
        type: 'checkin',
    },
    {
        pointImg: PedometerImg,
        pointTitle: '만보기',
        pointDescription: `1000걸음 당 10 포인트 획득`,
        type: 'pedometer',
    },
    {
        pointImg: PointQuizImg,
        pointTitle: '환경 퀴즈',
        pointDescription: `기사를 읽으며 퀴즈를 맞추면 10 포인트 획득`,
        type: 'quiz',
    },
];

const PointCard = ({
    pointImg,
    pointTitle,
    pointDescription,
    type,
    onCheckIn,
    onPedometer,
    onQuiz,
}) => (
    <div
        className="point-item"
        onClick={type === 'checkin' ? onCheckIn : type === 'pedometer' ? onPedometer : onQuiz}
        style={{ cursor: 'pointer' }}
    >
        <img src={pointImg} alt={pointTitle} className="point-icon" />
        <div className="point-text">
            <p className="point-text-title">{pointTitle}</p>
            <p className="point-text-description">{pointDescription}</p>
        </div>
        <img src={ArrowImg} alt="arrow" className="point-arrow" />
    </div>
);

const Point = () => {
    const [totalPoints, setTotalPoints] = useState(0);
    const [alertMessage, setAlertMessage] = useState('');
    const alertRef = useRef();
    const navigate = useNavigate();

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

    // 출석 체크
    const checkIn = async () => {
        try {
            const response = await api.post('/point/checkin');
            const { success, message } = response.data;

            setAlertMessage(message);
            alertRef.current.openModal();

            if (success) {
                setTotalPoints((prev) => prev + 10);
            }
        } catch (error) {
            console.error('출석 체크 중 오류가 발생했습니다.');
        }
    };

    const goToPedometerPage = async () => {
        try {
            const response = await api.post('/point/pedometer');
            const { success, message } = response.data;

            setAlertMessage(message);
            alertRef.current.openModal();

            if (success) {
                setTotalPoints((prev) => prev + 10);
            }
        } catch (error) {
            console.error('만보기 오류:', error);
            setAlertMessage('서버 오류로 인해 만보기 포인트 적립에 실패했습니다.');
            alertRef.current.openModal();
        }
    };

    const goToQuizPage = async () => {
        try {
            const response = await api.get('/point/quiz');
            const { success, message } = response.data;

            setAlertMessage(message);
            alertRef.current.openModal();

            if (success) {
                navigate('/quiz');
            }
        } catch (error) {
            console.error('환경 퀴즈 오류:', error);
            setAlertMessage('서버 오류로 인해 퀴즈 로드에 실패했습니다.');
            alertRef.current.openModal();
        }
    };

    const handleHintClick = async (hintUrl) => {
        try {
            const response = await api.post('/point/quiz/hint');
            const { message } = response.data;

            setAlertMessage(message);
            alertRef.current.openModal();

            window.open(hintUrl, '_blank'); // 기사 URL 새 탭 열기
        } catch (error) {
            console.error('힌트 제공 오류:', error);
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
                onClick={() => alertRef.current.closeModal()}
            />
            <Footer />
        </div>
    );
};

export default Point;
