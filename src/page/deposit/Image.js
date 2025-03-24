import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Icon } from '@iconify/react';
import './Image.css';
import Header from '../../components/header/Header';
import Content from '../../components/content/Content';
import Footer from '../../components/footer/Footer';
import Button from '../../components/button/Button';
import AlertModal from '../../components/modal/AlertModal'; // AlertModal import
import ChallengeLoading from '../../components/loading/ChallengeLoading';

const api = axios.create({
    baseURL: 'http://leaf2u.shinhanacademy.co.kr:8090/api/openai',
});

const Image = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log('Image.js에서 받은 location.state:', location.state); // 뭘타고 들어갔는지 확인 힘들어서 console창창

    const notice = location.state?.notice || '사진을 첨부해주세요.';
    const type = location.state?.type;
    const [selectedImage, setSelectedImage] = useState(null);
    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false); // 로딩

    // 모달 관련 상태 및 ref 생성
    const alertRef = useRef();
    const [alertText, setAlertText] = useState(''); // 모달 메시지 상태

    // 이미지 파일 선택
    const handleImageUpload = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            setSelectedImage(URL.createObjectURL(uploadedFile));
        }
    };

    // "다음" 버튼 클릭 시 API 요청 & 응답 검증 후 페이지 이동
    const handleSubmit = async () => {
        if (!file) {
            setAlertText('<span>이미지를 업로드해주세요.</span>'); // 모달 메시지 설정
            alertRef.current.openModal(); // 모달 열기
            return;
        }

        let apiUrl = '';

        if (type === 'tumblr') {
            apiUrl = '/image/tumblr';
        } else if (type === 'bicycle') {
            apiUrl = '/image/bicycle';
        } else if (type === 'receipt') {
            apiUrl = '/image/receipt';
        } else {
            setAlertText('<span>올바른 챌린지를 선택하세요.</span>'); // 모달 메시지 설정
            alertRef.current.openModal(); // 모달 열기
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

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

        try {
            setLoading(true);

            const response = await api.post(apiUrl, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            let result = response.data.result.trim().toLowerCase();
            console.log('API 응답:', result);

            setLoading(false);

            if (type === 'tumblr' && result.includes('yes')) {
                navigate('/home', { state: { deposit: 'Y', type } }); // 타입을 여기서 넘겨줘야함 밑에도 마찬가지
            } else if (type === 'bicycle' && result.includes('yes')) {
                navigate('/home', { state: { deposit: 'Y', type } });
            } else if (type === 'receipt' && result.includes('yes')) {
                navigate('/home', { state: { deposit: 'Y', type } });
            } else {
                setAlertText('<span>챌린지 인증에 실패하였습니다.</span>'); // 모달 메시지 설정
                alertRef.current.openModal(); // 모달 열기
            }
        } catch (error) {
            console.error('API 요청 실패:', error);
            setLoading(false);
            setAlertText('<span>이미지 인증에 실패했습니다.</span>'); // 모달 메시지 설정
            alertRef.current.openModal(); // 모달 열기
        }
    };

    return (
        <div>
            <Header title="오늘의 챌린지" />

            <Content>
                <div className="image-upload-container">
                    <div className="image-upload-box">
                        {selectedImage ? (
                            <img
                                src={selectedImage}
                                alt="Uploaded Preview"
                                className="uploaded-image"
                            />
                        ) : (
                            <p className="image-upload-text">사진 첨부</p>
                        )}
                    </div>

                    <label className="image-upload-button">
                        <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
                        <Icon icon="f7:camera-fill" className="image-upload-icon" />
                        <p className="image-upload-text">사진 첨부</p>
                    </label>

                    {/* 사진 첨부 밑에 설명 */}
                    <p className="image-upload-note">{notice}</p>
                </div>
                <div className="maturity-button-field">
                    <Button
                        text="인증하기"
                        bgColor="#5DB075"
                        textColor="white"
                        onClick={handleSubmit}
                    />
                </div>
            </Content>

            <Footer />

            {/* Alert Modal */}
            <AlertModal ref={alertRef} text={alertText} />

            {/* 로딩 화면 */}
            {loading && <ChallengeLoading />}
        </div>
    );
};

export default Image;
