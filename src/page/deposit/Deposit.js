import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Deposit.css';
import TumblrImg from '../../image/Tumblr.jpg';
import BicycleImg from '../../image/Bicycle.jpg';
import ReceiptImg from '../../image/Receipt.jpg';
import ArrowImg from '../../image/Arrow.jpg';
import Header from '../../components/header/Header';
import Content from '../../components/content/Content';
import Footer from '../../components/footer/Footer';

const challenges = [
    {
        img: TumblrImg,
        title: '일회용컵 대신 텀블러',
        description: `일회용컵 한 달 사용 / 텀블러 1개 사용<br />탄소
        <span class="highlight">137gCO2 eq</span> / <span class="highlight">127gCO2 eq</span> 배출`,
        link: '/image',
        notice: '• 사물 전체가 나오도록 촬영해주시기 바랍니다.',
        type: 'tumblr',
    },
    {
        img: BicycleImg,
        title: '따릉이 사용',
        description: `공공자전거 따릉이 사용으로 줄어든<br />온실가스 배출량 약 <span class="highlight">962t</span>`,
        link: '/image',
        notice: '• 오늘 날짜가 표시된 이용내역 또는 반납 알림 사진을 첨부해 주세요.',
        type: 'bicycle',
    },
    {
        img: ReceiptImg,
        title: '종이 영수증 대신 전자 영수증',
        description: `종이 영수증 발행을 위해<br />소모되는 원목량은 <span class="highlight">334,400</span>그루`,
        link: '/image',
        notice: '• 오늘 날짜가 표시된 전자영수증을 첨부해 주세요.',
        type: 'receipt',
    },
];

const ChallengeCard = ({ img, title, description, link, notice, type }) => {
    const navigate = useNavigate(); // useNavigate 훅 사용

    return (
        <div
            className="challenge-card"
            onClick={() => navigate(link, { state: { notice, type } })}
            style={{ cursor: 'pointer' }}
        >
            {/* 좌측 이미지 영역 */}
            <img src={img} alt={title} className="card-image" />

            {/* 중앙 텍스트 영역 */}
            <div className="card-text-container">
                <h3 className="card-title">{title}</h3>
                <p className="card-text" dangerouslySetInnerHTML={{ __html: description }} />
            </div>

            {/* 우측 화살표 이미지 */}
            <div className="card-arrow">
                <img src={ArrowImg} alt="arrow" className="arrow-image" />
            </div>
        </div>
    );
};

const Deposit = () => {
    return (
        <div>
            {/* 헤더 추가 */}
            <Header title="오늘의 챌린지" />

            {/* 컨텐트 추가 */}
            <Content>
                <div className="challenge-container">
                    <p className="challenge-description">
                        챌린지를 선택해 주세요.
                        <br />
                        인증 및 확인 후 납입이 완료됩니다.
                    </p>
                    {challenges.map((challenge, index) => (
                        <ChallengeCard key={index} {...challenge} />
                    ))}
                </div>
            </Content>

            {/* 푸터 추가 */}
            <Footer />
        </div>
    );
};

export default Deposit;
