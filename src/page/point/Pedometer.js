import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Pedometer = () => {
    const [message, setMessage] = useState('');
    const [points, setPoints] = useState(0);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('memberIdx', 1); // 예시로 회원 ID 1을 사용
        formData.append('file', file);

        axios
            .post('/api/point/pedometer', formData)
            .then((res) => {
                setMessage(res.data.message);
                setPoints(res.data.earnedPoints || 0);
            })
            .catch((err) => alert(err.response?.data?.error || '이미지 처리 실패'));
    };

    return (
        <div>
            <h2>만보기</h2>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} />
            <Button variant="contained" onClick={() => fileInputRef.current.click()}>
                파일 업로드
            </Button>

            {message && <p>{message}</p>}
            {points > 0 && <p>적립된 포인트: {points}P</p>}
        </div>
    );
};

export default Pedometer;
