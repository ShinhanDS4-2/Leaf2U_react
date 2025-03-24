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
import ChallengeLoading from '../../components/loading/ChallengeLoading';
import Lottie from 'lottie-react';
import Pigcoin from '../../image/pigcoin.json';
import wrongEmoji from '../../image/point_wrong.json';

const api = axios.create({
    baseURL: 'http://leaf2u.shinhanacademy.co.kr:8090/api/point',
});

const Pedometer = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false); // 로딩

    // 모달 관련 상태 및 ref 생성
    const alertRef = useRef();
    const [alertText, setAlertText] = useState('');
    const [alertCallback, setAlertCallback] = useState(() => {});

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
            setLoading(true);

            const response = await api.post('/pedometer', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setLoading(false);

            const data = response.data;
            if (data.result) {
                setAlertText(
                    <div className="alert-modal-content">
                        <div className="alert-modal-pig">
                            <Lottie animationData={Pigcoin} loop={true} />
                        </div>
                        <span>
                            {data.message} {data.point}P 적립!
                        </span>
                    </div>,
                );
                setAlertCallback(() => () => navigate('/point'));
            } else {
                setAlertText(
                    <div className="alert-modal-content">
                        <div className="alert-modal-animation">
                            <Lottie animationData={wrongEmoji} loop={true} />
                        </div>
                        <span>{data.message}</span>
                    </div>,
                );
            }
            alertRef.current.openModal();
        } catch (error) {
            setAlertText(
                <div className="alert-modal-content">
                    <div className="alert-modal-animation">
                        <Lottie animationData={wrongEmoji} loop={true} />
                    </div>
                    <span>이미지 인증에 실패하였습니다.</span>
                </div>,
            );
            alertRef.current.openModal();
        }
    };

    return (
        <div>
            <Header title="만보기 인증" />

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
            <AlertModal ref={alertRef} text={alertText} onClick={alertCallback} />

            {/* 로딩 화면 */}
            {loading && <ChallengeLoading />}
        </div>
    );
};

export default Pedometer;
