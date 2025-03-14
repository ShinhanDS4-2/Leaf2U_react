import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Point.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import ArrowImg from '../../image/Arrow.jpg';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 navigate
import AlertModal from '../../components/modal/AlertModal'; // 알림 모달 컴포넌트 임포트
import Pedometer from './Pedometer';

const box = [
    { title: '출석 체크 📅', description: '출석 체크 시 10포인트 적립', type: 'checkin' },
    { title: '만보기 인증 🚶‍♂️', description: '만보기 인증 후 포인트 적립', type: 'pedometer' },
    { title: '환경 퀴즈 참여 ❓', description: '퀴즈 참여 후 정답 시 10포인트 적립', type: 'quiz' },
];

const PointCard = ({ title, description, type, onCheckIn, onPedometer, onQuiz }) => {
    return (
        <div
            className="point-card"
            onClick={type === 'checkin' ? onCheckIn : type === 'pedometer' ? onPedometer : onQuiz}
            style={{ cursor: 'pointer' }}
        >
            <div className="card-text-container">
                <h3 className="card-title">{title}</h3>
                <p className="card-text">{description}</p>
            </div>
            <div className="card-arrow">
                <img src={ArrowImg} alt="Go" className="arrow-image" />
            </div>
        </div>
    );
};

const Point = () => {
    const [totalPoints, setTotalPoints] = useState(0);
    const [alertMessage, setAlertMessage] = useState(''); // 알림 모달에 표시할 메시지
    const alertRef = useRef(); // 알림 모달 참조
    const navigate = useNavigate();

    const api = axios.create({
        baseURL: '/api',
        headers: { 'Content-Type': 'application/json' },
    });

    // 요청 인터셉터
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

    // 보유 포인트 가져오기
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

    const checkIn = async () => {
        try {
            const response = await api.post('/point/checkin');
            const { success, message } = response.data;

            if (success) {
                setAlertMessage('출석체크 완료! 🎯');
                setTotalPoints((prev) => prev + 10); // 포인트 적립
            } else {
                setAlertMessage('이미 출석체크 완료되었습니다. 😊');
            }

            alertRef.current.openModal();
        } catch (error) {
            console.error('출석 체크 중 오류가 발생했습니다.');
        }
    };

    const goToPedometerPage = () => {
        navigate('/pedometer'); // 만보기 페이지로 이동
    };

    const goToQuizPage = () => {
        navigate('/quiz'); // 환경 퀴즈 페이지로 이동
    };

    return (
        <div className="point-container">
            <Header title="포인트" />
            <div className="point-box">
                <h2 className="point-title">
                    보유 포인트: <br />
                    {totalPoints}P 🪙
                </h2>
                {box.map((challenge, index) => (
                    <PointCard
                        key={index}
                        {...challenge}
                        onCheckIn={checkIn}
                        onPedometer={goToPedometerPage} // 만보기 버튼 클릭 시 이동
                        onQuiz={goToQuizPage} // 환경 퀴즈 버튼 클릭 시 이동
                    />
                ))}
            </div>
            {/* 알림 모달 */}
            <AlertModal
                ref={alertRef}
                title="출석 체크 확인"
                text={alertMessage}
                onClick={() => alertRef.current.closeModal()} // 알림 닫기만 수행
            />
            <Footer />
        </div>
    );
};

export default Point;
