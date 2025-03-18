import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Point.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import CalendarImg from '../../image/Calendar.jpg';
import PedometerImg from '../../image/Pedometer.jpg';
import PointQuizImg from '../../image/PointQuiz.jpg';
import ArrowImg from '../../image/Arrow.jpg';
import AlertModal from '../../components/modal/AlertModal';

const points = [
    {
        img: CalendarImg,
        title: '출석체크',
        description: `매일 10 포인트 획득`,
        link: null, // 출석체크는 API 요청만 수행
        type: 'checkin',
    },
    {
        img: PedometerImg,
        title: '만보기',
        description: `1000걸음 당 10 포인트 획득`,
        link: '/pedometer',
        type: 'pedometer',
    },
    {
        img: PointQuizImg,
        title: '환경 퀴즈',
        description: `기사를 읽으며 퀴즈를 맞추면 10 포인트 획득`,
        link: '/quiz',
        type: 'quiz',
    },
];

const PointCard = ({ img, title, description, link, type, onCheckIn }) => {
    const navigate = useNavigate();

    const handleClick = async () => {
        if (type === 'checkin') {
            await onCheckIn();
        } else if (link) {
            navigate(link);
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

    // 출석 체크 API 호출
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

    return (
        <div className="point-container">
            <Header title="포인트" />
            <div className="point-box">
                <h2 className="point-title">
                    보유 포인트 <br />
                    {totalPoints}P
                </h2>
                {points.map((point, index) => (
                    <PointCard key={index} {...point} onCheckIn={checkIn} />
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
