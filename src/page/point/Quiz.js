import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import AlertModal from '../../components/modal/AlertModal';
import './Quiz.css';
import OImage from '../../image/O.jpg';
import XImage from '../../image/X.jpg';
import HintImage from '../../image/Hint.jpg';

const Quiz = () => {
    const [quiz, setQuiz] = useState(null);
    const [answer, setAnswer] = useState('');
    const [message, setMessage] = useState('');
    const [hintUrl, setHintUrl] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('/api/point/quiz')
            .then((res) => {
                const cleanQuestion = res.data.question.replace(/^[^가-힣]+|[^가-힣]+$/g, '');
                setQuiz({ ...res.data, question: cleanQuestion });
                setHintUrl(res.data.newsId); // 힌트 URL 설정
            })
            .catch((err) => alert(err.response?.data?.message || '퀴즈 로딩 실패'));
    }, []);

    const handleSubmitAnswer = () => {
        if (!answer) return alert('답을 선택하세요!');

        axios
            .post('/api/point/quiz/answer', { memberIdx: 1, answer })
            .then((res) => {
                setMessage(res.data.message);
                setModalOpen(true); // 정답 모달 열기
            })
            .catch((err) => alert(err.response?.data?.message || '정답 제출 오류'));
    };

    const handleHintClick = () => {
        axios
            .post('/api/point/quiz/hint', { memberIdx: 1, newsId: hintUrl })
            .then(() => {
                window.open(hintUrl, '_blank'); // 힌트 기사 원문 열기
            })
            .catch((err) => alert(err.response?.data?.message || '힌트 제공 오류'));
    };

    // 🚨 `return`이 함수 안으로 들어가도록 수정
    return (
        <div className="point1-container">
            <Header title="포인트" />
            <div className="quiz-title">{new Date().toLocaleDateString()} QUIZ</div>{' '}
            {/* 🚨 여백 조정 */}
            {quiz ? (
                <>
                    <div className="quiz-content">
                        <p className="point1-text">{quiz.question}</p>
                    </div>

                    <div className="quiz-buttons">
                        <img
                            src={OImage}
                            alt="O"
                            className={`quiz-button ${answer === 'O' ? 'selected' : ''}`}
                            onClick={() => setAnswer('O')}
                        />
                        <img
                            src={XImage}
                            alt="X"
                            className={`quiz-button ${answer === 'X' ? 'selected' : ''}`}
                            onClick={() => setAnswer('X')}
                        />
                    </div>

                    <div className="hint-container" onClick={handleHintClick}>
                        <img src={HintImage} alt="Hint" className="hint-icon" />
                        <div className="hint-content">
                            <p className="point1-text-title">힌트 보기</p>
                            <p className="point1-text-description">
                                관련 기사를 읽고 힌트를 얻을 수 있어요! +5P
                            </p>
                        </div>
                    </div>

                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleSubmitAnswer}
                        className="point1-button"
                    >
                        정답 확인
                    </Button>
                </>
            ) : (
                <p className="point1-text">퀴즈를 로딩 중입니다...</p>
            )}
            <AlertModal ref={useRef()} text={message} />
            <Footer />
        </div>
    );
};

export default Quiz;
