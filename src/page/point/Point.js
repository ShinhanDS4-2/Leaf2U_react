import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Point.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import ArrowImg from '../../image/Arrow.jpg';
import { Button } from '@mui/material';
import BottomModal from '../../components/modal/BottomModal';

const box = [
    {
        title: '출석 체크',
        description: '출석 체크 시 10포인트 적립',
        type: 'checkin',
    },
    {
        title: '만보기 인증',
        description: '걸음 수 인증 시 10포인트 적립 (1000걸음 기준)',
        type: 'pedometer',
    },
    {
        title: '환경 퀴즈 참여',
        description: '퀴즈 참여 후 정답 시 10포인트 적립',
        type: 'quiz',
    },
];

const PointCard = ({ title, description, type, onCheckIn, onPedometer }) => {
    const fileInputRef = useRef(null);

    const handleClick = () => {
        if (type === 'checkin') {
            onCheckIn();
        } else if (type === 'pedometer') {
            fileInputRef.current.click(); // 파일 업로드 창 열기
        }
    };

    return (
        <div className="point-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <div className="card-text-container">
                <h3 className="card-title">{title}</h3>
                <p className="card-text">{description}</p>
            </div>
            <div className="card-arrow">
                <img src={ArrowImg} alt="Go" className="arrow-image" />
            </div>
            {/* 만보기 파일 업로드 hidden input */}
            {type === 'pedometer' && (
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={onPedometer}
                    style={{ display: 'none' }}
                />
            )}
        </div>
    );
};

const Point = () => {
    const [totalPoints, setTotalPoints] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const navigate = useNavigate();

    const api = axios.create({
        baseURL: '/api', // 백엔드 API 주소
        headers: { 'Content-Type': 'application/json' },
    });

    // 요청 인터셉터 (JWT 토큰 추가)
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

    // 보유 포인트 가져오기
    useEffect(() => {
        const fetchTotalPoints = async () => {
            try {
                const res = await api.get('/point/total'); // 백엔드에서 현재 로그인된 사용자 정보 가져옴
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
            const response = await api.post('/point/checkin'); // 백엔드에서 TokenContext 사용
            setModalContent(response.data.message);
            setModalOpen(true);
            setTotalPoints((prev) => prev + 10); // 출석체크는 10P 고정
        } catch (error) {
            console.error('출석 체크 실패:', error);
            setModalContent('출석 체크 중 오류가 발생했습니다.');
            setModalOpen(true);
        }
    };

    // 만보기 파일 업로드
    const Pedometer = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await api.post('/point/pedometer', formData);
            setModalContent(res.data.message);
            setModalOpen(true);
            if (res.data.earnedPoints) {
                setTotalPoints((prev) => prev + res.data.earnedPoints);
            }
        } catch (err) {
            setModalContent('걸음 수를 인식할 수 없습니다.');
            setModalOpen(true);
        }
    };

    // 환경 퀴즈 페이지로 이동
    const Quiz = () => {
        navigate('/quiz');
    };

    return (
        <div className="point-container">
            <Header title="포인트" />
            <div className="point-box">
                <h2 className="point-title">
                    보유 포인트: <br />
                    {totalPoints}P
                </h2>
                {box.map((challenge, index) => (
                    <PointCard
                        key={index}
                        {...challenge}
                        onCheckIn={checkIn}
                        onPedometer={Pedometer}
                    />
                ))}
            </div>
            <BottomModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                content={modalContent}
            />
            <Footer />
        </div>
    );
};

export default Point;
