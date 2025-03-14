import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Icon } from '@iconify/react';
import './Pedometer.css';
import Header from '../../components/header/Header';
import Content from '../../components/content/Content';
import Footer from '../../components/footer/Footer';
import Button from '../../components/button/Button';
import AlertModal from '../../components/modal/AlertModal';

const api = axios.create({
    baseURL: '/api/point',
});

const Pedometer = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [file, setFile] = useState(null);

    // 모달 관련 상태 및 ref 생성
    const alertRef = useRef();
    const [alertText, setAlertText] = useState('');

    // 이미지 파일 선택
    const handleImageUpload = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            setSelectedImage(URL.createObjectURL(uploadedFile));
        }
    };

    // "다음" 버튼 클릭 시 API 요청
    const handleSubmit = async () => {
        if (!file) {
            setAlertText('<span>이미지를 업로드해주세요.</span>');
            alertRef.current.openModal();
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('memberIdx', localStorage.getItem('memberIdx'));

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

        try {
            const response = await api.post('/pedometer', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const { message, earnedPoints } = response.data;
            setAlertText(
                `<span>${message} ${earnedPoints ? `(${earnedPoints}P 적립)` : ''}</span>`,
            );
            alertRef.current.openModal();
        } catch (error) {
            console.error('API 요청 실패:', error);
            setAlertText('<span>이미지 인증에 실패했습니다.</span>');
            alertRef.current.openModal();
        }
    };

    return (
        <div>
            <Header title="만보기 챌린지" />

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
                </div>
                <div className="maturity-button-field">
                    <Button
                        text="다음"
                        bgColor="#5DB075"
                        textColor="white"
                        onClick={handleSubmit}
                    />
                </div>
            </Content>

            <Footer />

            {/* Alert Modal */}
            <AlertModal ref={alertRef} text={alertText} />
        </div>
    );
};

export default Pedometer;
