import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react'; // Iconify 아이콘 추가
import './Image.css';
import Header from '../../components/header/Header';
import Content from '../../components/content/Content';
import Footer from '../../components/footer/Footer';
import Button from '../../components/button/Button'; // MUI 버튼 가져오기

const Image = () => {
    const location = useLocation();
    const notice = location.state?.notice || '사진을 첨부해주세요.'; // notice 기본값 설정

    const [selectedImage, setSelectedImage] = useState(null);

    // 이미지 파일 선택
    const handleImageUpload = (event) => {
        const file = event.target.files[0]; // 사용자가 선택한 파일 가져오기
        if (file) {
            const imageUrl = URL.createObjectURL(file); // 업로드한 파일의 URL 생성
            setSelectedImage(imageUrl);
        }
    };

    return (
        <div>
            {/* 헤더 추가 */}
            <Header title="오늘의 챌린지" />

            {/* 컨텐츠 추가 */}
            <Content>
                <div className="image-upload-container">
                    {/* 사진 첨부 박스 */}
                    <div
                        className="image-upload-box"
                        style={selectedImage ? { height: 'auto' } : {}}
                    >
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

                    {/* 사진 첨부 버튼 */}
                    <label className="image-upload-button">
                        <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
                        <Icon icon="f7:camera-fill" className="image-upload-icon" />
                        <p className="image-upload-text">사진 첨부</p>
                    </label>

                    {/* Deposit.js에서 어떤 카드를 타고 오냐에 따라 notice가 달라짐 */}
                    <p className="image-upload-note">{notice}</p>
                </div>
            </Content>

            {/* 다음 버튼 추가 (버튼 컴포넌트 사용 components/button/Button.js) */}
            <div className="button-container">
                <Button
                    text="다음"
                    bgColor="#5DB075"
                    textColor="white"
                    onClick={() => console.log('다음 버튼')}
                />
            </div>

            {/* 푸터 추가 */}
            <Footer />
        </div>
    );
};

export default Image;
