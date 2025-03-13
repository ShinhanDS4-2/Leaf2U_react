import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';

const Quiz = () => {
    const [quiz, setQuiz] = useState(null);
    const [answer, setAnswer] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('/api/point/quiz')
            .then((res) => setQuiz(res.data))
            .catch((err) => alert(err.response?.data?.message || '퀴즈 로딩 실패'));
    }, []);

    const handleSubmitAnswer = () => {
        if (!answer) return alert('답을 선택하세요!');

        axios
            .post('/api/point/quiz/answer', { memberIdx: 1, answer }) // 예시로 회원 ID 1을 사용
            .then((res) => {
                setMessage(res.data.message);
            })
            .catch((err) => alert(err.response?.data?.message || '정답 제출 오류'));
    };

    return (
        <div>
            <h2>환경 퀴즈</h2>
            {quiz ? (
                <>
                    <p>{quiz.question}</p>
                    <Button variant="outlined" onClick={() => setAnswer('O')}>
                        O
                    </Button>
                    <Button variant="outlined" onClick={() => setAnswer('X')}>
                        X
                    </Button>
                    <Button variant="contained" onClick={handleSubmitAnswer}>
                        정답 제출
                    </Button>
                </>
            ) : (
                <p>퀴즈를 로딩 중입니다...</p>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default Quiz;
