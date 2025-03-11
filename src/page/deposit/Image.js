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

const api = axios.create({
    baseURL: '/api/openai',
});

const Image = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const notice = location.state?.notice || '사진을 첨부해주세요.';
    const type = location.state?.type;
    const [selectedImage, setSelectedImage] = useState(null);
    const [file, setFile] = useState(null);

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

        try {
            const response = await api.post(apiUrl, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            let result = response.data.result.trim().toLowerCase();
            console.log('API 응답:', result);

            if (type === 'tumblr' && result.includes('yes')) {
                navigate('/next-page');
            } else if (type === 'bicycle' && /^\d{2}-\d{2}$/.test(result)) {
                navigate('/next-page');
            } else if (type === 'receipt' && result.includes('yes')) {
                navigate('/next-page');
            } else {
                setAlertText('<span>챌린지 인증에 실패하였습니다.</span>'); // 모달 메시지 설정
                alertRef.current.openModal(); // 모달 열기
            }
        } catch (error) {
            console.error('API 요청 실패:', error);
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

                    <p className="image-upload-note">{notice}</p>
                </div>
            </Content>

            <div className="button-container">
                <Button text="다음" bgColor="#5DB075" textColor="white" onClick={handleSubmit} />
            </div>

            <Footer />

            {/* Alert Modal */}
            <AlertModal ref={alertRef} text={alertText} />
        </div>
    );
};

export default Image;
